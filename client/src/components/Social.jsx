import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

function Social() {
  return (
    <div className="social">
      <form action="https://www.linkedin.com/in/salimkilinc/" target="_blank">
        <button className="external-link">
          <FaLinkedinIn className="social-icon" />
        </button>
      </form>
      <form action="https://github.com/salimkilinc" target="_blank">
        <button className="external-link">
          <FaGithub className="social-icon" />
        </button>
      </form>
      <form action="https://medium.com/@salimkilinc" target="_blank">
        <button className="external-link">
          <FaMedium className="social-icon" />
        </button>
      </form>
      <form action="https://x.com/salimkilinc" target="_blank">
        <button className="external-link">
          <FaXTwitter className="social-icon" />
        </button>
      </form>
    </div>
  );
}

export default Social;
