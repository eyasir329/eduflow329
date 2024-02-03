import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import HeaderMain from "../components/header/HeaderMain";

export default function Root() {
  const currentLocation = useLocation();
  const isLoginPage = currentLocation.pathname === "/portal/login";
  const isSignupPage = currentLocation.pathname === "/portal/signup";
  const isAdminPage = currentLocation.pathname === "/portal/admin";
  const isStudentPage = currentLocation.pathname === "/portal/student";
  const isTeacherPage = currentLocation.pathname === "/portal/teacher";
  const isParentPage = currentLocation.pathname === "/portal/parent";

  return (
    <div className="main-content">
      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <Header />}
      {(isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <HeaderMain />}

      <div className="content">
        <Outlet />
      </div>
      
      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <Footer />}
    </div>
  );
}
