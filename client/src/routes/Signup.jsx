import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";

export default function SignUp() {
    const [key, setKey] = useState("student");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let role ="";
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/register", { userId, userName, email, password, role })
            .then(res => {
                alert("Account Created Successfully");
                setUserId("");
                setUserName("");
                setEmail("");
                setPassword("");
                navigate("/login");
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <section className="vh-100 gradient-custom-signup">
            <div className="container register py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-3 register-left">
                        {/* <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" /> */}
                        <h3>Welcome</h3>
                        <p>To our portal</p>
                        <Link to="/login">
                            <button type="button" className="btn btn-success">
                                Login
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-9 register-right">
                        <div className="row">
                            <div className="col-md-12">
                                <Tabs
                                    id="controlled-tabs"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                >
                                    <Tab eventKey="student" title="Student">
                                        <div className="tab-pane fade show active" id="student" role="tabpanel" aria-labelledby="student-tab">
                                            <h3 className="register-heading">Signup as a Student</h3>

                                            <div className="row register-form">
                                                <div className="col-md-12">

                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Student ID *"
                                                            value={userId}
                                                            onChange={ev => setUserId(ev.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="typePasswordX">*If you are our student and do not have a student id then contact school administration</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="User Name *"
                                                            value={userName}
                                                            onChange={ev => setUserName(ev.target.value)}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Your Email *"
                                                            value={email}
                                                            onChange={ev => setEmail(ev.target.value)}
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
                                                            type="button"
                                                            className="btnRegister btn btn-success"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                role ="student";
                                                                handleSubmit(event);
                                                            }}
                                                        >
                                                            Create Account
                                                        </button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </Tab>

                                    <Tab eventKey="parent" title="Parent">
                                        <div className="tab-pane fade show" id="parent" role="tabpanel" aria-labelledby="parent-tab">
                                            <h3 className="register-heading">Signup as a Parent</h3>
                                            <div className="row register-form">
                                                <div className="col-md-12">

                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Parent ID *"
                                                            value={userId}
                                                            onChange={ev => setUserId(ev.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="typePasswordX">*If you are our student and do not have a student id then contact school administration</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="User Name *"
                                                            value={userName}
                                                            onChange={ev => setUserName(ev.target.value)}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Your Email *"
                                                            value={email}
                                                            onChange={ev => setEmail(ev.target.value)}
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
                                                        <input type="submit" className="btnRegister" value="Register" onClick={(event) => {
                                                            event.preventDefault();
                                                            role ="parent";
                                                            handleSubmit(event);
                                                        }} />
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="teacher" title="Teacher">
                                        <div className="tab-pane fade show" id="teacher" role="tabpanel" aria-labelledby="teacher-tab">
                                            <h3 className="register-heading">Signup as a Teacher</h3>
                                            <div className="row register-form">

                                                <div className="col-md-12">

                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Teacher ID *"
                                                            value={userId}
                                                            onChange={ev => setUserId(ev.target.value)}
                                                        />
                                                        <label className="form-label" htmlFor="typePasswordX">*If you are our student and do not have a student id then contact school administration</label>
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="User Name *"
                                                            value={userName}
                                                            onChange={ev => setUserName(ev.target.value)}
                                                        />
                                                    </div>

                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Your Email *"
                                                            value={email}
                                                            onChange={ev => setEmail(ev.target.value)}
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
                                                        <input type="submit" className="btnRegister" value="Register" onClick={(event) => {
                                                            event.preventDefault();
                                                            role ="teacher";
                                                            handleSubmit(event);
                                                        }} />
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
