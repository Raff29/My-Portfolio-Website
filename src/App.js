import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/NavBar";
import Header from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import DiceGame from "./components/PigDice"; // make sure the path is correct
import { Analytics } from "@vercel/analytics/react";

const DefaultRoute = ({ color }) => (
  <>
    <Header color={color} />
    <About color={color} />
    <Experience color={color} />
    <Projects color={color} />
    <Contact color={color} />
    <Footer />
  </>
);

function App() {
  const color = "teal";

  return (
    <Router>
      <Nav color={color} />
      <Routes>
        <Route path="/" element={<DefaultRoute color={color} />} />
        <Route path="/PigDice" element={<DiceGame />} />
      </Routes>
      <Analytics/>
    </Router>
  );
}

export default App;
