import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./adminhome.scss";

export default function AdminHome() {

    const navigate = useNavigate();
    const [admin, setAdmin] = useState({});
    const [products, setProducts] = useState([]);

    const handleAddProduct = () => {
        navigate("/admin_add_product");
    }

    const handleDeleteProduct = (id) => {
        const token = localStorage.getItem("adminToken");
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/admin/deleteproduct/${id}`, {
            headers: {
                "x-access-token": token,
            },
        })
        .then((response) => {
            alert("Product deleted successfully!");
            setProducts(products.filter((product) => product.id !== id));
        })
        .catch((error) => {
            alert("Something went wrong!");
        });
    }

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

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/products`, {
            headers: {
                "x-access-token": token,
            },
        })
        .then((response) => {
            setProducts(response.data.products);
        })
        .catch((error) => {
            alert("Something went wrong!");
            localStorage.removeItem("adminToken");
            navigate("/admin_login");
        });
    }, [navigate]);
    

    return (
        <div className="adminhome">
            <div className="header">{admin.name} Home</div>
            <div className="product-card">
                <div className="heading">Product List</div>
                <div className="product-add">
                    <button onClick={handleAddProduct}>Add Product</button>
                </div>
                <div className="product-list">
                    {products.map((product) => (
                        <div className="product-item">
                            <div className="product-images">
                                {JSON.parse(product.images).map((image) => (
                                    <img src={image} alt="product" />
                                ))}
                            </div>
                            <div className="product-details">
                                <div className="product-name">Name: {product.name}</div>
                                <div className="product-price">Price: {product.price}</div>
                                <div className="product-rating">Rating: {product.rating}</div>
                                <div className="product-category">Category: {product.category}</div>
                                <div className="product-sizes">Sizes:&nbsp; 
                                    {JSON.parse(product.size).map((size) => (
                                        <span>{size}, </span>
                                    ))}
                                </div>
                            </div>
                            <div className="product-action">
                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}