import React from "react";

function Skills(props) {
  return (
    <>
      <div className="cv-grp-content-item">
        <p>
          <strong>{props.firstSkillsetName}</strong>
        </p>
        <p>{props.firstSkillset}</p>
      </div>
      <div className="cv-grp-content-item">
        <p>
          <strong>{props.secondSkillsetName}</strong>
        </p>
        <p>{props.secondSkillset}</p>
      </div>
    </>
  );
}

export default Skills;
