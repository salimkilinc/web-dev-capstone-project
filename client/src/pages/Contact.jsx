import React, { useState, useEffect } from "react";
import axios from "axios";
import Info from "../components/Info";

function Contact() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sentMessageVisible, setSentMessageVisible] = useState(false);

  const apiBaseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://salimkilinc.com";

  useEffect(() => {
    console.log("API Base URL:", apiBaseUrl);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting contact form...");
    try {
      const response = await axios.post(`${apiBaseUrl}/api/contact`, formData);
      console.log("Form submission status:", response.status);
      setFormData({
        fname: "",
        lname: "",
        email: "",
        subject: "",
        message: "",
      });
      setSentMessageVisible(true);
      setTimeout(() => {
        setSentMessageVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="contact-box">
      <form onSubmit={handleSubmit}>
        <div className="personal-info">
          <Info
            infoType="input"
            inputType="text"
            divClass="first-name"
            infoName="fname"
            labelText="First name:"
            value={formData.fname}
            onChange={handleChange}
          />
          <Info
            infoType="input"
            inputType="text"
            divClass="last-name"
            infoName="lname"
            labelText="Last name:"
            value={formData.lname}
            onChange={handleChange}
          />
          <Info
            infoType="input"
            inputType="email"
            divClass="email"
            infoName="email"
            labelText="Email:"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <Info
          infoType="input"
          inputType="text"
          divClass="subject"
          infoName="subject"
          labelText="Subject:"
          value={formData.subject}
          onChange={handleChange}
        />
        <Info
          infoType="textarea"
          divClass="message"
          infoName="message"
          labelText="Message:"
          value={formData.message}
          onChange={handleChange}
        />
        <div className="info send">
          <button className="blue-button" type="submit">
            SEND
          </button>
          {sentMessageVisible && <span className="sent-message">✓ Sent!</span>}
        </div>
      </form>
    </div>
  );
}

export default Contact;
