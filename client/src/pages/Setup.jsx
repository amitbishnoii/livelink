import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/Setup.css";
import setupImg from "../assets/setup.jpg";
import { GrLinkNext } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";

const SetupProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [showPage, setShowPage] = useState(false);
  const [username, setusername] = useState(user?.userName || "");
  const [bio, setbio] = useState("");
  const [dob, setdob] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:3000/user/updateInfo", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ bio: bio, username: username, emailID: user.email, dob })
    })
    let r = await res.json()
  }

  return (
    <div className="main-page">
      <nav>
        <h2>LiveLink</h2>
      </nav>

      <AnimatePresence mode="wait">
        {!showPage ? (
          <motion.div
            key="setup"
            className="setup-page"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <img src={setupImg} alt="setup" />
            <p>Welcome to LiveLink</p>
            <button onClick={() => setShowPage(true)}>
              Get Started <GrLinkNext />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="profile"
            className="profile-setup"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.25 }}
          >
            <h3>Setup Your Profile</h3>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setusername(e.target.value)} />
              <label>Bio</label>
              <input type="text" value={bio} placeholder="Enter Something" onChange={e => setbio(e.target.value)} />
              <label>Date of Birth</label>
              <input type="date" value={dob} onChange={e => setdob(e.target.value)} />

              <button type="submit">Continue</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SetupProfile;
