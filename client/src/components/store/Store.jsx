import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiFilterAlt, BiSearch } from "react-icons/bi";
import { RiShoppingBag3Line, RiCalendarLine } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import Header from "../header/Header";
import "./store.scss";

export default function Store() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [costFilter, setCostFilter] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);
    const [cart, setCart] = useState([]);

    const handleProductClick = (id) => {
        navigate(`/store/${id}`);
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

      const getProducts = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product/all`)
        .then((response) => {
            setProducts(response.data.products);
            setTypes(response.data.types);
        })
        .catch((error) => {
            console.log(error);
        })
      }
    
      useEffect(() => {
        if(localStorage.getItem("userToken")) {
          getUser(localStorage.getItem("userToken"));
        } else {
          setIsAuth(false);
        }
      }, []);

    useEffect(() => {
        getProducts();
    }, []);

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

    const handleCostFilter = (e) => {
        if(e.target.checked) {
            setCostFilter([...costFilter, e.target.value]);
        } else {
            setCostFilter(costFilter.filter((item) => item !== e.target.value));
        }
    }

    const handleTypeFilter = (e) => {
        if(e.target.checked) {
            setTypeFilter([...typeFilter, e.target.value]);
        } else {
            setTypeFilter(typeFilter.filter((item) => item !== e.target.value));
        }
    }

    const handleFilter = () => {
        if(costFilter.length === 0 && typeFilter.length === 0) {
            getProducts();
        }
        else{
            axios.post(`${process.env.REACT_APP_BASE_URL}/api/product/filter`, {
                costFilter: costFilter,
                typeFilter: typeFilter
            })
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((error) => {
                console.log(error);
            })
        }
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
        <div className="store">

            {/* Filter Card */}
            <div className="filter-card">
                <div className="header">
                    <div className="heading">Filters</div>
                    <div className="icon"><BiFilterAlt/></div>
                </div>
                <div className="cost-filter">
                    <div className="heading">Cost</div>
                    <div className="filter-items">
                        <div className="filter-item">
                            <input type="checkbox" id="cost1" name="cost1" value="cost1" onChange={handleCostFilter} />
                            <label for="cost1"> Rs. 0 - 1499</label>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="cost2" name="cost2" value="cost2" onChange={handleCostFilter} />
                            <label for="cost1"> Rs. 1500 - 4000</label>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="cost3" name="cost3" value="cost3" onChange={handleCostFilter} />
                            <label for="cost2"> Rs. 4001 - 7000</label>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="cost4" name="cost4" value="cost4" onChange={handleCostFilter} />
                            <label for="cost3"> Rs. 7001+</label>
                        </div>
                    </div>
                </div>
                <div className="color-filter">
                    <div className="heading">Colour</div>
                    <div className="filter-items">
                        <div className="filter-item">
                            <input type="checkbox" id="color1" name="color1" value="color1" />
                            <span class="checkmark" style={{backgroundColor:"red"}}></span>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="color2" name="color2" value="color2" />
                            <span class="checkmark" style={{backgroundColor:"blue"}}></span>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="color3" name="color3" value="color3" />
                            <span class="checkmark" style={{backgroundColor:"yellow"}}></span>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="color4" name="color4" value="color4" />
                            <span class="checkmark" style={{backgroundColor:"green"}}></span>
                        </div>
                    </div>
                </div>
                <div className="design-filter">
                    <div className="heading">Design Templates</div>
                    <div className="filter-items">
                        <div className="filter-item">
                            <input type="checkbox" id="design1" name="design1" value="design1" />
                            <label for="cost1">2</label>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="design2" name="design2" value="design2" />
                            <label for="cost2">3</label>
                        </div>
                        <div className="filter-item">
                            <input type="checkbox" id="design3" name="design3" value="design3" />
                            <label for="cost3">3+</label>
                        </div>
                    </div>
                </div>
                <div className="type-filter">
                    <div className="heading">Type</div>
                    <div className="filter-items">
                        {types.map((type) => (
                            <div className="filter-item">
                                <input type="checkbox" id={type} name={type} value={type} onChange={handleTypeFilter} />
                                <label for={type}>{type}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="apply-btn">
                    <button onClick={handleFilter}>apply</button>
                </div>
            </div>

            {/* Product Card */}
            <div className="product-card">
                <div className="header">
                    <div className="heading">Shoes</div>
                    <div className="icon">
                        <div className="search"><BiSearch/></div>
                        <div className="sort">Sort by</div>
                    </div>
                </div>
                <div className="products">
                    { products.map((product) => (
                        <div className="product" onClick={() => handleProductClick(product.id)}>
                            <img src={JSON.parse(product.images)[0]} alt="product" />
                            <div className="product-details">
                                <div className="product-name">{product.name}</div>
                                <div className="product-desc">
                                    <div className="product-price">Rs. {product.price}</div>
                                    <div className="product-rating">
                                        <BsStarFill /> <BsStarFill /> <BsStarFill /> <BsStarHalf /> <BsStar />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

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