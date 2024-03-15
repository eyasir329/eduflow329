import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import HeaderMain from "../components/header/HeaderMain";

const getCurrentYear = new Date().getFullYear();

export default function Root() {

  const currentLocation = useLocation();
  const isLoginPage = currentLocation.pathname === "/portal/login";
  const isSignupPage = currentLocation.pathname === "/portal/signup";
  const isAdminPage = currentLocation.pathname === "/portal/admin";
  const isRegPage = currentLocation.pathname === "/portal/register";
  const isPubPage = currentLocation.pathname === "/portal/publisher";
  const isAccPage = currentLocation.pathname === "/portal/accountant";
  const isLibPage = currentLocation.pathname === "/portal/librarian";
  const isStudentPage = currentLocation.pathname === "/portal/student";
  const isParentPage = currentLocation.pathname === "/portal/parent";
  const isTeacherPage = currentLocation.pathname === "/portal/teacher";
  const isGuestPage = currentLocation.pathname === "/portal/guest";
  const isFormPage = currentLocation.pathname.startsWith("/formdata/");

  return (
    <div className="main-content">
      {!(isLoginPage || isSignupPage || isAdminPage ||isStudentPage || isParentPage || isTeacherPage || isGuestPage || isFormPage || isAccPage ||isRegPage || isPubPage || isLibPage) && <Header />}

      {(isAdminPage || isStudentPage || isParentPage || isTeacherPage|| isGuestPage || isAccPage ||isRegPage || isPubPage || isLibPage) && <HeaderMain />}

      <div className="content">
        <Outlet />
      </div>

      {!(isLoginPage || isSignupPage || isAdminPage ||isStudentPage || isParentPage || isTeacherPage || isFormPage || isAccPage ||isRegPage || isPubPage || isLibPage) && <Footer />}

      {!(isLoginPage || isSignupPage) && (
        <div className="row footer-main">
          <div className="col-lg-12">
            <span className="copyright">ⓒ </span>Copyright 2023-{getCurrentYear}
            <a href="https://eyasir329.com" target="_blank" rel="noopener noreferrer" className="eyasir329">
              &nbsp; eyasir329
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
