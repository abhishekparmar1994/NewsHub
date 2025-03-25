import React, { useState, useEffect, useCallback } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const {
    pageSize = 0,
    countryCode = "in",
    category = "general",
    newsAPIKey = process.env.REACT_APP_NEWS_API_KEY,
    newsUrl = "https://newsapi.org/v2",
    newsUrlTag = "top-headlines",
    setProgress
  } = props;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  };

  const fetchArticles = useCallback(async (page = 1) => {
    setProgress(10);
    setLoading(true);

    let url = `${newsUrl}/${newsUrlTag}?country=${countryCode}&category=${category}&apiKey=${newsAPIKey}&page=${page}&pageSize=${pageSize}`;
    try {
      const response = await fetch(url);
      setProgress(50);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProgress(100);

      setArticles((prevArticles) =>
        page === 1 ? data.articles : prevArticles.concat(data.articles)
      );
      setPage(page);
      setLoading(false);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
      setProgress(100);
    }

    document.title = `NewsHub - ${capitalizeFirstLetter(category)}`;
  }, [newsUrl, newsUrlTag, countryCode, category, newsAPIKey, pageSize, setProgress]);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
    window.addEventListener("scroll", handleScroll);

    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchArticles]);

  const fetchMoreData = async () => {
    if (articles.length >= totalResults) {
      setLoading(false);
      return;
    }

    setLoading(true);
    let url = `${newsUrl}/${newsUrlTag}?country=${countryCode}&category=${category}&apiKey=${newsAPIKey}&page=${page + 1}&pageSize=${pageSize}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setArticles(articles.concat(data.articles));
      setLoading(false);
      setPage(page + 1);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Error fetching more articles:", error);
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container my-3">
      <h1 className="text-center my-6"
        style={{ marginTop: "70px" }} // Adjust margin to avoid overlay
      >Top {capitalizeFirstLetter(category)} News Headlines</h1>

      {loading && <Spinner />}
      <div className="row">
        <div
          className="container sticky-bottom d-flex justify-content-between"
          style={{
            position: "sticky",
            bottom: "10px",
            backgroundColor: "white",
            zIndex: 1000,
            padding: "10px",
          }}
        >
          <InfiniteScroll
            dataLength={articles?.length || 0}
            next={fetchMoreData}
            hasMore={articles?.length < totalResults}
            loader={loading && <Spinner />}
          >
            <div className="container">
              <div className="row">
                {articles?.map((news, index) => {
                  return (
                    <div className="col-md-4" key={`${news.url}-${index}`}>
                      <NewsItem
                        title={news.title?.slice(0, 45)}
                        description={
                          news.description ? news.description.slice(0, 88) : ""
                        }
                        imageUrl={news.urlToImage ? news.urlToImage : ""}
                        newsUrl={news.url}
                        author={news.author ? news.author : "Unknown"}
                        date={news.publishedAt ? news.publishedAt : ""}
                        source={news.source.name ? news.source.name : ""}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </div>

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 10000,
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "20px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          ↑
        </button>
      )}
    </div>
  );
};

News.defaultProps = {
  pageSize: 0,
  countryCode: "in",
  category: "general",
  newsAPIKey: process.env.REACT_APP_NEWS_API_KEY,
  newsUrl: "https://newsapi.org/v2",
  newsUrlTag: "top-headlines",
};

News.propTypes = {
  pageSize: PropTypes.number,
  countryCode: PropTypes.string,
  category: PropTypes.string,
  newsAPIKey: PropTypes.string,
  newsUrl: PropTypes.string,
  newsUrlTag: PropTypes.string,
};

export default News;
