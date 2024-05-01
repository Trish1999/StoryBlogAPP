import React, { useState } from 'react'

import styles from "./loginPage.module.css";
import Header from '../../components/header/header';

function homePage() {
  const [categories] = useState([
  { category: ' all', url: 'https://img.freepik.com/free-photo/traditional-french-food-world-tourism-day_23-2149114055.jpg?w=996&t=st=1714406289~exp=1714406889~hmac=b707447cd55365a7a313820ac4461c4a03943aedec76970b04f9e61ec0ab7d46cd' },
    { category: 'food', url: 'https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg' },
    { category: 'health and fitness', url: 'https://st4.depositphotos.com/13324256/19676/i/600/depositphotos_196761434-stock-photo-close-view-dumbbell-bottle-water.jpg' },
    { category: 'travel', url: 'https://springsource.in/assets/images/travel.jpg' },
    { category: 'movie', url: 'https://hips.hearstapps.com/hmg-prod/images/movies-based-on-a-true-story-64e7c14b60826.jpg?crop=1.28xw:0.886xh;0,0.0341xh&resize=1200:*' },
    { category: 'education', url: 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2008/08/objective-of-education-is-learning-feature-1199x815.jpg' }]);

  const scrollToCategory = (category) => {
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
          <Header
          userType="unauthorised"/>
      <div className={styles.filter}>
        {categories.map((a, index) => (
          <button className={styles.filterbtn} key={index}
            style={{backgroundImage: `url(${a.url})`}}
            onClick={() => scrollToCategory(a.category)}>
            {a.category}
          </button>
        ))}
      </div>
      <div className={styles.storysection}>
      <div id="food">
                  <h2>Top Stories About food</h2>
                   <h4>No Story Avilable</h4>
        </div>
              <div id="helth">
                  <h2>Top Stories About Health And Fitness</h2>
                   <h4>No Story Avilable</h4>
        </div>
              <div id="travel">
                  <h2>Top Stories About Travel</h2>
                   <h4>No Story Avilable</h4>
        </div>
              <div id="movies">
                  <h2>Top Stories About Movies</h2>
                   <h4>No Story Avilable</h4>
        </div>
              <div id="education">
                  <h2>Top Stories About Education</h2>
                   <h4>No Story Avilable</h4>
      </div>
 
      </div>
      </div>
  );
};

export default homePage;
