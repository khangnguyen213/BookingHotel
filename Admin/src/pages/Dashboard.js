import NavBar from "../components/NavBar";
import styles from "./Dashboard.module.css";
import {
  faAddressCard,
  faShoppingBag,
  faCalculator,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  if (!localStorage.admin) {
    navigate("/login");
  }
  const admin = JSON.parse(localStorage.admin);
  const [transactionsArr, setTransactionsArr] = useState();
  const [usersArr, setUsersArr] = useState();

  const formatDate = (dateObj) => {
    const today = new Date(dateObj);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  };

  const checkDateStatus = (startDate, endDate) => {
    const today = new Date();
    const startD = new Date(startDate);
    const endD = new Date(endDate);
    if (endD < today) {
      return "Checkout";
    }
    if (startD <= today && endD >= today) {
      return "Checkin";
    }
    if (startD > today) {
      return "Booked";
    }
  };

  const transactionsGenerator = (arr) => {
    return arr.slice(-8).map((transaction) => {
      return (
        <div className={styles.tRow} key={transaction._id}>
          <span className={styles.colId}>{transaction._id}</span>
          <span className={styles.colUser}>{transaction.user.fullName}</span>
          <span className={styles.colHotel}>{transaction.hotel.name}</span>
          <span className={styles.colRoom}>
            {transaction.roomNumbers.join(" , ")}
          </span>
          <span className={styles.colDate}>
            {formatDate(transaction.dateStart)} -{" "}
            {formatDate(transaction.dateEnd)}
          </span>
          <span className={styles.colPrice}>${transaction.price}</span>
          <span className={styles.colMethod}>{transaction.method}</span>
          <span className={styles.colStatus}>
            {checkDateStatus(transaction.dateStart, transaction.dateEnd)}
          </span>
        </div>
      );
    });
  };

  const countEarning = (arr) => {
    return arr.reduce((total, transaction) => total + transaction.price, 0);
  };

  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsersArr(data))
      .catch((err) => console.log(err));
    const requestBody = {
      userId: admin._id,
    };
    fetch("http://localhost:5000/all-transactions", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => setTransactionsArr(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={true} />
      <div className={styles.container}>
        <div className={styles.summaries}>
          <div className={styles.summary1}>
            <p>USERS</p>
            {usersArr && <h1>{usersArr.length}</h1>}
            <FontAwesomeIcon icon={faAddressCard} />
          </div>
          <div className={styles.summary2}>
            <p>TRANSACTIONS</p>
            {transactionsArr && <h1>{transactionsArr.length}</h1>}
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
          <div className={styles.summary3}>
            <p>EARNINGS</p>
            {transactionsArr && <h1>${countEarning(transactionsArr)}</h1>}
            <FontAwesomeIcon icon={faCoins} />
          </div>
          <div className={styles.summary4}>
            <p>BALANCE</p>
            {transactionsArr && <h1>${countEarning(transactionsArr)}</h1>}
            <FontAwesomeIcon icon={faCalculator} />
          </div>
        </div>
        <p className={styles.fTitle}>Lastest Transactions</p>
        <div className={styles.table}>
          <div className={styles.tfRow}>
            <span className={styles.colId}>ID</span>
            <span className={styles.colUser}>User</span>
            <span className={styles.colHotel}>Hotel</span>
            <span className={styles.colRoom}>Room</span>
            <span className={styles.colDate}>Date</span>
            <span className={styles.colPrice}>Price</span>
            <span className={styles.colMethod}>Method</span>
            <span className={styles.colStatus}>Status</span>
          </div>
          {transactionsArr && transactionsGenerator(transactionsArr)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
