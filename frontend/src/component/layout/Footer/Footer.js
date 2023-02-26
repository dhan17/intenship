import React from "react";
import "./Footer.css";
import logo from "../../../images/img.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="left-footer">
        <img className="logo-footer" src={logo} alt="logo" />
      </div>
      <div className="mid-footer">
        <h2>Food ordering is now just a few clicks away!</h2>
        <p>Copyright &copy; RTH</p>
      </div>
      <div className="right-footer">
        <h4>Connect With Us:</h4>
        <a href="https://twitter.com/"><p>Twitter</p></a>
        <a href="https://instagram.com/"><p>Instagram</p></a>
        <a href="https://linkedin.com/"><p>Linkedin</p></a>
      </div>
    </footer>
  );
};

export default Footer;
