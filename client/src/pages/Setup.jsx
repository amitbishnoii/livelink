import React from 'react'
import "../CSS/Setup.css"
import setupImg from "../assets/setup.jpg"
import { GrLinkNext } from "react-icons/gr";

const setupProfile = () => {
  return (
    <>
      <div className="main-page">
        <nav>
          <h2>LiveLink</h2>
        </nav>
        <div className="setup-page">
          <img src={setupImg} alt="image" />
          <p>Welcome to LiveLink</p>
          <button>Get Started <GrLinkNext /></button>
        </div>
      </div>
    </>
  )
}

export default setupProfile