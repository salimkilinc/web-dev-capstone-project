import React, { useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import Carousel from "../components/Carousel";

function Projects() {
  const [activeButton, setActiveButton] = useState(1);

  const handleClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const labels = ["Web", "Data"];

  return (
    <div className="project-box">
      <ButtonGroup
        labels={labels}
        activeButton={activeButton}
        handleClick={handleClick}
      />
      <div className="project-grp-content">
        {activeButton === 1 && <Carousel section="web" />}
        {activeButton === 2 && <Carousel section="data" />}
      </div>
    </div>
  );
}

export default Projects;
