import NavBar from "../components/NavBar";
import styles from "./NewRoom.module.css";

import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const NewRoom = () => {
  const navigate = useNavigate();
  if (!localStorage.admin) {
    navigate("/login");
  }
  const admin = JSON.parse(localStorage.admin);
  const roomNumbersRef = useRef();
  const maxPeopleRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const hotelIdRef = useRef();

  const [hotelsArr, setHotelsArr] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    const requestBody = {
      userId: admin._id,
      desc: descRef.current.value,
      title: titleRef.current.value,
      price: priceRef.current.value,
      roomNumbers: roomNumbersRef.current.value.split(";"),
      maxPeople: maxPeopleRef.current.value,
      hotelId: hotelIdRef.current.value,
    };
    console.log(requestBody);

    fetch("http://localhost:5000/add-room", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something wrong!!");
        } else {
          navigate("/rooms");
        }
      })
      .catch((err) => console.log(err));
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
        <div className={styles.title}>New Room</div>
        <form className={styles.hForm}>
          <div className={styles.iContainer}>
            <label>Hotel</label>
            <select ref={hotelIdRef}>
              {hotelsArr &&
                hotelsArr.map((hotel) => (
                  <option value={hotel._id} key={hotel.name}>
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.iContainer}>
            <label>Title</label>
            <input placeholder="Room Title" type="text" ref={titleRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Description</label>
            <input placeholder="Description" type="text" ref={descRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Price</label>
            <input placeholder="100" type="text" ref={priceRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Max People</label>
            <input placeholder="2" type="text" ref={maxPeopleRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Room Numbers</label>
            <input
              type="text"
              placeholder="Seperate room number by ' ; '"
              ref={roomNumbersRef}
            />
          </div>

          <button onClick={submitHandler}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default NewRoom;
