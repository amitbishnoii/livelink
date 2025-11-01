import React from 'react'
import "../CSS/Login.css"
import { useForm } from "react-hook-form"

const onSubmit = (data) => {
    console.log(data);
}

const Login = () => {
    const {
        register,
        handleSubmit
    } = useForm()

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
                                <button>Sign-up</button>
                            </div>
                        </form >
                    </div >
                </div>
            </div>
        </>
    )
}

export default Login