import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../CSS/Setup.css";
import setupImg from "../assets/setup.jpg";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const SetupProfile = () => {
  const location = useLocation();
  const user = location.state?.user;
  const [showPage, setShowPage] = useState(false);
  const [username, setusername] = useState(user?.userName || "");
  const [bio, setbio] = useState("");
  const [dob, setdob] = useState();
  const navigate = useNavigate();
  const [pic, setpic] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("image", pic);
    formData.append("bio", bio);
    formData.append("username", username);
    formData.append("emailID", user.email);
    formData.append("dob", dob);

    let res = await fetch("http://localhost:3000/user/updateInfo", {
      method: "POST",
      body: formData
    })

    let r = await res.json()
    console.log(r);
    if (r.success) {
      navigate("/chat", { state: { user: user.userName } })
    }
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
              <label htmlFor="">Choose you Profile Picture</label>
              <input type="file" name="image" accept="image/*" onChange={e => setpic(e.target.files[0])}/>
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
