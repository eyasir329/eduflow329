import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home"
import Header from "./Header";
import NavbarExtra from "./NavbarExtra";
import Footer from "./Footer";

export default function App() {
  return (
    <Router>
      <Header />

      <Footer />
    </Router>
  );
}