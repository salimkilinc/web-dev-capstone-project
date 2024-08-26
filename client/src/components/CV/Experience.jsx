import React from "react";

function Experience(props) {
  return (
    <>
      <div className="cv-grp-content-item">
        <p>
          <strong>{props.name}</strong>, {props.date}
        </p>
        <p>
          <strong>{props.org}</strong>, {props.city}
        </p>
      </div>
    </>
  );
}

export default Experience;
