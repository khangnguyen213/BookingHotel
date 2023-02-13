import { useNavigate } from "react-router-dom";
import "./searchItem.css";
import { format } from "date-fns";

const SearchItem = ({ hotelData, date }) => {
  const navigate = useNavigate();
  const name = hotelData.name;
  const distance = hotelData.distance;
  const type = hotelData.type;
  const description = hotelData.desc;
  const free_cancel = hotelData.featured;
  const price = hotelData.cheapestPrice;
  const rate = hotelData.rating;
  const img_url = hotelData.photos[0];
  let rate_text;
  if (rate >= 8) {
    rate_text = "Excellent";
  } else if (rate >= 5) {
    rate_text = "Good";
  } else {
    rate_text = "Average";
  }
  const clickShowHandler = () => {
    navigate(
      `/hotels/${hotelData._id}?booking=true&startDate=${format(
        date[0].startDate,
        "MM/dd/yyyy"
      )}&endDate=${format(date[0].endDate, "MM/dd/yyyy")}`
    );
  };
  return (
    <div className="searchItem">
      <img src={img_url} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{name}</h1>
        <span className="siDistance">{distance} from center</span>
        <span className="siSubtitle">{description}</span>
        <span className="siFeatures">{type}</span>
        {/* If can cancel */}
        {free_cancel ? (
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>{rate_text}</span>
          <button>{rate}</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">${price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton" onClick={clickShowHandler}>
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
