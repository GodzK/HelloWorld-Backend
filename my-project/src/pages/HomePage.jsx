import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css"; // Make sure the CSS file name matches
import sit from "./sit.png";
function HomePage() {
  return (
    <div className="homepage">
      <div className="hero-container">
        <div className="hero-overlay"></div>
        <div>
          <div className="hero-content">
            <h1 className="hero-title">
              <img src={sit} alt="" />
            </h1>
            <div className="right-content">
                <h1 className="hero-h1">Booking</h1>
            <p className="hero-description">
            King Mongkut's University of Technology Thonburi
          </p>
            </div>
            
          </div>
          
        </div>
        <button className="hero-button">START</button>
      </div>
    </div>
  );
}

export default HomePage;
