import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx";

const Layout = () => {
  return (
    <div
      style={{
        height: "100%",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
