import React from "react";

function Info(props) {
  if (props.infoType === "input") {
    return (
      <div className={"info " + props.divClass}>
        <label htmlFor={props.infoName}>{props.labelText}</label>
        <input
          type={props.inputType}
          id={props.infoName}
          name={props.infoName}
          value={props.value}
          onChange={props.onChange}
          required
        />
      </div>
    );
  } else if (props.infoType === "textarea") {
    return (
      <div className={"info " + props.divClass}>
        <label htmlFor={props.infoName}>{props.labelText}</label>
        <textarea
          id={props.infoName}
          name={props.infoName}
          value={props.value}
          onChange={props.onChange}
          rows="4"
          cols="50"
          required
        ></textarea>
      </div>
    );
  }
}

export default Info;
