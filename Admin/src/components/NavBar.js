import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faUser,
  faHotel,
  faBed,
  faMoneyBill,
  faRightFromBracket,
  faCirclePlus,
  faRightToBracket,
  faUserPlus,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  let buttonArr;
  if (props.isLoggedIn) {
    buttonArr = [
      { title: "Dashboard", path: "/dashboard", icon: faTable },
      { title: "Users", path: "/users", icon: faUser },
      { title: "Hotels", path: "/hotels", icon: faHotel },
      { title: "Rooms", path: "/rooms", icon: faBed },
      { title: "Transactions", path: "/transactions", icon: faMoneyBill },
      { title: "New Hotel", path: "/new-hotel", icon: faCirclePlus },
      { title: "New Room", path: "/new-room", icon: faCirclePlus },
      { title: "Edit Hotel", path: "/edit-hotel", icon: faEdit },
      { title: "Edit Room", path: "/edit-room", icon: faEdit },
      { title: "Logout", path: "/logout", icon: faRightFromBracket },
    ];
  } else {
    buttonArr = [
      { title: "Login", path: "/login?signup=false", icon: faRightToBracket },
      { title: "Sign Up", path: "/login?signup=true", icon: faUserPlus },
    ];
  }
  const navigate = useNavigate();
  const buttonGenerator = (arr) => {
    return arr.map((button) => (
      <div
        className={styles.button}
        key={button.title}
        onClick={() => {
          navigate(button.path);
        }}
      >
        <FontAwesomeIcon icon={button.icon} /> {button.title}
      </div>
    ));
  };
  return (
    <div className={styles.container}>
      <h1>Admin Page</h1>

      {buttonGenerator(buttonArr)}
    </div>
  );
};

export default NavBar;
