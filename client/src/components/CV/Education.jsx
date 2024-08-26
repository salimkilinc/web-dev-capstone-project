import React from "react";

function Education(props) {
  return (
    <>
      <div className="cv-grp-content-item">
        <p>
          <strong>{props.name}</strong>, {props.date}
        </p>
        <p>
          <strong>{props.org}</strong>, {props.city}
        </p>
        <li>{props.exp}</li>
      </div>
    </>
  );
}

export default Education;
