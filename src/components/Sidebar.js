import React, { useState } from "react";
import Spinner from "./Spinner";

const Sidebar = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const inspirationalQuotes = [
    { q: "The best way to predict the future is to create it.", a: "Peter Drucker" },
    { q: "Your time is limited, so don’t waste it living someone else’s life.", a: "Steve Jobs" },
    { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
    { q: "If you can dream it, you can achieve it.", a: "Zig Ziglar" },
    { q: "Success is not the key to happiness. Happiness is the key to success.", a: "Albert Schweitzer" },
    { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
  ];

    // Simulate loading delay
    setTimeout(() => {
      setQuotes(inspirationalQuotes);
      setLoading(false);
    }, 1000); // 1-second delay

  return (
    <div
      className="sidebar"
      style={{
        position: "sticky", // Make the sidebar sticky
        top: "70px", // Adjust to avoid overlap with the navbar
        height: "calc(100vh - 70px)", // Full height minus navbar
        overflowY: "auto", // Enable scrolling for long content
        marginTop: "0", // Remove unnecessary margin
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: "#ffffff",
      }}
    >
      <h4 className="text-center">Top Quotes</h4>
      {loading ? (
        <Spinner />
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {quotes.map((quote, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <blockquote style={{ fontStyle: "italic", margin: 0 , fontSize: "1rem", lineHeight: "1.5"}}>
                "{quote.q}"
              </blockquote>
              <p style={{ textAlign: "right", margin: 0,textEmphasisStyle: "revert-layer", fontWeight: "bold"}}>- {quote.a}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
