import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Root() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isAdminPage = location.pathname === "/admin";
  const isStudentPage = location.pathname === "/student";
  const isTeacherPage = location.pathname === "/teacher";
  const isParentPage = location.pathname === "/parent";

  return (
    <div>
      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <Header />}
      <div className="content">
        <Outlet />
      </div>
      {!(isLoginPage || isSignupPage || isAdminPage || isStudentPage || isParentPage || isTeacherPage) && <Footer />}
    </div>
  );
}
