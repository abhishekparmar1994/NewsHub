import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner"; // Import Spinner component
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 0,
    countryCode: "in",
    category: "general",
    newsAPIKey: process.env.REACT_APP_NEWS_API_KEY,
    newsUrl: "https://newsapi.org/v2",
    newsUrlTag: "top-headlines",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    countryCode: PropTypes.string,
    category: PropTypes.string,
    newsAPIKey: PropTypes.string,
    newsUrl: PropTypes.string,
    newsUrlTag: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [], // Ensure articles is initialized as an empty array
      loading: false,
      page: 1,
      totalResults: 0,
      showScrollToTop: false, // Add state for the scroll-to-top button
    };
  }

  capitalizeFirstLetter = () => function (val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  fetchArticles = async (page = 1) => {
    const { pageSize, countryCode, category, newsAPIKey, newsUrl, newsUrlTag, setProgress } = this.props; // Destructure setProgress
    setProgress(10); 
    this.setState({ loading: true });

    let url = `${newsUrl}/${newsUrlTag}?country=${countryCode}&category=${category}&apiKey=${newsAPIKey}&page=${page}&pageSize=${pageSize}`;
    await fetch(url)
      .then((response) => {
        setProgress(50); // Update progress to 50%
        return response.json();
      })
      .then((data) => {
        setProgress(100); // Update progress to 100%
        this.setState({
          articles: data.articles,
          page: page,
          loading: false,
          totalResults: data.totalResults,
        });
      });
    document.title = `NewsHub - ${
      category.charAt(0).toUpperCase() + category.slice(1)
    }`; // Set the document title to the current category
  };

  handleScroll = () => {
    if (window.scrollY > 300) {
      this.setState({ showScrollToTop: true });
    } else {
      this.setState({ showScrollToTop: false });
    }
  };

  async componentDidMount() {
    this.fetchArticles(1);
    window.addEventListener("scroll", this.handleScroll); // Add scroll event listener

    // Add smooth scrolling behavior to the document
    document.documentElement.style.scrollBehavior = "smooth";
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.fetchArticles(1);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll); // Remove scroll event listener
  }

  fetchMoreData = async () => {
    const { pageSize, countryCode, category, newsAPIKey, newsUrl, newsUrlTag } = this.props; // Use props for configurable values

    if (this.state.articles.length >= this.state.totalResults) {
      this.setState({ loading: false }); // Ensure loading is false when all articles are loaded
      return; // Stop fetching if all articles are loaded
    }

    this.setState({ loading: true });
    let url = `${newsUrl}/${newsUrlTag}?country=${countryCode}&category=${category}&apiKey=${newsAPIKey}&page=${this.state.page + 1}&pageSize=${pageSize}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          articles: this.state.articles.concat(data.articles),
          loading: false,
          page: this.state.page + 1,
          totalResults: data.totalResults,
        });
      });
  };

  handlePageSizeChange = async (event) => {
    this.pageSize = parseInt(event.target.value);
    this.fetchArticles(1);
  };

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  render() {
    let { pageSize } = this.props;
    pageSize = pageSize ? pageSize : this.pageSize;
    this.pageSize = pageSize;
    
    return (
      <div className="container my-3">
        <h2 className="text-center">
          {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines
        </h2>

        {this.state.loading && <Spinner />} {/* Show spinner only if loading is true */}   
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
              dataLength={this.state.articles?.length || 0} // Safely access articles length
              next={this.fetchMoreData}
              hasMore={this.state.articles?.length < this.state.totalResults} // Safely compare length
              loader={this.state.loading && <Spinner />} // Show loader only if loading is true
            >
              
              <div className="container">
                <div className="row">
                  {this.state.articles?.map((news, index) => { // Safely map over articles
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
        
        {this.state.showScrollToTop && ( // Conditionally render the scroll-to-top button
          <button
            onClick={this.scrollToTop}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 10000, // Increase zIndex to ensure visibility
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex", // Ensure proper alignment
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Add shadow for better visibility
            }}
          >
            ↑
          </button>
        )}
      </div>
    );
  }
}

export default News;
