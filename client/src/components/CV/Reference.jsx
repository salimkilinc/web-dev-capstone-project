import React from "react";

function Reference(props) {
  return (
    <>
      <div className="cv-grp-content-item">
        <p>
          {props.name}, <strong>{props.job}</strong>
        </p>
        <p>
          {props.type}, <strong>{props.org}</strong>
        </p>
        <div style={{ display: "flex", gap: "1vw" }}>
          <a className="external-link" href={props.linkedin} target="_blank">
            LinkedIn
          </a>
          <a className="external-link" href={props.email} target="_blank">
            E-Mail
          </a>
        </div>
      </div>
    </>
  );
}

export default Reference;
