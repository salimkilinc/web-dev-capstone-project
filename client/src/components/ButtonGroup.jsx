import React from "react";

function ButtonGroup({ labels, activeButton, handleClick }) {
  return (
    <div className="button-group">
      {labels.map((label, index) => (
        <button
          key={index}
          className={`grp-button ${
            activeButton === index + 1 ? "grp-btn-active" : ""
          }`}
          onClick={() => handleClick(index + 1)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;
