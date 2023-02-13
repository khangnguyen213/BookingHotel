import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingForm from "./BookingForm";

const Hotel = () => {
  const query = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const [hotelData, setHotelData] = useState();
  const [photos, setPhotos] = useState([]);
  const [isBooking, setIsBooking] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/hotels/${query.id}`)
      .then((res) => res.json())
      .then((data) => {
        setHotelData(data[0]);
        const photoList = [];
        data[0].photos.forEach((photo) => {
          const p = { src: Object.values(photo).join("") };
          photoList.push(p);
        });
        setPhotos(photoList);
        if (queryParams.get("booking")) {
          setIsBooking(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [query.id]);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction, limit) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? limit : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === limit ? 0 : slideNumber + 1;
    }
    // if (newSlideNumber < 0) {
    //   newSlideNumber = limit;
    // }
    // if (newSlideNumber > limit) {
    //   newSlideNumber = 0;
    // }
    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {hotelData && (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l", photos.length)}
              />
              <div className="sliderWrapper">
                <img
                  src={photos[slideNumber].src}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r", photos.length)}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button
              className="bookNow"
              onClick={() => {
                setIsBooking(true);
              }}
            >
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{hotelData.title}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{hotelData.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {hotelData.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${hotelData.cheapestPrice} at this property and
              get a free airport taxi
            </span>
            <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo.src}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{hotelData.title}</h1>
                <p className="hotelDesc">{hotelData.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a night stay!</h1>

                <h2>
                  <b>${hotelData.cheapestPrice}</b> (1 night)
                </h2>
                <button
                  onClick={() => {
                    setIsBooking(true);
                  }}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          {isBooking && <BookingForm />}
          <MailList />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Hotel;
