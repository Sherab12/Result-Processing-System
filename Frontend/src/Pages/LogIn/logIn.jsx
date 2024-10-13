import React, { useState, useEffect } from "react";
import "./logreg.css";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";

function LogIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const url =
        "http://localhost:8080/Result-processing-system/Backend/api/login.php";

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

        if (responseData["role"] && responseData["role"] !== "Error") {
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

          alert("Login successful!");
          setError(null); // Reset error state if login is successful
        } else {
          alert("Email or password is incorrect");
        }
      } else {
        const errMessage = await response.text();
        setError(`Error during login: ${errMessage}`);
        console.error(`Error during login: ${response.statusText}`);
      }
    } catch (error) {
      setError(`Error during login: ${error.message}`);
      console.error("Error during login:", error.message);
    }
  };

  useEffect(() => {
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <div className="input-box">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
