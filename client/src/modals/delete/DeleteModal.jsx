import React from 'react'
import { useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { useNavigate } from "react-router-dom"


import { deletePost } from "../../api/postApi";
import styles from './DeleteModal.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const closeIcon = <FontAwesomeIcon icon={faCircleXmark} style={{ color: "#d40222", fontSize: "1.5rem" }} />


function DeleteModal(props) {
    const { close, open, id } = props;
    const navigate = useNavigate();

    const handleDelete = async () => {
        const result = await deletePost(id);
        if (result) {
            close();
            alert("Post deleted successfully")
            navigate("/");
        }
    }

    return (
        <div>
            <Modal open={open} onClose={close} center
                closeIcon={closeIcon}
                classNames={{
                    modal: 'customModal1',
                }}>
                <div className={styles.container}>
                    <h2>Are you confirm you want to delete?</h2>
                    <div className={styles.footer}>
                        <button className={styles.footerbtn} onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default DeleteModal

