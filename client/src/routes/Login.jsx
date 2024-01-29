import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card text-white" style={{ borderRadius: '1rem', backgroundColor: "#4F6F52", }}>
              <div className="card-body p-5 text-center">

                <div className="mb-md-5 mt-md-4 pb-5">

                  <div className="login-img gradient-box">
                    <img src="images/logo.png" alt="logo" />
                  </div>

                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your email and password!</p>
                  <form>
                    <div className="form-align">
                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typeEmailX">Enter Your Email</label>
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                        />

                      </div>

                      <div className="form-outline form-white mb-4">
                        <label className="form-label" htmlFor="typePasswordX">Enter Password</label>
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                        />

                      </div>

                      <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                    </div>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">

                      <a href="#!" className="text-white login-outh"><FontAwesomeIcon icon={faGoogle} /></a>
                      <a href="#!" className="text-white login-outh"><FontAwesomeIcon icon={faFacebook} /></a>

                    </div>
                  </form>
                </div>

                <div>
                  <p className="mb-0">Don't have an account? <Link to="/signup" className="text-white-50 fw-bold"> Sign Up</Link></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
}








