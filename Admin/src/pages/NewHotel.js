import NavBar from "../components/NavBar";
import styles from "./NewHotel.module.css";

import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const NewHotel = () => {
  const navigate = useNavigate();
  if (!localStorage.admin) {
    navigate("/login");
  }
  const admin = JSON.parse(localStorage.admin);
  const nameRef = useRef();
  const typeRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();
  const distanceRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const featuredRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const requestBody = {
      userId: admin._id,
      name: nameRef.current.value,
      type: typeRef.current.value,
      city: cityRef.current.value,
      address: addressRef.current.value,
      distance: distanceRef.current.value,
      photos: imageRef.current.value.split(";"),
      desc: descRef.current.value,
      cheapestPrice: priceRef.current.value,
      rating: 8,
      featured: featuredRef.current.checked,
      title: titleRef.current.value,
    };
    console.log(requestBody);

    fetch("http://localhost:5000/add-hotel", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return navigate("/hotels");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavBar isLoggedIn={true} />
      <div className={styles.container}>
        <div className={styles.title}>New Hotel</div>
        <form className={styles.hForm}>
          <div className={styles.iContainer}>
            <label>Name</label>
            <input placeholder="My Hotel" type="text" ref={nameRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Type</label>
            <input placeholder="Hotel" type="text" ref={typeRef} />
          </div>
          <div className={styles.iContainer}>
            <label>City</label>
            <input placeholder="Ha Noi" type="text" ref={cityRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Address</label>
            <input placeholder="elton 206 st." type="text" ref={addressRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Distance from City Center</label>
            <input placeholder="500" type="text" ref={distanceRef} />
          </div>
          <div className={styles.iContainer}>
            <label>Title</label>
            <input placeholder="The Hotel Title" type="text" ref={titleRef} />
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
            <label>Images</label>
            <input
              type="text"
              placeholder="Seperate image urls by ' ; '"
              ref={imageRef}
            />
          </div>
          <div className={styles.iContainer}>
            <label>Featured</label>
            <input type="checkbox" ref={featuredRef} />
          </div>
          <button onClick={submitHandler}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default NewHotel;
