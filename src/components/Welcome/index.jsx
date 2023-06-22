import React from "react";
import "./styles/welcome.scss";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <section className="welcome-container">
      <div className="welcome-message">
        <p>Welcome to our app</p>
        <span>
            <p>Already a member?<span><Link to="/login"> Login </Link></span></p>
         </span>
        <Link to="/signup"> Get Started </Link>
      </div>
    </section>
  );
};

export default Welcome;
