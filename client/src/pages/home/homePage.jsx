import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./homePage.module.css";

import Header from '../../components/header/header';
import Cardlist from '../../components/card/cardList';
import { getAllPosts } from "../../api/postApi";

function homePage() {
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [postDetails, setPostDetails] = useState([]);
  
  const [headerCategories] = useState([
    { category: 'food', url: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg' },
    { category: 'health and fitness', url: 'https://st4.depositphotos.com/13324256/19676/i/600/depositphotos_196761434-stock-photo-close-view-dumbbell-bottle-water.jpg' },
    { category: 'travel', url: 'https://springsource.in/assets/images/travel.jpg' },
    { category: 'movie', url: 'https://hips.hearstapps.com/hmg-prod/images/movies-based-on-a-true-story-64e7c14b60826.jpg?crop=1.28xw:0.886xh;0,0.0341xh&resize=1200:*' },
    { category: 'education', url: 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2008/08/objective-of-education-is-learning-feature-1199x815.jpg' }]);

      useEffect(() => {
        getPostDetails();
      }, []);
  
      const getPostDetails = async () => {
        const result = await getAllPosts();
        setPostDetails(result.data);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

    const renderCategory = (category) => {
    return (
      <div className={styles.storysection}>
         {postDetails
            .filter((item) => item.category === category)
          .map((item, index) => (
            <>
              <h2>Top Stories About {category}</h2>
              {item?
            <Cardlist
              key={index}
                  stories={[item]} />
                :<h2>No story Avilable</h2>}
              </>))}
          
        </div>
    );
  };
  const renderAllCategories = () => {
    return (
      <div>
        {["food", "health and fitness", "travel","movies","education"].map((category, index) => (
          <div key={index}>{renderCategory(category)}</div>
        ))}
      </div>
    );
  };


  return (
    <div>
      <Header/>
      <div className={styles.filter}>
                <button className={styles.filterbtn} 
            style={{backgroundImage: `url(https://img.freepik.com/free-photo/traditional-french-food-world-tourism-day_23-2149114055.jpg?w=996&t=st=1714406289~exp=1714406889~hmac=b707447cd55365a7a313820ac4461c4a03943aedec76970b04f9e61ec0ab7d46cd)`}}
            onClick={() => handleCategoryClick("all")}>
            All
          </button>
        {headerCategories.map((a, index) => (
          <button key={index} className={styles.filterbtn} 
            style={{backgroundImage: `url(${a.url})`}}
            onClick={() => handleCategoryClick(a.category)}>
            {a.category}
          </button>
        ))}
      </div>
      {selectedCategory === 'all' ? 
        renderAllCategories()
   : renderCategory(selectedCategory)}
      </div>
  );
};

export default homePage;
