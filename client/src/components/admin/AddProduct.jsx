import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addproduct.scss";

export default function AddProduct() {

    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if(!token) {
            navigate("/admin_login");
        }
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/details`, {
            headers: {
                "x-access-token": token,
            },
        })
        .then((response) => {
            setAdmin(response.data.admin);
        })
        .catch((error) => {
            alert("Something went wrong!");
            localStorage.removeItem("adminToken");
            navigate("/admin_login");
        });
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const name = e.target[0].value;
        const price = e.target[1].value;
        const category = e.target[2].value;
        const images = [];
        for(let i = 3; i < 6; i++) {
            if(e.target[i].value) {
                images.push(e.target[i].value);
            }
        }
        const sizes = [];
        for(let i = 6; i < 12; i++) {
            if(e.target[i].checked) {
                sizes.push(e.target[i].value);
            }
        }
        if(!name || !price || !category || !images.length || !sizes.length) {
            alert("Please fill all the fields!");
            setLoading(false);
            return;
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/addproduct`, {
            token: localStorage.getItem("adminToken"),
            name,
            price,
            category,
            images,
            sizes,
            rating: 0,
        })
        .then((response) => {
            setLoading(false);
            alert(response.data.message);
            navigate("/admin_home");
        })
        .catch((error) => {
            alert("Something went wrong!");
            setLoading(false);
        });
    }

    return (
        <div className="addproduct">
            <div className="header">{admin.name} Add Product</div>
            <div className="goback">
                <button onClick={() => navigate("/admin_home")}>Go Back</button>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Product Name</label>
                    <input type="text" required/>
                </div>
                <div className="form-item">
                    <label>Price</label>
                    <input type="number" required/>
                </div>
                <div className="form-item">
                    <label>Category</label>
                    <select>
                        <option value="sneaker">Sneaker</option>
                        <option value="loafers">Loafers</option>
                        <option value="casual">Casual</option>
                    </select>
                </div>
                <div className="form-item">
                    <label>Images</label>
                    <input type="url" required/>
                    <input type="url" />
                    <input type="url" />
                </div>
                <div className="form-item">
                    <label>Sizes</label>
                    <div className="check">
                        <div>
                            <input type="checkbox" value="5" />
                            <label>5</label>
                        </div>
                        <div>
                            <input type="checkbox" value="6" />
                            <label>6</label>
                        </div>
                        <div>
                            <input type="checkbox" value="7" />
                            <label>7</label>
                        </div>
                        <div>
                            <input type="checkbox" value="8" />
                            <label>8</label>
                        </div>
                        <div>
                            <input type="checkbox" value="9" />
                            <label>9</label>
                        </div>
                        <div>
                            <input type="checkbox" value="10" />
                            <label>10</label>
                        </div>
                    </div>
                </div>
                <div className="form-item">
                    {loading ? 
                        <button disabled>Loading...</button> : 
                        <button>Add Product</button>
                    }
                </div>
            </form>
        </div>
    );
}