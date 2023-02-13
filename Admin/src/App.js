import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Hotel from "./pages/Hotel";
import NewHotel from "./pages/NewHotel";
import Rooms from "./pages/Rooms";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import NewRoom from "./pages/NewRoom";
import EditHotel from "./pages/EditHotel";
import EditRoom from "./pages/EditRoom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/hotels" element={<Hotel />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/users" element={<Users />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/new-hotel" element={<NewHotel />} />
      <Route path="/new-room" element={<NewRoom />} />
      <Route path="/edit-hotel" element={<EditHotel />} />
      <Route path="/edit-room" element={<EditRoom />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
