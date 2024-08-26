import React, { useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import About from "../components/CV/About";
import Certificate from "../components/CV/Certificate";
import Skills from "../components/CV/Skills";
import Reference from "../components/CV/Reference";
import Education from "../components/CV/Education";
import Experience from "../components/CV/Experience";
import {
  aboutText,
  certificates,
  skills,
  references,
  education,
  experience,
} from "../data/cvData";

function CV() {
  const [activeButton, setActiveButton] = useState(1);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const labels = [
    "About",
    "Certificates",
    "Skills",
    "References",
    "Education",
    "Experience",
  ];

  return (
    <div className="cv-box">
      <ButtonGroup
        labels={labels}
        activeButton={activeButton}
        handleClick={handleClick}
      />
      <div className="cv-grp-content">
        {activeButton === 1 && <About text={aboutText} />}
        {activeButton === 2 &&
          certificates.map((cert, index) => (
            <Certificate key={index} {...cert} />
          ))}
        {activeButton === 3 && (
          <Skills
            firstSkillsetName={skills.firstSkillsetName}
            firstSkillset={skills.firstSkillset}
            secondSkillsetName={skills.secondSkillsetName}
            secondSkillset={skills.secondSkillset}
          />
        )}
        {activeButton === 4 &&
          references.map((ref, index) => <Reference key={index} {...ref} />)}
        {activeButton === 5 &&
          education.map((edu, index) => <Education key={index} {...edu} />)}
        {activeButton === 6 &&
          experience.map((exp, index) => <Experience key={index} {...exp} />)}
      </div>
    </div>
  );
}

export default CV;
