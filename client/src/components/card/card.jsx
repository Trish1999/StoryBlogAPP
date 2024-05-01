import React,{useState} from 'react';
import styles from '../card/card.module.css'

function card(props) {
    const { story = {}} = props;
    return (
        <>
        <div className={styles.cardcontainer}>
      <img src={story.imageUrl} alt='storyImg' />
      <h1 className={styles.heading}>{story.heading}</h1>
                    <p className={styles.descp}>{story.description}</p>
        </div >
            </>
  );
};


export default card
