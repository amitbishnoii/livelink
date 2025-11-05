import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SetupProfile from './Setup';
import styles from "../CSS/Register.module.css";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [ userInfo, setuserInfo ] = useState([]);

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const r = await res.json();

    setuserInfo(r.userDetails);
    console.log(r.userDetails);
    if (r.success) {
      navigate("/setup", { state: { user: r.userDetails } });
    }
  };

  const handleNav = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>LiveLink | Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input {...register("firstName")} required placeholder="First Name" />
          <input {...register("lastName")} required placeholder="Last Name" />
          <input {...register("userName")} required placeholder="Username" />
          <input {...register("password")} required type="password" placeholder="Password" />
          <input {...register("email")} required type="email" placeholder="Email" />

          <div className={styles.buttons}>
            <button type="submit">Sign up</button>
            <button onClick={handleNav}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
