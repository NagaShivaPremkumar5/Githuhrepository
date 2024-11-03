import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Cart from "./Cart";
import PurchaseHistory from "./PurchaseHistory";

import ContactUs from "./ContactUs";
import AboutUs from "./AboutUs";

import "./App.css";
import { useSelector } from "react-redux";
import { FaCarrot, FaDrumstickBite, FaHistory, FaHome, FaInfoCircle, FaPhone, FaShoppingCart } from "react-icons/fa";
import Apps from "./Apps";
import StudentMarks from "./StudentMarks";
import GitHubLoginComponent from "./GithubLoginComponent";


// import { GoogleOAuthProvider } from "@react-oauth/google";
// import FacebookLoginComponent from "./FacebookLoginComponent";
// import ReactFacebookLogin from "react-facebook-login";


function App(){
  

    const cart = useSelector((state) => state.cart);

    const totalItems = cart.reduce((sum , item) => sum + item.quantity,0);

  return(

    <>
      
    <BrowserRouter>
    <nav>
    {/* <GitHubLoginComponent /> */}
    <Link to="/home"><FaHome /> Home</Link>
            <Link to="/veg"><FaCarrot /> Veg</Link>
            <Link to="/nonveg"><FaDrumstickBite /> NonVeg</Link>
            <Link to="/cart"><FaShoppingCart /> Cart ({totalItems})</Link>
            <Link to="/purchasehistory"><FaHistory /> Purchase History</Link>
            <Link to="/aboutus"><FaInfoCircle /> About Us</Link>
            <Link to="/contactus"><FaPhone /> Contact Us</Link>
            
        </nav>
         
      <Routes>
        <Route path = "/home" element={<Home/>}/>
        
        <Route path = "/veg" element = {<Veg/>} />
        <Route path = "/nonveg" element = {<NonVeg />}/>
        < Route path = "/cart" element = {<Cart />}/>
        < Route path = "/purchasehistory" element = {<PurchaseHistory />}/>
        < Route path = "/aboutus" element = {<AboutUs />}/>
                < Route path = "/contactus" element = {<ContactUs />} />
               

      </Routes>
    </BrowserRouter>
    {/* <Apps />
    <StudentMarks /> */}
    
    </>
  )
}
export default App;