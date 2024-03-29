import NavBar from "../components/NavBar";
import styles from "./Transactions.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  if (!localStorage.admin) {
    navigate("/login");
  }
  const admin = JSON.parse(localStorage.admin);
  const [transactionsArr, setTransactionsArr] = useState();

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
    return arr.map((transaction) => {
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

  useEffect(() => {
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
        <p className={styles.fTitle}>Transactions</p>
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

export default Transactions;
