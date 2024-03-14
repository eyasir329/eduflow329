import React from "react";
import PortalLink from "../../components/PortalLink";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import Parent from "./parent/Parent";
import Student from "./student/Student";
import Teacher from "./teacher/Teacher";
import GuestUser from "./guest/GuestUser";
import Admin from "./admin/Admin";
import SignUp from "./Signup";
import Accountant from "./staff/accountant/Accountant";
import Register from "./staff/register/Register"
import Publisher from "./staff/publisher/Publisher"

const Portal = () => {
    const role = useSelector((state) => state.user.currentUser?.type);
    const position = useSelector((state) => state.user.currentUser?.position);

    return (
        <Routes>
            <Route path="/" element={<PortalLink />} />
            <Route path="/admin" element={
                position === "admin" ? <Admin /> : <Navigate to="/portal/login" />
            }
            />
            <Route path="/accountant" element={
                position === "accountant" ? <Accountant /> : <Navigate to="/portal/login" />
            }
            />
            <Route path="/register" element={
                position === "register" ? <Register /> : <Navigate to="/portal/login" />
            }
            />
            <Route path="/publisher" element={
                position === "publisher" ? <Publisher /> : <Navigate to="/portal/login" />
            }
            />

            <Route
                path="/teacher"
                element={
                    role === "teacher" ? <Teacher /> : <Navigate to="/portal/login" />
                }
            />
            <Route
                path="/student"
                element={
                    role === "student" ? <Student /> : <Navigate to="/portal/login" />
                }
            />
            <Route
                path="/parent"
                element={
                    role === "parent" ? <Parent /> : <Navigate to="/portal/login" />
                }
            />
            <Route
                path="/guest"
                element={
                    role === "notAllocated" ? <GuestUser /> : <Navigate to="/portal/login" />
                }
            />
            <Route
                path="/signup"
                element={
                    <SignUp />
                }
            />

            <Route
                path="/login"
                element={
                    (() => {
                        switch (true) {
                            case role === "staff" && position === "admin":
                                return <Navigate to="/portal/admin" />;
                            case role === "staff" && position === "publisher":
                                return <Navigate to="/portal/publisher" />;
                            case role === "staff" && position === "register":
                                return <Navigate to="/portal/register" />;
                            case role === "teacher":
                                return <Navigate to="/portal/teacher" />;
                            case role === "staff" && position === "accountant":
                                return <Navigate to="/portal/accountant" />;
                            case role === "student":
                                return <Navigate to="/portal/student" />;
                            case role === "parent":
                                return <Navigate to="/portal/parent" />;
                            case role === "notAllocated":
                                return <Navigate to="/portal/guest" />;
                            default:
                                return <Signin />;
                        }
                    })()
                }
            />

            {/* <Route path="*" element={<Navigate to="/portal/login" />} /> */}
        </Routes>
    );
};

export default Portal;
