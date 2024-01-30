import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import HeaderMain from "../components/header/HeaderMain";

export default function Root() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/portal/login";
  const isSignupPage = location.pathname === "/portal/signup";
  const isAdminPage = location.pathname === "/portal/admin";
  const isStudentPage = location.pathname === "/portal/student";
  const isTeacherPage = location.pathname === "/portal/teacher";
  const isParentPage = location.pathname === "/portal/parent";

  return (
    <div>
      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <Header />}
      {(isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <HeaderMain />}
      <div className="content">
        <Outlet />
      </div>
      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <Footer />}
    </div>
  );
}
