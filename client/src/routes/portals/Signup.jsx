import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialUserId = searchParams.get('userId');
    const initialEmail = searchParams.get('email');
    const initialKey = searchParams.get('key');

    // Initialize state variables with the retrieved values
    const [userId, setUserId] = useState(initialUserId);
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState(''); // Password can be initialized to empty string or any other default value
    const [key, setKey] = useState(initialKey);

    // If you want to update state variables when the query parameters change, you can use useEffect
    useEffect(() => {
        setUserId(initialUserId);
        setEmail(initialEmail);
        setKey(initialKey);
    }, [initialUserId, initialEmail, initialKey]);

    // console.log(userId, email, key)

    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // console.log(userId, email, password, key);

            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, email, password, key }),
            });

            const data = await response.json();

            if(!data.ok){
                toast(data.error);
            }
            console.log(data)
            toast(data.message)

            window.location.href = "/portal/login";
            // Clear form fields
            setUserId("");
            setEmail("");
            setPassword("");
            setKey("");
            setLoading(false);
            // Handle any success UI feedback if needed
        } catch (error) {
            setLoading(false);
            toast.error(error.message); // Assuming you're using react-toastify for error messages
        }
    }


    return (
        <section className="vh-100 gradient-custom-signup">
            <div className="container register py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-3 register-left">
                        <h3>Welcome</h3>
                        <p>To our portal</p>
                        <Link to="/portal/login">
                            <button type="button" className="btn btn-success">
                                Login
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="tab-pane fade show active" id="student" role="tabpanel" aria-labelledby="student-tab">
                                    <h3 className="register-heading">Signup Information</h3>

                                    <div className="row register-form">
                                        <div className="col-md-12">

                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Student ID *"
                                                    value={userId}
                                                    onChange={ev => setUserId(ev.target.value)}
                                                    disabled
                                                />

                                            </div>

                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email *"
                                                    value={email}
                                                    onChange={ev => setEmail(ev.target.value)}
                                                    disabled
                                                />
                                            </div>

                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password *"
                                                    value={password}
                                                    onChange={ev => setPassword(ev.target.value)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <button
                                                    disabled={loading}
                                                    type="button"
                                                    className="btnRegister btn btn-success"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        handleSubmit(event);
                                                    }}
                                                >
                                                    {loading ? "Loading..." : "Sign up"}
                                                </button>
                                            </div>
                                            {/* <p className="reg-error">
                                                {
                                                    error && "Something Went Wrong"
                                                }
                                            </p> */}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}
