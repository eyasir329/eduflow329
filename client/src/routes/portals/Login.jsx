import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../components/OAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    const apiUrl = "http://localhost:5000/api/auth/signin";

    try {
      dispatch(signInStart());

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.startsWith("application/json")) {
          // If the response is JSON, try to parse it
          const errorData = await response.json();
          dispatch(signInFailure(errorData.message));
        } else {
          // If not JSON, handle the error based on the content
          const errorText = await response.text();
          const errorMessageRegex = /Error: (.+?)<br>/;
          const matches = errorText.match(errorMessageRegex);
          if (matches && matches.length > 1) {
            const errorMessage = matches[1];
            dispatch(signInFailure(errorMessage));
          } else {
            dispatch(signInFailure("An unexpected error occurred"));
          }
        }
        return;
      }

      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // console.log(data);
      navigate("/portal/admin");
    } catch (error) {
      dispatch(signInFailure("An unexpected error occurred"));
    }
  };


  // show/hide password
  const [passwordType, setPasswordType] = useState('password');
  const togglePassword = () => {
    setPasswordType((prevType) => (prevType === 'password' ? 'text' : 'password'));
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
                          className="form-control snemail"
                          placeholder="Your Email *"
                          value={email}
                          onChange={(ev) => setEmail(ev.target.value)}
                        />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typePasswordX">
                          Enter Password
                        </label>

                        <div className="passwordMain">
                          <div className="passwordContainer">
                            <input
                              name="password"
                              type={passwordType}
                              className="form-control passwordExtra"
                              placeholder="Password *"
                              value={password}
                              onChange={(ev) => setPassword(ev.target.value)}
                            />
                            <button className="btn btn-outline passwordShow" type="button" onClick={togglePassword}>
                              {passwordType === 'password' ? (
                                <FaEye className="bi" />
                              ) : (
                                <FaEyeSlash className="bi" />
                              )}
                            </button>
                          </div>
                        </div>

                      </div>

                      <p className="small mb-5 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </div>
                    <p className="reg-error">{errorMessage && errorMessage}</p>
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

                    <div className="oauthBody">
                      <OAuth />
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
