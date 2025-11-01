import React from 'react'
import "../CSS/Login.css"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
    }

    const handleNav = () => {
        navigate("/register")
    }

    return (
        <>
            <div className="main">
                <div className="login-card">
                    <h1>Login</h1>
                    <div className="login-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register('username')} required={true} placeholder='Username' />
                            <br />
                            <input {...register('password')} required={true} placeholder='Password' />
                            <br />
                            <div className="buttons">
                                <button type='submit'>Login</button>
                                <button onClick={handleNav}>Sign-up</button>
                            </div>
                        </form >
                    </div >
                </div>
            </div>
        </>
    )
}

export default Login