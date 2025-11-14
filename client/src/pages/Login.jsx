import React from 'react';
import styles from "../CSS/Login.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    const r = await res.json();
    if (r.success) {
      navigate("/chat", { state: { user: r.Username } })
    }
  };

  const handleNav = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.title}>LiveLink | Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input {...register('username')} required placeholder='Username' />
          <input {...register('password')} required type="password" placeholder='Password' />

          <div className={styles.buttons}>
            <button type='submit'>Login</button>
            <button onClick={handleNav}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
