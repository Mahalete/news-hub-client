/// News.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchNews();
  }, [searchTerm, selectedCategory]);

  const fetchNews = () => {
    let url = 'https://newsdata.io/api/1/news?country=fi&apikey=pub_43336635b2f1ccedd88c458bd9d3939ef3aaf';

    if (searchTerm) {
      url += `&q=${searchTerm}`;
    }
    
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
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

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      {newsData.length > 0 ? (
        <ul>
          {newsData.map((news, index) => (
            <li key={index}>{news.title}</li>
          ))}
        </ul>
      ) : (
        <p>No news articles found.</p>
      )}
    </div>
  );
};

export default News;
