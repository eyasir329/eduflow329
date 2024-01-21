import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import axios from "axios";

export default function SignUp() {
    const [key, setKey] = useState("student");
    const [userId, setUserId] = useState("");
    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [securityQuestion, setSecurityQuestion] = useState("");
    const [role, setRole] = useState("");

    function onValueChange(event) {
        setGender(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/register", { userId, fName, lName, email, phone, password, securityQuestion, role, gender })
            .then(res => {
                alert("Account Created Successfully");
                setUserId("");
                setfName("");
                setlName("");
                setGender("");
                setEmail("");
                setPhone("");
                setPassword("");
                setSecurityQuestion("");
                setRole("");
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <section className="vh-100 gradient-custom-signup">
            <div className="container register py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
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
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Student ID *"
                                                                    value={userId}
                                                                    onChange={ev => setUserId(ev.target.value)}
                                                                />
                                                                <label className="form-label" htmlFor="typePasswordX">*If you are our student and do not have a student id then contact school administration</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="First Name *"
                                                                    value={fName}
                                                                    onChange={ev => setfName(ev.target.value)}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Last Name *"
                                                                    value={lName}
                                                                    onChange={ev => setlName(ev.target.value)}
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
                                                            {/* <div className="form-group">
                                                                <input 
                                                                type="password" 
                                                                className="form-control" 
                                                                placeholder="Confirm Password *" 
                                                                value="" 

                                                                />
                                                            </div> */}
                                                            <div className="form-group">
                                                                <div className="maxl">
                                                                    <label className="radio inline">
                                                                        <input
                                                                            type="radio"
                                                                            name="gender"
                                                                            value="male"
                                                                            checked={gender === "male"}
                                                                            onChange={onValueChange}
                                                                            defaultChecked />
                                                                        <span> Male </span>
                                                                    </label>
                                                                    <label className="radio inline">
                                                                        <input
                                                                            type="radio"
                                                                            name="gender"
                                                                            value="female"
                                                                            checked={gender === "female"}
                                                                            onChange={onValueChange}
                                                                        />
                                                                        <span> Female </span>
                                                                    </label>
                                                                    <label className="radio inline">
                                                                        <input
                                                                            type="radio"
                                                                            name="gender"
                                                                            value="other"
                                                                            checked={gender === "other"}
                                                                            onChange={onValueChange}
                                                                        />
                                                                        <span> Other </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
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
                                                                    type="text"
                                                                    minLength="10"
                                                                    maxLength="15"
                                                                    name="txtEmpPhone"
                                                                    className="form-control"
                                                                    placeholder="Your Phone *"
                                                                    value={phone}
                                                                    onChange={ev => setPhone(ev.target.value)}
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <select className="form-control">
                                                                    <option className="hidden" selected disabled>Please select your Security Question</option>
                                                                    <option>What is your Birthdate?</option>
                                                                    <option>What is Your old Phone Number</option>
                                                                    <option>What is your Pet Name?</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Your Answer *"
                                                                    value={securityQuestion}
                                                                    onChange={ev => setSecurityQuestion(ev.target.value)}
                                                                />
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btnRegister btn btn-success"
                                                                onClick={(event) => {
                                                                    event.preventDefault();
                                                                    setRole("student");
                                                                    handleSubmit(event);
                                                                }}
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
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
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Enter Parent ID *" value="" />
                                                                <label className="form-label" htmlFor="typePasswordX">*If you have a children in our school and do not have a parent id then contact school administration</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="First Name *" value="" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Last Name *" value="" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" placeholder="Email *" value="" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="text" maxLength="10" minLength="10" className="form-control" placeholder="Phone *" value="" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="password" className="form-control" placeholder="Password *" value="" />
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="password" className="form-control" placeholder="Confirm Password *" value="" />
                                                            </div>
                                                            <div className="form-group">
                                                                <select className="form-control">
                                                                    <option className="hidden" selected disabled>Please select your Security Question</option>
                                                                    <option>What is your Birthdate?</option>
                                                                    <option>What is Your old Phone Number</option>
                                                                    <option>What is your Pet Name?</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Answer *" value="" />
                                                            </div>
                                                            <input type="submit" className="btnRegister" value="Register" />
                                                        </div>
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
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" placeholder="Enter Teacher ID *" value="" />
                                                                    <label className="form-label" htmlFor="typePasswordX">*If you do not have a teacher id then contact school administration</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" placeholder="First Name *" value="" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" placeholder="Last Name *" value="" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="email" className="form-control" placeholder="Email *" value="" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="text" maxLength="10" minLength="10" className="form-control" placeholder="Phone *" value="" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <input type="password" className="form-control" placeholder="Password *" value="" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="password" className="form-control" placeholder="Confirm Password *" value="" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <select className="form-control">
                                                                            <option className="hidden" selected disabled>Please select your Security Question</option>
                                                                            <option>What is your Birthdate?</option>
                                                                            <option>What is Your old Phone Number</option>
                                                                            <option>What is your Pet Name?</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" placeholder="Answer *" value="" />
                                                                    </div>
                                                                    <input type="submit" className="btnRegister" value="Register" />
                                                                </div>
                                                            </div>
                                                        </div>

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
