import React from "react";
import PortalLink from "../../components/PortalLink";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import Signup from "./Signup";
import Admin from "./Admin";
import Parent from "./Parent";
import Student from "./Student";
import Teacher from "./Teacher";
import GuestUser from "./GuestUser";

const Portal = () => {
    const role = useSelector((state) => state.user.currentUser?.role);
    console.log(role);

    return (
        <Routes>
            <Route path="/" element={<PortalLink />} />
            <Route
                path="/admin"
                element={role === "admin" ? <Admin /> : <Navigate to="/portal/login" />}
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
                path="/login"
                element={
                    role === "admin" ? <Navigate to="/portal/admin" /> :
                        role === "teacher" ? <Navigate to="/portal/teacher" /> :
                            role === "student" ? <Navigate to="/portal/student" /> :
                                role === "parent" ? <Navigate to="/portal/parent" /> :
                                    role === "notAllocated" ? <Navigate to="/portal/guest" /> :
                                        role === undefined && <Signin />
                }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/portal/login" />} />
        </Routes>
    );
};



export default Portal;
