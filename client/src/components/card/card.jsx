import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import { useNavigate } from "react-router-dom";
import { getPostById } from "../../api/postApi";
import { NavLink } from 'react-router-dom';

import CardPage from '../../pages/cardPage/CardPage';
import styles from '../card/card.module.css';

function Card(props) {
  const { story, data } = props;
  const [storyData, setStoryData] = useState([]);
  const navigate = useNavigate();
  const imgurl = get(...story, "imageUrl")
  const heading = get(...story, "heading")
  const descp = get(...story, "description")
  const id = get(...story, "_id")
  const refUserId = get(...story, "refUserId")
  const category = get(...story, "category")

  useEffect(() => {
    getStoryData();
  }, []);

  const getStoryData = async () => {
    const result = await getPostById(id);
    setStoryData(result.data);
  };

    return (
      <>
        <div className={styles.cardcontainer} >
          <div>
            <NavLink
              to={`/blog/${id}`}
              state={{ id: id, imgurl: imgurl, heading: heading, descp: descp, refUserId: refUserId, category: category }}
              style={{
                textDecoration: "none",
                color: "white"
              }}
            >
              < img src={imgurl} alt='storyImg' />
              <div className={styles.text}>
                <p className={styles.heading}>{heading}</p>
                <p className={styles.descp} style={{ marginBottom: "1rem" }} > {descp}</p>
              </div>
            </NavLink>
          </div >
        </div >
            </>
  );
};


export default Card;
