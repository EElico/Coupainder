import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './assets/logo1.jpg'

import AddCoupons from "./components/AddCoupons";
import Coupon from "./components/Coupon";
import CouponsList from "./components/CouponsList";
import PassLogin from "./components/PassLogin";
import PassRegister from "./components/PassRegister";
import Home from "./components/Home";
import Agreement from "./components/Agreement";

import { Button } from "bootstrap";


function App() {
  const userEmail = localStorage.getItem("userEmail");

  let navigate = useNavigate();
  return (
    <div >

      <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <Link to="/" className="navbar-brand">
          CoupAinder
        </Link>
        <Link to="/Agreement"></Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
          {localStorage.getItem("userID") && <Link to={"/coupons"} className="nav-link">
          Coupons List
          </Link>}
          </li>
          <li className="nav-item">
              {/* if user id is not in localstorage = Coupones tab is hiden */}
          {localStorage.getItem("userID") && <Link to={"/add"} className="nav-link">
          Add Coupon
          </Link>}
          </li>
        </div>
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                      {userEmail && (
                      <span className="nav-link">User: {userEmail.replace(/@.*$/g, '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</span>

                      )}
                      </li>
                   </div>

        <div>
          <button onClick={() => {
            if (localStorage.getItem("userID")) {
              localStorage.clear();
              navigate("/PassLogin")
              window.location.reload();
            } else navigate("/PassLogin")
          }} type="button" class="btn btn-link">
            {localStorage.getItem("userID") ? "Logout" : "LogIn"}
          </button>
        </div>
        <div>
          {/* if user id is not in localstorage = register tab is hiden */}
          {!localStorage.getItem("userID") && <Link to={"/PassRegister"} className="nav-link">
            Register
          </Link>}
        </div>
        <img alt="icon" src={logo} style={{ maxWidth: "6%" }} />

      </nav>

      <div className="container mt-3">
      <div className="bg-image"></div>
      <br></br><br></br><br></br>
        <Routes>
                  {localStorage.getItem("userID") &&
              <Route path="/coupons" element={<CouponsList />} />
          }        {localStorage.getItem("userID") &&
              <Route path="/add" element={<AddCoupons />} />
          }        {localStorage.getItem("userID") &&
              <Route path="/coupons/:id" element={<Coupon />} />
          }  <Route path="/PassLogin" element={<PassLogin />} />
             <Route path="/PassRegister" element={<PassRegister />} />
             <Route path="/" element={<Home />} /> 
             <Route path="/Agreement" element={<Agreement />} /> 
             
        </Routes>
        <br></br><br></br><br></br>
      </div>
      <footer id="copyright">
            &copy; 2023 <a href="https://Coupainder.com/">Coupainder Inc App</a>. All rights reserved.

          </footer>
    </div>


  );
  
}

export default App;
