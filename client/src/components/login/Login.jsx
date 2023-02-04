import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import "./login.scss";

export default function Login() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        navigate("/signup");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(email === "" || password === "") {
            setLoading(false);
            return;
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, {
            email,
            password,
        }).then((response) => {
            localStorage.setItem("userToken", response.data.token);
            navigate("/");
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        });
    }

    return (
        <>
        <Header />
        <div className="login">
            <div className="login-card">
                <div className="login-card-header">Login</div>
                <form className="login-card-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="login-card-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="login-card-form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="login-card-form-group">
                        { loading ?
                            <button disabled>Loading...</button>
                            :
                            <button type="submit">Login</button>}
                    </div>
                </form>
                <div className="login-card-footer">
                    <p>Don't have an account? <span onClick={handleClick}>Register</span></p>
                </div>

                {error && <div className="login-card-error">Invalid Credentials</div>}
            </div>
        </div>
        </>
    );
}