import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutMe from "./pages/AboutMe";
import CV from "./pages/CV";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import "./styles/main.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<AboutMe />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
