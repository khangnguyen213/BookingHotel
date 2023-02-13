import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("admin");
  setTimeout(() => navigate("/"), 50);
  return <div></div>;
};

export default Logout;
