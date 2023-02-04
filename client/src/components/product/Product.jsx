import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiShoppingBag3Line, RiCalendarLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsStarFill, BsStarHalf, BsStar, BsCheckLg } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdArrowBackIosNew } from "react-icons/md";
import axios from "axios";
import Header from "../header/Header";
import blackBox from "../../assets/black.jpg";
import blueBox from "../../assets/blue.png";
import blackCheck from "../../assets/blacheck.png";
import blueCheck from "../../assets/bluecheck.png";
import "./product.scss";

export default function Product() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(0);
    const [cart, setCart] = useState([]);
    const product_id = useParams().id;

    const handleGoBack = () => {
        navigate(`/store`);
    }

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
        const getProduct = async () => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/${product_id}`)
            .then((response) => {
                setProduct(response.data.product);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        getProduct();
      }, [product_id]);

      useEffect(() => {
        const getCart = async () => {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/cart/get/${user.id}`)
            .then((response) => {
                setCart(response.data.cartItems);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        if(user) {
            getCart();
        }
    }, [user]);

        const handleImageChange = (index) => {
            setSelectedImage(index);
        }

        const handleSizeChange = (index) => {
            setSelectedSize(index);
        }

        const handleAddToCart = () => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/cart/add`, {
                user_id: user.id,
                product_id: product.id,
                quantity: 1,
            })
            .then((response) => {
                // check of response.data.cartItem.id is already present in cart
                // if yes, then increase the quantity
                // else add the cartItem to cart
                const cartItem = response.data.cartItem;
                const cartItemIndex = cart.findIndex((item) => item.cartItemId === cartItem.id);
                if(cartItemIndex !== -1) {
                    cart[cartItemIndex].quantity += 1;
                    setCart([...cart]);
                } else {
                    const cartItem = {
                        cartItemId: response.data.cartItem.id,
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: response.data.cartItem.quantity,
                        image: JSON.parse(product.images)[0],
                    }
                    setCart([...cart, cartItem]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }

    const handleDeleteFromCart = (cartItemId) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/api/cart/remove/${cartItemId}`)
        .then((response) => {
            const cartItemIndex = cart.findIndex((item) => item.cartItemId === cartItemId);
            if(cartItemIndex !== -1) {
                cart.splice(cartItemIndex, 1);
                setCart([...cart]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleOrder = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/order/create`, {
            user_id: user.id,
        })
        .then((response) => {
            setCart([]);
            navigate("/profile");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
        <Header />
        <div className="product">

            {/* Product Card */}
            {product && (
            <div className="product-card">
                <div className="header">
                    <MdArrowBackIosNew onClick={handleGoBack} /> &nbsp; your design space
                </div>
                <div className="product-details">
                    <div className="product-image">
                        <img src={JSON.parse(product.images)[selectedImage]} alt="shoe" />
                    </div>
                    <div className="product-images">
                        {JSON.parse(product.images).map((image, index) => (
                            index !== selectedImage && <img src={image} key={index} alt="shoe" onClick={() => handleImageChange(index)} />
                        ))}
                    </div>
                    <div className="product-desc">
                        <div className="name">
                            {product.name}
                        </div>
                        <div className="desc">
                            {product.category}
                        </div>

                        <div className="rating">
                            <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarHalf /> <BsStar />
                        </div>

                        <div className="price">
                            Rs. {product.price}
                        </div>
                        <div className="descount">Get an exclusive 20% discount</div>

                        <div className="choices">
                            <div className="choice">
                                <div className="choice-heading">Front</div>
                                <div className="choice-option">
                                    <div className="checked"><BsCheckLg /></div>
                                    <img src={blackCheck} alt="black" />
                                </div>
                                <div className="choice-option">
                                    <img src={blueCheck} alt="blue" />
                                </div>
                                <div className="choice-option">
                                    <img src={blueBox} alt="blue" />
                                </div>
                            </div>
                            <div className="choice">
                                <div className="choice-heading">Middle</div>
                                <div className="choice-option">
                                    <div className="checked"><BsCheckLg /></div>
                                    <img src={blackCheck} alt="black" />
                                </div>
                                <div className="choice-option">
                                    <img src={blueCheck} alt="blue" />
                                </div>
                                <div className="choice-option">
                                    <img src={blueBox} alt="blue" />
                                </div>
                            </div>
                            <div className="choice">
                                <div className="choice-heading">Back</div>
                                <div className="choice-option">
                                    <div className="checked"><BsCheckLg /></div>
                                    <img src={blackCheck} alt="black" />
                                </div>
                                <div className="choice-option">
                                    <img src={blueCheck} alt="blue" />
                                </div>
                                <div className="choice-option">
                                    <img src={blackBox} alt="blue" />
                                </div>
                            </div>
                            <div className="choice">
                                <div className="choice-heading">Sole</div>
                                <div className="choice-option">
                                    <div className="checked"><BsCheckLg /></div>
                                    <img src={blackCheck} alt="black" />
                                </div>
                                <div className="choice-option">
                                    <img src={blueCheck} alt="blue" />
                                </div>
                                <div className="choice-option">
                                    <img src={blueBox} alt="blue" />
                                </div>
                            </div>
                            <div className="choice">
                                <div className="choice-heading">Size</div>
                                {JSON.parse(product.size).map((size, index) => (
                                    <div className="choice-option" key={index}>
                                        {index === selectedSize && <div className="checked"><BsCheckLg /></div>}
                                        <div className="size" onClick={() => handleSizeChange(index)}>{size}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addcart">
                    { isAuth ? <button onClick={handleAddToCart}>Add to Cart</button> :
                     <button onClick={() => navigate('/login')}>Add to Cart</button>
                    }
                </div>
            </div>
            )}

            {/* Cart Card */}
            <div className="cart-card">
                <div className="header">
                    <div className="heading">Cart</div>
                    <div className="icon"> <RiShoppingBag3Line /> </div>
                </div>
                { cart.length === 0 ?
                    <div className="no-cart-items">
                        What's stopping you, desginer?
                    </div> :
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div className="cart-item" key={index}>
                                <div className="close">
                                    <AiOutlineCloseCircle onClick={() => handleDeleteFromCart(item.cartItemId)} />
                                </div>
                                <div className="image">
                                    <img src={item.image} alt="product" />
                                </div>
                                <div className="details">
                                    <div className="name detail">{item.name}</div>
                                    <div className="type detail">{item.category}</div>
                                    <div className="size detail">Qnt: {item.quantity}</div>
                                    <div className="price detail">Rs. {item.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                <div className="details">
                    <div className="home">
                        <HiOutlineLocationMarker /> Home
                    </div>
                    <div className="date">
                        <RiCalendarLine /> Select Date
                    </div>
                </div>
                <div className="cart-btn">
                    {
                        !isAuth ? <button onClick={() => navigate('/login')}>login to order</button> :
                        cart.length > 0 ? <button onClick={handleOrder}>order now</button> :
                        <button disabled>order now</button>
                    }
                </div>
            </div>
        </div>
        </>
    );
}