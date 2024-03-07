import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import HeaderMain from "../components/header/HeaderMain";
import { Link } from "react-router-dom";

const getCurrentYear = new Date().getFullYear();

export default function Root() {
  const currentLocation = useLocation();
  const isLoginPage = currentLocation.pathname === "/portal/login";
  const isSignupPage = currentLocation.pathname === "/portal/signup";
  const isAdminPage = currentLocation.pathname === "/portal/admin";
  const isStudentPage = currentLocation.pathname === "/portal/student";
  const isParentPage = currentLocation.pathname === "/portal/parent";
  const isTeacherPage = currentLocation.pathname === "/portal/teacher";
  const isGuestPage = currentLocation.pathname === "/portal/guest";

  return (
    <div className="main-content">
      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage || isGuestPage) && <Header />}

      {(isAdminPage || isStudentPage || isParentPage || isTeacherPage || isGuestPage) && <HeaderMain />}

      <div className="content">
        <Outlet />
      </div>

      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <Footer />}

      {!(isLoginPage || isSignupPage) && (
        <div className="row footer-main">
          <div className="col-lg-12">
            <span className="copyright">ⓒ </span>Copyright 2023-{getCurrentYear}
            <Link to="https://eyasir329.com" target="_blank" rel="noopener noreferrer" className="eyasir329">
              &nbsp; eyasir329
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
