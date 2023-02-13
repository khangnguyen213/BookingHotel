import NavBar from "../components/NavBar";
import styles from "./Users.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  if (!localStorage.admin) {
    navigate("/login");
  }
  const [usersArr, setUsersArr] = useState();

  const usersGenerator = (arr) => {
    return arr.slice(-8).map((user) => {
      return (
        <div className={styles.tRow} key={user._id}>
          <span className={styles.colId}>{user._id}</span>
          <span className={styles.colHotel}>{user.username}</span>
          <span className={styles.colUser}>{user.fullName}</span>
          <span className={styles.colRoom}>{user.phoneNumber}</span>
          <span className={styles.colDate}>{user.email}</span>
          <span className={styles.colPrice}>
            {user.isAdmin ? "Admin" : "User"}
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsersArr(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={true} />
      <div className={styles.container}>
        <p className={styles.fTitle}>User List</p>
        <div className={styles.table}>
          <div className={styles.tfRow}>
            <span className={styles.colId}>ID</span>
            <span className={styles.colHotel}>User</span>
            <span className={styles.colUser}>Full name</span>
            <span className={styles.colRoom}>Phone Number</span>
            <span className={styles.colDate}>Email</span>
            <span className={styles.colPrice}>Role</span>
          </div>
          {usersArr && usersGenerator(usersArr)}
        </div>
      </div>
    </div>
  );
};

export default Users;
