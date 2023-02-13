import { Fragment, useEffect, useState } from "react";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const [overviewData, setOverviewData] = useState();
  const fpItemGenerator = (hotel) => {
    const detailUrl = `hotels/${hotel._id}`;
    const imageUrl =
      hotel.photos.length > 0
        ? Object.values(hotel.photos[0]).join("")
        : "https://cdn.dribbble.com/users/4354067/screenshots/13167254/media/5bdaf8ca6b78e6cef8d2ceafc17c2ddd.png?compress=1&resize=400x300&vertical=top";
    return (
      <div className="fpItem">
        <img src={imageUrl} alt="" className="fpImg" />
        <span className="fpName">
          <a href={detailUrl} target="_blank" rel="noreferrer">
            {hotel.name}
          </a>
        </span>
        <span className="fpCity">{hotel.city}</span>
        <span className="fpPrice">Starting from ${hotel.cheapestPrice}</span>
        <div className="fpRating">
          <button>{hotel.rating}</button>
          {/* <span>Excellent</span> */}
        </div>
      </div>
    );
  };
  useEffect(() => {
    fetch("http://localhost:5000/overview")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((result) => setOverviewData(result))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Fragment>
      {overviewData && (
        <div className="fp">
          {fpItemGenerator(overviewData.topRatedHotel[0])}
          {fpItemGenerator(overviewData.topRatedHotel[1])}
          {fpItemGenerator(overviewData.topRatedHotel[2])}
        </div>
      )}
    </Fragment>
  );
};

export default FeaturedProperties;
