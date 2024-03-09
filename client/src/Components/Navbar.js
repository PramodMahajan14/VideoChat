import React from "react";
import video from "../assets/Images/video.svg";
import "../App.css";
const Navbar = () => {
  return (
    <>
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg  bg-white  fixed-top">
          <div class="container">
            {" "}
            <a class="navbar-brand d-flex align-items-center">
              <img src={video} alt="pic" className="logo" />
              <span class="ml-3 font-weight-bold">BRAND</span>
            </a>{" "}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
