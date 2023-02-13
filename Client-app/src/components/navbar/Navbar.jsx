import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    if (localStorage.user) {
      setUser(JSON.parse(localStorage.user));
    }
  }, [setUser]);

  const homeClickHandler = () => {
    navigate("/");
  };
  const loginClickHandler = () => {
    navigate("/login");
  };
  const logoutClickHandler = () => {
    localStorage.removeItem("user");
    setUser();
    navigate(0);
  };
  const registerClickHandler = () => {
    navigate("/register");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo" onClick={homeClickHandler}>
          Booking Website
        </span>
        {!user && (
          <div className="navItems">
            <button className="navButton" onClick={registerClickHandler}>
              Register
            </button>
            <button className="navButton" onClick={loginClickHandler}>
              Login
            </button>
          </div>
        )}

        {user && (
          <div className="navItems">
            <button
              className="navButton"
              onClick={() => navigate("/transaction")}
            >
              {user.username}
            </button>
            <button className="navButton" onClick={logoutClickHandler}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
