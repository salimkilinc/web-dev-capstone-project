import React from "react";
import { NavLink } from "react-router-dom";
import Social from "../components/Social";
import salim from "../assets/images/salim.jpeg";

function AboutMe() {
  return (
    <div className="intro-box">
      <div className="intro-left">
        <div className="intro-left-top">
          <img
            className="profile-picture"
            src={salim}
            alt="Salim Kilinc Profile Picture"
          />
          <h1 className="name">Salim Kılınç</h1>
          <hr className="intro-hr"></hr>
          <span className="job">WEB DEVELOPER</span>
        </div>
        <div className="intro-left-bottom">
          <Social className="intro-social" />
        </div>
      </div>
      <div className="intro-right">
        <div className="intro-right-top">
          <p className="intro-hello">Hello</p>
          <p className="intro-short-exp">Here's who I am & what I do</p>
          <div className="intro-button-div">
            <NavLink to="/cv">
              <button className="blue-button">CV</button>
            </NavLink>
            <NavLink to="/projects">
              <button className="white-button">PROJECTS</button>
            </NavLink>
          </div>
          <p className="intro-long-exp">
            Welcome to my online portfolio. I am a junior web developer
            passionate about creating responsive web applications. With an
            interest in data science, I aim to combine development skills with
            data insights to build innovative solutions. Explore my projects and
            learn more about my journey.
          </p>
        </div>
        <div className="intro-right-bottom"></div>
      </div>
    </div>
  );
}

export default AboutMe;
