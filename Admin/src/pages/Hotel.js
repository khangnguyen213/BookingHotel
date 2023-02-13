import NavBar from "../components/NavBar";
import styles from "./Hotel.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const navigate = useNavigate();
  if (!localStorage.admin) {
    navigate("/login");
  }

  const admin = JSON.parse(localStorage.admin);
  const [hotelsArr, setHotelsArr] = useState();
  const deleteHandler = (hotelId) => {
    let isConfirmed =
      prompt("Type DELETE if you confirm to delete the hotel") === "DELETE";
    const requestBody = {
      hotelId,
      userId: admin._id,
    };
    if (isConfirmed) {
      fetch("http://localhost:5000/delete-hotel", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => {
          if (res.status === 404) {
            throw new Error("The hotel has already booked in near future");
          } else {
            return navigate(0);
          }
        })
        .catch((err) => alert(err.toString()));
    }
  };
  const hotelsGenerator = (arr) => {
    return arr.map((hotel) => {
      return (
        <div className={styles.tRow} key={hotel._id}>
          <span className={styles.colId}>{hotel._id}</span>
          <span className={styles.colName}>{hotel.name}</span>
          <span className={styles.colType}>{hotel.type}</span>
          <span className={styles.colTitle}>{hotel.title}</span>
          <span className={styles.colCity}>{hotel.city}</span>
          <span className={styles.colAction}>
            <button
              onClick={() => {
                deleteHandler(hotel._id);
              }}
            >
              Delete
            </button>
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/hotel")
      .then((res) => res.json())
      .then((data) => setHotelsArr(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={true} />
      <div className={styles.container}>
        <p className={styles.fTitle}>Hotel List</p>
        <div className={styles.table}>
          <div className={styles.tfRow}>
            <span className={styles.colId}>ID</span>
            <span className={styles.colName}>Name</span>
            <span className={styles.colType}>Type</span>
            <span className={styles.colTitle}>Title</span>
            <span className={styles.colCity}>City</span>
            <span className={styles.colAction}>Button</span>
          </div>
          {hotelsArr && hotelsGenerator(hotelsArr)}
        </div>
      </div>
    </div>
  );
};

export default Hotel;
