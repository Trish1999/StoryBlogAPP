import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useNavigate, useLocation } from 'react-router-dom';

import { createPost, updatePostById } from "../../api/postApi";
import styles from './addStoryModal.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import '../../modals/custom-styling.css';

const closeIcon=<FontAwesomeIcon icon={faCircleXmark} style={{color: "#d40222",fontSize:"1.5rem"}}/>


function addStoryModal(props) {
  const { close, open, openEdit, closeEdit, id, imgurl, heading, descp, refUserId, category, editable } = props;
  const navigate = useNavigate();

    const [inputFields, setInputFields] = useState({
      heading: "" || heading,
      description: "" || descp,
      imageUrl: "" || imgurl,
      category: "" || category
    });

        const handleChange = (event) => {
        setInputFields({...inputFields,[event.target.name]: event.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
        if (
            !inputFields.heading ||
            !inputFields.description ||
            !inputFields.imageUrl ||
            !inputFields.category 
        ) {
            alert("Please fill in all fields.");

            return;
        }

    if (editable) {
      await updatePostById(id, inputFields);
      closeEdit();
      navigate("/")

    } else {
      const res = await createPost(inputFields);
      if (res) {
        close();

      }
    }
  };


  return (
    <div>
      <Modal open={editable ? openEdit : open}
        onClose={editable ? closeEdit : close} center
              closeIcon={closeIcon}
              classNames={{
                  modal: 'customModal1',
              }}>
        <div className={styles.container}>
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
            <button className={styles.footerbtn} onClick={handleSubmit}>Post</button>
          </div>
          </div>
      </Modal>
    </div>
);
}



export default addStoryModal;

