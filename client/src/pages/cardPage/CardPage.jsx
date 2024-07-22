import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from "../cardPage/CardPage.module.css"
import EditStoryModal from '../../modals/addStory/addStoryModal';
import DeleteModal from '../../modals/delete/DeleteModal';

function CardPage() {
    const location = useLocation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditStoryModal, setShowEditStoryModal] = useState(false);
    const { id, imgurl, heading, descp, refUserId, category } = location.state || {};
    const [userId] = useState(localStorage.getItem("userId"));
    console.log(userId, refUserId);

    const handleDeleteModal = (id) => {
        setShowDeleteModal(true);
    };

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.thumbnail}>
                    <img className={styles.leftimg} src={imgurl} alt="image" />
                </div>

                <div className={styles.right}>
                    <h1>{heading}</h1>
                    {(userId === refUserId) ?
                        <div>
                            < FontAwesomeIcon icon={faPenToSquare} size="lg" style={{ color: "#6f44ee", margin: "0rem 1rem" }} className={styles.icon}
                                onClick={() => setShowEditStoryModal(true)} />
                            <FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#f20232", margin: "0rem 1rem" }} className={styles.icon}
                                onClick={() => handleDeleteModal(id)} />
                        </div> : ""}
                    <div className={styles.separator} />
                    <p className={styles.descp}>{descp}</p>
                </div>
            </div >
            {
                showDeleteModal &&
                <DeleteModal
                    open={() => setShowDeleteModal(true)}
                    close={() => setShowDeleteModal(false)}
                    id={id}
                />
            }
            {
                showEditStoryModal &&
                <EditStoryModal
                    openEdit={() => setShowEditStoryModal(true)}
                    closeEdit={() => setShowEditStoryModal(false)}
                    id={id}
                    imgurl={imgurl}
                    heading={heading}
                    descp={descp}
                    refUserId={refUserId}
                    category={category}
                    editable={true}

                />
            }
        </div >
    )
}

export default CardPage
