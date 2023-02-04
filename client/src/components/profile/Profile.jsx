import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import "./profile.scss";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false)
    const [orders, setOrders] = useState([]);

    const getUser = async (userToken) => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/details`, {
          headers: {
            "x-access-token": userToken,
          },
        });
        if(response.status === 200) {
          setUser(response.data.user);
          setIsAuth(true);
        } else {
          setIsAuth(false);
          localStorage.removeItem("userToken");
        }
      }

    
      useEffect(() => {
        if(localStorage.getItem("userToken")) {
          getUser(localStorage.getItem("userToken"));
        } else {
          setIsAuth(false);
        }
      }, []);

      useEffect(() => {
        const getOrders = async () => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/order/get/${user.id}`)
            .then((response) => {
                console.log(response.data.orders);
                setOrders(response.data.orders);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        if(user) {
            getOrders(user);
        }
      }, [user]);

    return (
        <>
        <Header />
        <div className="profile">
            { isAuth ? (
            <>
            <div className="header">
                Hello {user.name}!
            </div>
            <div className="order-details">
                <div className="order-header">
                    Your Orders
                </div>
                { orders.length > 0 ? (
                <div className="order-body">
                    {orders.map((order) => (
                        <div className="order" key={order.id}>
                            <div className="order-header">
                                Order ID: {order.order.id}
                            </div>
                            <div className="order-header">
                                Order Date: {new Date(order.order.order_date).toDateString()}
                            </div>
                            <div className="order-header">
                                Total Amount: Rs {order.order.total}
                            </div>
                            <div className="order-items">
                                {order.products.map((product, index) => (
                                    <div className="order-item" key={index}>
                                        <img src={product.image} alt="product" />
                                        <div className="order-item-detail">{product.name}</div>
                                        <div className="order-item-detail">{product.category}</div>
                                        <div className="order-item-detail">Quantity: {product.quantity}</div>
                                        <div className="order-item-detail">Rs {product.price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                ) : (
                    null
                )}
            </div>
            </>
            ) : (
                <div className="header">Not logged in</div>
            )}
        </div>
        </>
    );
}