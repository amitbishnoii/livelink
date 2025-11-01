import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import "../CSS/Register.css"

const Register = () => {

    const onSubmit = (data) => {
        console.log(data);
    }

    const navigate = useNavigate()

    const handleNav = () => {
        navigate("/login")
    }

    const {
        register,
        handleSubmit
    } = useForm()

    return (
        <>
            <div className="main">
                <div className="register-page">

                    <h1>Register</h1>
                    <div className="register-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input {...register("firstName")} required={true} placeholder='First Name' />
                            <input {...register("lastName")} required={true} placeholder='Last Name' />
                            <input {...register("userName")} required={true} placeholder='Username' />
                            <input {...register("password")} required={true} placeholder='Password' />
                            <input {...register("email")} required={true} placeholder='email' />
                            <div className="buttons">
                                <button type='submit'>Sign-up</button>
                                <button onClick={handleNav}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register