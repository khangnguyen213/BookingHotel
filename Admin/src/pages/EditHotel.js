import NavBar from "../components/NavBar";
import styles from "./EditHotel.module.css";

import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const EditHotel = () => {
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
  const hotelIdRef = useRef();

  const [hotelsArr, setHotelsArr] = useState();
  const [choosedHotel, setChoosedHotel] = useState();

  const defaultValue = choosedHotel;

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

  const hotelChangeHandler = (e) => {
    const hotel = hotelsArr.filter((hotel) => hotel._id === e.target.value)[0];
    setChoosedHotel(hotel);
    console.log(choosedHotel);
  };

  useEffect(() => {
    fetch("http://localhost:5000/hotel")
      .then((res) => res.json())
      .then((data) => setHotelsArr(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {choosedHotel && console.log("1", choosedHotel)}
      <NavBar isLoggedIn={true} />
      <div className={styles.container}>
        <div className={styles.title}>Edit Hotel</div>
        <form className={styles.hForm}>
          <div className={styles.iContainer}>
            <label>Hotel</label>
            <select ref={hotelIdRef} onChange={hotelChangeHandler}>
              <option>Select your hotel</option>
              {hotelsArr &&
                hotelsArr.map((hotel) => (
                  <option value={hotel._id} key={hotel.name}>
                    {hotel.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={styles.iContainer}>
            <label>Type</label>
            {!choosedHotel && (
              <input placeholder="Hotel" type="text" ref={typeRef} />
            )}
            {choosedHotel && (
              <input
                defaultValue={choosedHotel.type}
                type="text"
                ref={typeRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>City</label>
            {!choosedHotel && (
              <input placeholder="City" type="text" ref={cityRef} />
            )}
            {choosedHotel && (
              <input
                defaultValue={choosedHotel.city}
                type="text"
                ref={cityRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>Address</label>
            {!choosedHotel && (
              <input placeholder="Adress" type="text" ref={addressRef} />
            )}
            {choosedHotel && (
              <input
                defaultValue={choosedHotel.address}
                type="text"
                ref={addressRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>Distance from City Center</label>
            {!choosedHotel && (
              <input placeholder="500" type="text" ref={distanceRef} />
            )}
            {choosedHotel && (
              <input
                defaultValue={choosedHotel.distance}
                type="text"
                ref={distanceRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>Title</label>
            {!choosedHotel && (
              <input placeholder="The Hotel Title" type="text" ref={titleRef} />
            )}
            {choosedHotel && console.log("2", choosedHotel.title) && (
              <input
                defaultValue={defaultValue.title}
                type="text"
                ref={titleRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>Description</label>
            {!choosedHotel && (
              <input placeholder="Description" type="text" ref={descRef} />
            )}
            {choosedHotel && (
              <input
                defaultValue={choosedHotel.desc}
                type="text"
                ref={descRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>Price</label>
            {!choosedHotel && (
              <input placeholder="100" type="text" ref={priceRef} />
            )}
            {choosedHotel && (
              <input
                defaultValue={choosedHotel.cheapestPrice}
                type="text"
                ref={priceRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>Images</label>
            {!choosedHotel && (
              <input
                type="text"
                placeholder="Seperate image urls by ' ; '"
                ref={imageRef}
              />
            )}
            {choosedHotel && (
              <input
                type="text"
                defaultValue={choosedHotel.photos.join(";")}
                ref={imageRef}
              />
            )}
          </div>
          <div className={styles.iContainer}>
            <label>Featured</label>
            {!choosedHotel && <input type="checkbox" ref={featuredRef} />}
            {choosedHotel && (
              <input
                type="checkbox"
                defaultChecked={choosedHotel.featured}
                ref={featuredRef}
              />
            )}
          </div>
          <button onClick={submitHandler}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;
