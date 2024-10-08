// logIn.jsx
import React, { useState, useEffect } from "react";
import "./logreg.css";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";

function LogIn() {
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const email = document.getElementById("em").value;
      const password = document.getElementById("pw").value;

      const url = "https://resultsystemdb.000webhostapp.com/login.php";
      const data = {
        Email: email,
        Password: password,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData["role"] !== "Error") {
          dispatch(
            login({
              email: responseData["email"],
              uid: responseData["userID"],
              role: responseData["role"],
              name: responseData["Name"],
            })
          );
          localStorage.setItem(
            "user",
            JSON.stringify({
              email: responseData["email"],
              uid: responseData["userID"],
              role: responseData["role"],
              name: responseData["Name"],
            })
          );
          alert("Login");
        } else {
          alert("Email or password is incorrect");
        }
      } else {
        console.error("Error during login:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  useEffect(() => {
    // Check if user is logged in on page load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(login(user));
    }
  }, [dispatch]);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form-box login">
          <h2>Login</h2>
          <div>
            <div className="input-box">
              <input type="email" id="em" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input type="password" id="pw" required />
              <label>Password</label>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
