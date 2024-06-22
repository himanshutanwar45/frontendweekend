import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = ({ setProgress, toastmsg }) => {

    let host = process.env.REACT_APP_HOST;

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    let history = useNavigate();

    useEffect(() => {
        setProgress(40)
        setTimeout(() => {
            createAdminUser()
            setProgress(100)
            // const currentDate = new Date();
            // const currentDay = currentDate.getDay();
            // const currentHour = currentDate.getHours();
            // if ((currentDay === 0 || currentDay === 6) && currentHour === "9") {
            //     createAutoEntry()
            // }
        }, 1000)
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (e) => {
        try {
            setProgress(40)
            e.preventDefault()

            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ email: credentials.email, password: credentials.password }),

            })

            const json = await response.json()
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                localStorage.setItem('fullName', json.empName)
                localStorage.setItem('userId', json.userId)
                localStorage.setItem('isAdmin', json.isAdmin)
                history('/')
            }
            else {
                toastmsg("Invalid Credentials !!!!", "error")
            }
        }
        catch (error) {
            throw error.message
        }
        setProgress(100)
    }

    const createAdminUser = async () => {
        try {
            const response = await fetch(`${host}/api/auth/createadmin`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            await response.json();

        } catch (error) {
            throw error.message
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit} className='form'>
                    <div className="screen-1">
                        <div className="email">
                            <label htmlFor="email">Email Address</label>
                            <div className="sec-2">
                                <ion-icon name="mail-outline"></ion-icon>
                                <input type="email" id="email" name="email" onChange={onChange} value={credentials.email} required />
                            </div>
                        </div>
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <div className="sec-2">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input className="pas" type="password" id="password" name="password" onChange={onChange} value={credentials.password} required />
                                <ion-icon className="show-hide" name="eye-outline"></ion-icon>
                            </div>
                        </div>
                        <button className="login" >Login </button>
                        <div className="footer"><span>Signup</span><span>Forgot Password?</span></div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Login
