import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useNavigate, useLocation } from 'react-router-dom';

import { createPost, updatePostByUser } from "../../api/postApi";
import styles from './addStoryModal.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import '../../modals/custom-styling.css';

const closeIcon=<FontAwesomeIcon icon={faCircleXmark} style={{color: "#d40222",fontSize:"1.5rem"}}/>


function addStoryModal(props) {
  const { close, open } = props;
  const navigate = useNavigate();
      const { state } = useLocation();
    const [stateData] = useState(state?.PostDetails);
    const [inputFields, setInputFields] = useState({
        heading: "" || stateData?.heading,
        description: "" || stateData?.description,
        imageUrl: "" || stateData?.imageUrl,
        category: "" || stateData?.category
    });

        const handleChange = (event) => {
        setInputFields({...inputFields,[event.target.name]: event.target.value });
  };
  
  const handleSubmit = async () => {
        if (
            !inputFields.heading ||
            !inputFields.description ||
            !inputFields.imageUrl ||
            !inputFields.category 
        ) {
            alert("Please fill in all fields.");

            return;
        }

        // if (state?.edit) {
        //     await updatePostByUser(stateData.userName, inputFields);
        //     return;
        // }

        await createPost(inputFields);
    };
  // const addFields = () => {
  //   if (inputFields.length < 6) {
  //     setInputFields([...inputFields, { heading: '', description: '', imageUrl: '', category: '' }])
  //     setCurrentSlide(inputFields.length + 1);
  //   }
  // };

  //   const removeFields = (index) => {
  //   let data = [...inputFields];
  //   data.splice(index, 1)
  // }

  // const prevSlide = () => {
  //   setCurrentSlide(currentSlide - 1);
  // };

  // const nextSlide = () => {
  //   setCurrentSlide(currentSlide + 1);
  // };


  return (
    <div>
      <Modal open={open} onClose={close} center
              closeIcon={closeIcon}
              classNames={{
                  modal: 'customModal1',
              }}>
        <div className={styles.container}>
          <p>Add apto 6 slides </p>
          </div>
          <div className={styles.modalslides}>
                      <button className={styles.headerbtn} onclick="" >Slide 1</button>
                      <button className={styles.headerbtn} onclick="" disabled>Slide 2</button>
                      <button className={styles.headerbtn} onclick=""  disabled>Slide 3</button>
          <button className={styles.headerbtn} onclick="" disabled>Add +</button>
    </div>
                  <label >
                    Heading:
                  </label>
     <input type="text"
       name="heading"
       value={inputFields.heading}
       placeholder='Your heading'
       id={styles.inputbox1}
       onChange={handleChange}
                  ></input>
                  <br />
                  <div className={styles.des}>
                    <label >
                      Description:
                    </label>
            <textarea name="description" value={inputFields.description} placeholder='story description' className={styles.inputbox2} cols="30" rows="4"
                      onChange={handleChange}
                    ></textarea>
                  </div><br />
                  <label >
                    Image:
                  </label>
                  <input type="text" value={inputFields.imageUrl} onChange={handleChange}
                    name="imageUrl" placeholder='Add image url' id={styles.inputbox3}></input>
                  <br />
                  <label >
                    Category:
                  </label>
          <select id={styles.inputbox4} value={inputFields.category}
            onChange={handleChange} name="category">
                    <option value="" disabled selected hidden>Select Category</option>
                    <option value="food">Food</option>
                    <option value="health and fitness">Health and fitness</option>
                    <option value="travel">Travel</option>
                    <option value="movie">Movie</option>
                    <option value="education">Education</option>
                  </select>

        <div className={styles.footer}>
        <button className={styles.footerbtn1} onClick="" disabled>Previous</button>
        <button className={styles.footerbtn2} onClick="" disabled>Next</button>
          <button className={styles.footerbtn3} onClick={handleSubmit}>Post</button>
          </div>
      </Modal>
    </div>
);
}



export default addStoryModal

