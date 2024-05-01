import React,{useState} from 'react';
import styles from '../card/card.module.css';
import Card from './card'

const cardList = (props) => {
      const [showAll, setShowAll] = useState(false);
      const numToShow = 4; 
    
    const { stories,key} = props;
    console.log(stories)
    const toggleShowAll = () => {
    setShowAll(!showAll);
  };
    return (
        <>
            <div className={styles.cardlist}>
               {stories.slice(0, showAll ? stories.length : numToShow).map((story, i) => (
              <Card key={i} story={story} />
               ))}
      </div> 
                 {stories.length > numToShow && (
                <button className={styles.btn} onClick={toggleShowAll}>
                 {showAll ? 'Show Less' : 'Show More'}</button>
            )}

            </>
  );
};
export default cardList