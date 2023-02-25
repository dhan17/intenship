import "./Navbar.css";
import { useState } from "react";
import useViewport from "../../../viewport/useViewport";
import { NavLink } from "react-router-dom";
import logo from "../../../images/digitalLogo.png";
import Search from "@mui/icons-material/SearchOutlined"
import Cart from "@mui/icons-material/ShoppingCart";
import Account from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const { isMobile, isTablet } = useViewport();
  const [showMobileView, setShowMobileView] = useState(false);

  return (
    <div className="top-bar">
      <div className="top-left">
        <NavLink to="/"><img className="logo" src={logo} alt="Logo" /></NavLink>
      </div>
      <div
        className="top-center"
        style={{ display: isMobile ? "none" : "inline" }}
      >
        <ul className="navbar-list">
          <li className="navbar-item">
            <NavLink
              exact
              activeClassName="active_class"
              to="/"
              style={{ textDecoration: "none", color: "white" }}
            >
              Home
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              exact
              activeClassName="active_class"
              to="/Menu"
              style={{ textDecoration: "none", color: "white" }}
            >
              Menu
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              exact
              activeClassName="active_class"
              to="/About"
              style={{ textDecoration: "none", color: "white" }}
            >
              About Us
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink
              exact
              activeClassName="active_class"
              to="/Contact"
              style={{ textDecoration: "none", color: "white" }}
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="top-right">
        <div className="navbar-icons">
          <a href="/search">
            <Search />
          </a>
          <a href="/cart">
            <Cart />
          </a>
          <a href="/login">
            <Account />
          </a>
        </div>
        <div className="Menu" style={{ display: isMobile ? "inline" : "none" }}>
          <i class="fa-solid fa-bars" style={{ color: "white" }}></i>
        </div>
      </div>
    </div>
  );
}
