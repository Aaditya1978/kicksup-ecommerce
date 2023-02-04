import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "./adminlogin.scss";

export default function AdminLogin() {

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(email === "" || password === "") {
            setLoading(false);
            return;
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/login`, {
            email,
            password,
        }).then((response) => {
            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin_home");
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
    <div className="adminlogin">
        <div className="adminlogin-card">
            <div className="adminlogin-card-header">Login</div>
            <form className="adminlogin-card-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="adminlogin-card-form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className="adminlogin-card-form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className="adminlogin-card-form-group">
                    { loading ?
                        <button disabled>Loading...</button>
                        :
                        <button type="submit">Login</button>}
                </div>
            </form>

            {error && <div className="adminlogin-card-error">Invalid Credentials</div>}
        </div>
    </div>
    );
}