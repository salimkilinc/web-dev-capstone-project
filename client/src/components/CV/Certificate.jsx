import React from "react";

function Certificate(props) {
  return (
    <>
      <div className="cv-grp-content-item">
        <p>{props.name}</p>
        <p>
          {props.date}, {props.org}
        </p>
        <a className="external-link" href={props.cred} target="_blank">
          SHOW CREDENTIAL
        </a>
      </div>
    </>
  );
}

export default Certificate;
