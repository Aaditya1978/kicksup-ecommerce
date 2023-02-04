import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import "./signup.scss";

export default function Signup() {

    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        navigate("/login");
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const address = e.target.address.value;

        if(email === "" || password === "" || name === "" || address === "") {
            setLoading(false);
            return;
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/register`, {
            name,
            email,
            password,
            address,
        }).then((response) => {
            localStorage.setItem("userToken", response.data.token);
            navigate("/");
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            setError(true);
            setErrorMsg(err.response.data.message);
            setTimeout(() => {
                setError(false);
            }, 3000);
        });
    }

    return (
        <>
        <Header />
        <div className="signup">
            <div className="signup-card">
                <div className="signup-card-header">Signup</div>
                <form className="signup-card-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="signup-card-form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" />
                    </div>
                    <div className="signup-card-form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className="signup-card-form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" />
                    </div>
                    <div className="signup-card-form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div className="signup-card-form-group">
                        { loading ?
                            <button disabled>Loading...</button>
                            :
                            <button type="submit">Signup</button>}
                    </div>
                </form>
                <div className="signup-card-footer">
                    <p>Already have an account? <span onClick={handleClick}>Login</span></p>
                </div>

                {error && <div className="signup-card-error">{errorMsg}</div>}
            </div>
        </div>
        </>
    );
}