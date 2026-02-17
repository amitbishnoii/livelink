import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SetupProfile from './Setup';
import styles from "../CSS/Register.module.css";

const Register = () => {
  document.title = "Register | LiveLink";
  const navigate = useNavigate();
  const [error, seterror] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    const r = await res.json();
    if (r.success) {
      navigate("/setup", { state: { user: r.userDetails } });
    } else {
      seterror(r.message)
    }
  };

  const handleNav = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>Register | LiveLink</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input {...register("firstName")} required placeholder="First Name" />
          <input {...register("lastName")} required placeholder="Last Name" />
          <input {...register("userName")} required placeholder="Username" />
          <input {...register("password")} required type="password" placeholder="Password" />
          <input {...register("email")} required type="email" placeholder="Email" />
          {error ? <p className='error-message'>{error}</p> : <p></p>}

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
