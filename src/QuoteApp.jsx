import React, { useState, useEffect } from "react";

function QuoteApp() {
  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [authors, setAuthors] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    fetch("https://api.quotable.io/quotes")
      .then((response) => response.json())
      .then((data) => setQuotes(data.results));
  }, []);

  const handleRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setSelectedQuote(quotes[randomIndex]);
  };

  const handleAuthorClick = (authorSlug) => {
    const authorQuotes = quotes.filter(
      (quote) => quote.authorSlug === authorSlug
    );
    setSelectedAuthor(authorQuotes);
  };

  useEffect(() => {
    const uniqueAuthors = quotes.reduce((acc, quote) => {
      if (!acc[quote.authorSlug]) {
        acc[quote.authorSlug] = quote.author;
      }
      return acc;
    }, {});
    setAuthors(uniqueAuthors);
  }, [quotes]);

  return (
    <div>
      <h1>FAMOUS QUOTES</h1>
      <button onClick={handleRandomQuote}>Random Quote</button>

      {selectedQuote && (
        <div className="selected-author-container" >
          <p>{selectedQuote.content}</p>
          <p>- {selectedQuote.author}</p>
          <p className="tags-container" >Tags: {selectedQuote.tags.join(", ")}</p>
        </div>
      )}

      <h2>Authors</h2>

      {Object.entries(authors).map(([authorSlug, author]) => (
        <button key={authorSlug} onClick={() => handleAuthorClick(authorSlug)}>
          {author}
        </button>
      ))}

      {selectedAuthor && (
        <div className="selected-author-container">
          <h3>{selectedAuthor[0].author}</h3>
          {selectedAuthor.map((quote) => (
            <div key={quote._id} className="quote-container">
              <p>{quote.content}</p>
              <p className="tags-container">Tags: {quote.tags.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuoteApp;
