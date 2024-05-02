// News.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; // Assuming you have a Header component

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm) {
      fetchNews();
    } else {
      // Display default content or prompt message when search term is empty
      setNewsData([]);
    }
  }, [searchTerm]);

  const fetchNews = () => {
    let url = 'https://newsdata.io/api/1/news?country=fi&apikey=pub_43336635b2f1ccedd88c458bd9d3939ef3aaf';
    if (searchTerm) {
      url += `&q=${searchTerm}`;
    }

    axios.get(url)
      .then(response => {
        setNewsData(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching news data:', error);
      });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      {searchTerm ? (
        <ul>
          {newsData.map((news, index) => (
            <li key={index}>{news.title}</li>
          ))}
        </ul>
      ) : (
        <p>Please enter a keyword to search for news articles</p>
      )}
    </div>
  );
};

export default News;
