import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import FilterDropdown from './FilterDropdown'; // Import the FilterDropdown component
import './News.css'; // Import the CSS file

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSidebar, setShowSidebar] = useState(false); // Add state for sidebar visibility

  useEffect(() => {
    fetchNews();
  }, [searchTerm, selectedCategory]);

  const fetchNews = () => {
    let url = 'https://newsdata.io/api/1/latest?apikey=pub_43336635b2f1ccedd88c458bd9d3939ef3aaf&language=en,fi';

    if (searchTerm) {
      url += `&q=${searchTerm}`;
    }
    
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }

    axios.get(url)
      .then(response => {
        console.log('API Response:', response.data.results); // Log the API response
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

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`news-container ${showSidebar ? 'show-sidebar' : ''}`}>
      <Header onSearch={handleSearch} onFilter={handleFilter} />
      {/* Integrate the FilterDropdown component */}
      <FilterDropdown onSelectCategory={handleFilter} />
      <div className="news-content">
        {newsData.length > 0 ? (
          <ul className="news-list">
            {newsData.map((news, index) => (
              <li className="news-item" key={index}>
                <a href={news.link} className="news-item-link" target="_blank" rel="noopener noreferrer">
                  <div className="news-item-title">{news.title}</div>
                  <div className="news-item-description">{news.description}</div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No news articles found.</p>
        )}
      </div>
    </div>
  );
};

export default News;
