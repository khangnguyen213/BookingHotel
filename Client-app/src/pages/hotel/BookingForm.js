import styles from "./BookingForm.module.css";
import { DateRange } from "react-date-range";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const BookingForm = () => {
  const navigate = useNavigate();
  const query = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const [hotelData, setHotelData] = useState();
  const nameRef = useRef();
  const mailRef = useRef();
  const phoneRef = useRef();
  const idRef = useRef();
  const paymentRef = useRef();
  const [totalPay, setTotalPay] = useState(0);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: queryParams.get("startDate")
        ? new Date(queryParams.get("startDate"))
        : new Date(),
      endDate: queryParams.get("endDate")
        ? new Date(queryParams.get("endDate"))
        : new Date(),
      key: "selection",
    },
  ]);

  const generateChoices = (choiceArr, availableArr, price) => {
    return choiceArr
      .filter((roomNumber) => availableArr.includes(roomNumber))
      .map((roomNumber) => {
        return (
          <div className={styles.numberChoice} key={roomNumber}>
            <p>{roomNumber}</p>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setBookedRooms((prevState) => {
                    const newArr = prevState;
                    newArr.push(roomNumber);
                    return newArr;
                  });
                  setTotalPay((prevState) => {
                    const total = prevState + price;
                    return total;
                  });
                } else {
                  setBookedRooms((prevState) => {
                    const newArr = prevState.filter(
                      (room) => room !== roomNumber
                    );
                    return newArr;
                  });

                  setTotalPay((prevState) => {
                    const total = prevState - price;
                    return total;
                  });
                }
              }}
            />
          </div>
        );
      });
  };

  const generateRooms = (hotelData) => {
    return hotelData.rooms.map((room) => {
      return (
        <div className={styles.roomItem} key={room._id}>
          <div className={styles.roomInfo}>
            <div className={styles.roomTitle}>{room.title}</div>
            <div className={styles.roomDesc}>{room.desc}</div>
            <div className={styles.roomMax}>Max people: {room.maxPeople}</div>
            <div className={styles.roomPrice}>${room.price}</div>
          </div>
          <div className={styles.roomNumber}>
            {generateChoices(
              room.roomNumbers,
              hotelData.availableRoomList,
              room.price
            )}
          </div>
        </div>
      );
    });
  };

  const submitHandler = () => {
    const requestBody = {
      date,
      name: nameRef.current.value,
      mail: mailRef.current.value,
      phone: phoneRef.current.value,
      id: idRef.current.value,
      method: paymentRef.current.value,
      roomNumbers: [...new Set(bookedRooms)],
      hotelId: hotelData._id,
      userId: JSON.parse(localStorage.user)._id,
      price: totalPay,
    };
    console.log(requestBody);
    fetch("http://localhost:5000/add-transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/transaction");
        } else {
          throw new Error(res.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let timeoutId;
    const triggerApiRequest = () => {
      //code to make request
      console.log("FETCH POST ");
      const requestBody = { date: date };
      console.log(requestBody);
      fetch(`http://localhost:5000/check-hotel-available/${query.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setHotelData(data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      triggerApiRequest();
    }, 3000);
  }, [date, query.id]);

  return (
    <div className={styles.container}>
      <div className={styles.formDates}>
        <label>Dates</label>
        <DateRange
          onChange={(item) => setDate([item.selection])}
          minDate={new Date()}
          ranges={date}
        />
      </div>
      <div className={styles.formInfor}>
        <label>Reserve Infor</label>
        <h1>Your Full Name:</h1>
        <input placeholder="Full Name" type="text" ref={nameRef} />
        <h1>Your Mail:</h1>
        <input placeholder="Mail" type="text" ref={mailRef} />
        <h1>Your Phone Number:</h1>
        <input placeholder="Phone Number" type="text" ref={phoneRef} />
        <h1>Your Identity Card Number:</h1>
        <input placeholder="Identity Card Number" type="text" ref={idRef} />
      </div>
      <div className={styles.formRooms}>
        <label>Select Rooms</label>
        <div className={styles.roomItems}>
          {hotelData && generateRooms(hotelData)}
        </div>
      </div>
      <div className={styles.formPayment}>
        <label>Total Bill: ${totalPay}</label>
        <select id="payment" name="payment" ref={paymentRef}>
          <option>Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
        </select>
        <button onClick={submitHandler}>Reserve</button>
      </div>
    </div>
  );
};

export default BookingForm;
