import NavBar from "../components/NavBar";
import styles from "./Rooms.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const navigate = useNavigate();
  if (!localStorage.admin) {
    navigate("/login");
  }
  const admin = JSON.parse(localStorage.admin);
  const [hotelsArr, setHotelsArr] = useState();
  const deleteHandler = (hotelId, roomId, roomNumbers) => {
    let isConfirmed =
      prompt("Type DELETE if you confirm to delete these rooms") === "DELETE";
    const requestBody = {
      hotelId,
      roomId,
      roomNumbers,
      userId: admin._id,
    };
    console.log(requestBody);
    if (isConfirmed) {
      fetch("http://localhost:5000/delete-room", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => {
          if (res.status === 404) {
            throw new Error("The room has already booked in near future");
          } else {
            return navigate(0);
          }
        })
        .catch((err) => alert(err.toString()));
    }
  };

  const roomsGenerator = (arr, hotel) => {
    return arr.map((room) => {
      return (
        <div className={styles.tRow}>
          <span className={styles.colId}>{hotel.name}</span>
          <span className={styles.colName}>{room.title}</span>
          <span className={styles.colType}>${room.price}</span>
          <span className={styles.colTitle}>{room.desc}</span>
          <span className={styles.colCity}>{room.roomNumbers.join(" , ")}</span>

          <span className={styles.colAction}>
            <button
              onClick={() => {
                deleteHandler(hotel._id, room._id, room.roomNumbers);
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
      .then((data) => {
        console.log(data);
        setHotelsArr(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={true} />
      <div className={styles.container}>
        <p className={styles.fTitle}>Room List</p>
        <div className={styles.table}>
          <div className={styles.tfRow}>
            <span className={styles.colId}>Hotel</span>
            <span className={styles.colName}>Title</span>
            <span className={styles.colType}>Price</span>
            <span className={styles.colTitle}>Description</span>
            <span className={styles.colCity}>Rooms</span>
            <span className={styles.colAction}>Button</span>
          </div>
          {hotelsArr &&
            hotelsArr.map((hotel) => roomsGenerator(hotel.rooms, hotel))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
