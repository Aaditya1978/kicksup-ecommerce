import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import axios from "axios";
import "./header.scss"
import logoImage from "../../assets/websitelogo.png";

export default function Header() {

  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
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

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setIsAuth(false);
    navigate("/");
  }

  return (
    <div className="header">
      <div className="logo">
        <img src={logoImage} alt="logo" />
      </div>

      <div className="nav">
        <NavLink to="/" className="nav-item" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/journey" className="nav-item" activeClassName="active">
          Journey
        </NavLink>
        <NavLink to="/team" className="nav-item" activeClassName="active">
          Team
        </NavLink>
        <NavLink to="/store" className="nav-item" activeClassName="active">
          Store
        </NavLink>
        <NavLink to="/contact" className="nav-item" activeClassName="active">
          Contact
        </NavLink>
      </div>

      { isAuth ? (
        <div className="tile">
          <div className="user" onClick={() => navigate("/profile")}>
            <BiUser /> {user.name}
          </div>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
        ) : (
        <div className="logins">
          <button onClick={handleClick}>Login</button>
        </div>
      )}

    </div>
  );
}