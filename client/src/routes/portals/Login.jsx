import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:5000/api/login";
    try {
      setLoading(true);
      setError(false);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success === false) {
        setError(true);
        return;
      }

      if (data.role === "admin") {
        navigate("/portal/admin");
      } else if (data.role === "teacher") {
        navigate("/portal/teacher");
      } else if (data.validUser.role === "student") {
        navigate("/portal/student");
      } else if (data.role === "parent") {
        navigate("/portal/parent");
      } else {
        setLoading(false);
        setError(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card text-white"
              style={{ borderRadius: "1rem", backgroundColor: "#4F6F52" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <div className="login-img gradient-box">
                    <img src="../../images/logo.png" alt="logo" />
                  </div>

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your email and password!
                  </p>
                  <form>
                    <div className="form-align">
                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typeEmailX">
                          Enter Your Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email *"
                          value={email}
                          onChange={(ev) => setEmail(ev.target.value)}
                        />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typePasswordX">
                          Enter Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password *"
                          value={password}
                          onChange={(ev) => setPassword(ev.target.value)}
                        />
                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </div>
                    <p className="reg-error">
                      {error && "Something Went Wrong"}
                    </p>
                    <button
                      type="submit"
                      className="btn btn-outline-light btn-lg px-5"
                      onClick={(event) => {
                        event.preventDefault();
                        handleSubmit(event);
                      }}
                    >
                      {loading ? "Loading..." : "Sign In"}
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white login-outh">
                        <FontAwesomeIcon icon={faGoogle} />
                      </a>
                      <a href="#!" className="text-white login-outh">
                        <FontAwesomeIcon icon={faFacebook} />
                      </a>
                    </div>
                  </form>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/portal/signup" className="text-white-50 fw-bold">
                      {" "}
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
