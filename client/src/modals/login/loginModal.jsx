import React from 'react'
import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { loginUser,registerUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";


import styles from './loginModal.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "../../modals/custom-styling.css";

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;
const closeIcon=<FontAwesomeIcon icon={faCircleXmark} style={{color: "#d40222",fontSize:"1.5rem"}}/>


function loginModal(props) {
  const { close, open, modalType } = props;
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const [icon, setIcon] = useState(eye);
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState();

    const passwordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        setIcon(passwordShown ? eye : eyeSlash);
  };

      const handleFormChange = (event) => {
        setFormData({...formData,[event.target.name]: event.target.value });
  };
  
     const handleSubmit = async () => {
        if (!formData.userName || !formData.password) {
            setError("Fields can't be empty");
            return;
        }
       if (modalType === "register") {
         const result = await registerUser(formData);
         if (result) {
           alert(result.data.message);
           navigate("/");
         }
       } else {
         const result = await loginUser(formData);
         if (result) {
           navigate("/");
         }
       }
    };
  

  
  return (
    <div>
      <Modal open={open} onClose={close} center
        closeIcon={closeIcon}
        classNames={{
            modal: 'customModal2',
        }}>
        <div className={styles.modalform}>
          <div className={styles.modalheader}>
            {modalType} to  story blog
          </div>
  
              <label >
                  UserName
              </label>
          <input
            type="text"
            name="userName"
            placeholder='Enter Username'
            onChange={handleFormChange}
            id={styles.inputbox1}></input>
          <br />
          <div className={styles.password}>
              <label>
                  Password
            </label>  
                  <input 
              type={passwordShown ? "text" : "password"} 
              name="password"
              placeholder='Enter password'
              onChange={handleFormChange}
                  id={styles.inputbox2} />
            <span className={styles.icon}><i onClick={passwordVisiblity}>{ icon } </i></span>
          </div>
        </div>
          <p className={styles.error}>{error}</p>
        <button id={styles.submmit} onClick={handleSubmit}>{modalType}</button>
      </Modal>
    </div>
  );
};

export default loginModal