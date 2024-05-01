import React,{useState} from 'react'
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import dp from "../../assets/avatar.svg";
import LoginModal from '../../modals/login/loginModal';
import AddStoryModal from '../../modals/addStory/addStoryModal';

const options=<FontAwesomeIcon icon={faEllipsisVertical} />
const bookmark = <FontAwesomeIcon icon={faBookmark} />;

function header(props){
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const[showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [loginProps, setLoginProps] = useState(null);
  const [username, setUsername] = useState("John");
  const { userType } = props;
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
  };

  const hendleLoginProps = (props) => {
    setLoginProps(props);
  }

  return (
 <>
      <div className={styles.navbar}>
        <div className={styles.p}>SwipTory</div>

        {userType === "unauthorised" ?
          (<div className={styles.btn}>
            <button className={styles.btn1} onClick={() => hendleLoginProps({ modalType: 'register' })}>Register Now</button>
            <button className={styles.btn2} onClick={() => hendleLoginProps({ modalType: 'login' })}>Sign In</button>
          </div>) :
          (<div className={styles.btn}>
            <button className={styles.btn3} onClick="">
              <i>{bookmark}</i> Bookmarks
            </button>
            <button className={styles.btn4} onClick={() => setShowAddStoryModal(!showAddStoryModal)}>
              Add story
            </button>
            <img className={styles.dp} src={dp} alt="dp" />

            <div
              style={{
                position: "relative",
                margin: "9px 20px",
                fontSize: "1.6rem",
              }}
            >
              <i onClick={handleToggleDropdown}>{options}</i>
              {isDropdownOpen && (
                <div className={styles.option}>
                  <h4 style={{ textAlign: "center" }}>{username}</h4>
                  <button onClick={handleLogout} className={styles.btn5}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>)}

        <div className={styles.mobdropdown}>
          <div
            style={{
              position: "relative",
              margin: "9px 20px",
              fontSize: "1.6rem",
            }}
          >
            <i onClick={handleToggleDropdown}>{options}</i>
            
            {isDropdownOpen && (
           
              <div className={styles.option}>
                {userType === "unauthorised" ?
                  (<div>
                  <button className={styles.btn5} onClick={() => hendleLoginProps({ modalType: 'register' })}>
                  Register
                </button>
                <button className={styles.btn5} onClick={() => hendleLoginProps({ modalType: 'login' })}>
                  Login
                    </button>
                    </div>
                    ) :
                (
                <div>
                  <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                    <img className={styles.dp} src={dp} alt="dp" />
                    {username}
                </div>
                <button className={styles.btn5} onClick="">
                  Your story
                </button>
                <button className={styles.btn5} onClick={() => setShowAddStoryModal(true)}>
                  Add story
                </button>
                <button className={styles.btn5} onClick="">
                  <i>{bookmark}</i> Bookmarks
                </button>

                <button onClick={handleLogout} className={styles.btn5}>
                  Logout
                  </button>
                </div>)}
              </div>
            )}
          </div>
        </div>
      </div>
                 {loginProps &&
                <LoginModal
                    open={() => setShowLoginModal(true)}
        close={() => setLoginProps(false)}
        {...loginProps}
        
                />
      }
      {showAddStoryModal &&
        <AddStoryModal
          open={() => setShowAddStoryModal(true)}
        close={() => setShowAddStoryModal(false)}/>
      }
    </>
  );
}

export default header;