import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function Admin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState({
    to: "",
    subject: "",
    text: "",
    uuid: "",
  });
  const [replyStatus, setReplyStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [replyVisible, setReplyVisible] = useState(null);
  const [replyPlaceholder, setReplyPlaceholder] = useState("");
  const navigate = useNavigate();

  const apiBaseUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://salimkilinc.com";

  useEffect(() => {
    console.log("API Base URL:", apiBaseUrl);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleReplyChange = (e) => {
    const { name, value } = e.target;
    setReply({
      ...reply,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login...");
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/authenticate`,
        credentials
      );
      console.log("Login response:", response.status);
      if (response.data.authenticated) {
        setIsAuthenticated(true);
        fetchMessages();
      } else {
        console.log("Authentication failed, redirecting to home.");
        navigate("/");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      navigate("/");
    }
  };

  const fetchMessages = async () => {
    console.log("Fetching messages...");
    try {
      const response = await axios.get(`${apiBaseUrl}/api/contact/messages`);
      console.log("Messages fetched:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    const uuid = e.target.getAttribute("data-uuid");
    const preparedReply = { ...reply, uuid };
    console.log("Submitting reply...", preparedReply);
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/email/send`,
        preparedReply
      );
      console.log("Email response status:", response.status);
      if (response.status === 200) {
        setReplyStatus("✓ Email sent successfully");
        setReply({ to: "", subject: "", text: "", uuid: "" });
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.uuid === uuid
              ? { ...message, read: true, replied: true }
              : message
          )
        );
        setLoading(false);
        setTimeout(() => {
          setReplyStatus(null);
          setReplyVisible(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setReplyStatus("✗ Error sending email");
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (uuid) => {
    console.log("Marking message as read with UUID:", uuid);
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/contact/markAsRead`,
        { uuid }
      );
      console.log("Mark as read response:", response.status);
      if (response.status === 200) {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.uuid === uuid ? { ...message, read: true } : message
          )
        );
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleDeleteMessage = async (uuid) => {
    console.log("Deleting message with UUID:", uuid);
    try {
      const response = await axios.delete(`${apiBaseUrl}/api/contact/delete`, {
        data: { uuid },
      });
      console.log("Delete response:", response.status);
      if (response.status === 200) {
        fetchMessages();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleReplyClick = (uuid, email, subject) => {
    console.log("Replying to message:", { email, uuid, subject });
    setReplyVisible(uuid);
    setReply({ to: email, subject: "", text: "", uuid });
    setReplyPlaceholder(`Re: ${subject}`);
  };

  const handleReplyLater = () => {
    console.log("Reply later clicked");
    setReplyVisible(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  return (
    <div className="admin-box">
      {isAuthenticated ? (
        <h1 className="admin-title">Contact Messages</h1>
      ) : (
        <h1 className="admin-title">Control Panel</h1>
      )}

      {isAuthenticated ? (
        messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map((message) => (
            <div key={message.uuid} className="message-row">
              <p>
                <strong>From:</strong> {message.first_name} {message.last_name}
              </p>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p>
                <strong>Subject:</strong> {message.subject}
              </p>
              <p>
                <strong>Message:</strong> {message.message}
              </p>
              <p>
                <strong>Received at:</strong>{" "}
                {new Date(message.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Replied:</strong> {message.replied ? "Yes" : "No"}
              </p>
              {replyVisible !== message.uuid && (
                <>
                  <button
                    onClick={() =>
                      handleReplyClick(
                        message.uuid,
                        message.email,
                        message.subject
                      )
                    }
                    className="blue-button reply-btn"
                  >
                    Reply
                  </button>
                  {!message.read && (
                    <button
                      onClick={() => handleMarkAsRead(message.uuid)}
                      className="blue-button mark-read-btn"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteMessage(message.uuid)}
                    className="blue-button delete-btn"
                  >
                    Delete
                  </button>
                </>
              )}
              <div
                className={`reply-form ${
                  replyVisible === message.uuid ? "visible" : ""
                }`}
              >
                {replyVisible === message.uuid && (
                  <form onSubmit={handleReplySubmit} data-uuid={message.uuid}>
                    <input
                      type="text"
                      name="subject"
                      placeholder={replyPlaceholder}
                      value={reply.subject}
                      onChange={handleReplyChange}
                      required
                    />
                    <textarea
                      name="text"
                      placeholder="Your reply"
                      value={reply.text}
                      onChange={handleReplyChange}
                      required
                    ></textarea>
                    <div className="send">
                      <button type="submit" className="blue-button send-btn">
                        Send
                      </button>
                      {!message.read && (
                        <button
                          onClick={() => handleMarkAsRead(message.uuid)}
                          type="button"
                          className="blue-button mark-read-btn"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={handleReplyLater}
                        type="button"
                        className="blue-button reply-later-btn"
                      >
                        Reply Later
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.uuid)}
                        type="button"
                        className="blue-button delete-btn"
                      >
                        Delete
                      </button>
                      {loading && (
                        <ClipLoader
                          size={16}
                          color={"#123abc"}
                          loading={loading}
                        />
                      )}
                      {replyStatus && (
                        <span className="reply-status">{replyStatus}</span>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))
        )
      ) : (
        <form onSubmit={handleSubmit} className="admin-login-box">
          <div className="loginInput">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginInput">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="blue-button">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default Admin;
