import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Contact from "./components/contact/Contact";
import Team from "./components/team/Team";
import Journey from "./components/journey/Journey";
import Store from "./components/store/Store";
import Profile from "./components/profile/Profile";
import Product from "./components/product/Product";
import AdminLogin from "./components/admin/AdminLogin";
import AdminHome from "./components/admin/AdminHome";
import AddProduct from "./components/admin/AddProduct";

function App() {
  return (
    <div>
       <BrowserRouter>
        <Routes>

          {/* user routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/team" element={<Team />} />
          <Route exact path="/journey" element={<Journey />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/store" element={<Store />} />
          <Route exact path="/store/:id" element={<Product />} />

          {/* admin routes */}
          <Route exact path="/admin_login" element={<AdminLogin />} />
          <Route exact path="/admin_home" element={<AdminHome />} />
          <Route exact path="/admin_add_product" element={<AddProduct />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
