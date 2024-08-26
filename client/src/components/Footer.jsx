import React from "react";
import Social from "./Social";
import SquareIcon from "@mui/icons-material/Square";
import salimicon from "../assets/icons/salimkilinc-icon.svg";

function Footer() {
  return (
    <footer>
      <div className="copyright">
        <p>
          <SquareIcon className="box" style={{ height: "0px" }} /> ©{" "}
          {new Date().getFullYear()} Salim Kılınç
        </p>
        <img
          className="salim-icon"
          src={salimicon}
          alt="Salim Kilinc Website Icon"
        />
      </div>
      <div className="footer-contact">
        <div className="call">
          <p>Call</p>
          <a class="external-link" href="tel:+90-553-7565562">
            +90 553 756 55 62
          </a>
        </div>
        <div className="write">
          <p>Write</p>
          <a class="external-link" href="mailto:salimkilinc@yahoo.com">
            salimkilinc@yahoo.com
          </a>
        </div>
        <div className="follow">
          <p>Follow</p>
          <Social />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
