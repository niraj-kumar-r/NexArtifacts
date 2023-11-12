import React, { useState, useEffect } from "react";
import "./Contact.css";
import email1 from "../img/email.png";
import location1 from "../img/location.png";
import phone1 from "../img/phone.png";

function Contact() {
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const inputs = document.querySelectorAll(".input");

    function focusFunc() {
      let parent = this.parentNode;
      parent.classList.add("focus");
    }

    function blurFunc() {
      let parent = this.parentNode;
      if (this.value === "") {
        parent.classList.remove("focus");
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);

      // Cleanup event listeners when the component is unmounted
      return () => {
        input.removeEventListener("focus", focusFunc);
        input.removeEventListener("blur", blurFunc);
      };
    });
  }, []);

  const handleContactClick = () => {
    // Perform any actions you need when the form is submitted.
    // For now, let's set the messageSent state to true and clear the input fields.
    setMessageSent(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  
    // Set a timeout to reset the messageSent state after 3 seconds
    setTimeout(() => {
      setMessageSent(false);
    }, 1000);
  };
  

  return (
    <div id="contact">
      <div className="container">
        <span className="big-circle"></span>
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              dolorum adipisci recusandae praesentium dicta!
            </p>

            <div className="info">
              <div className="information">
                <img src={location1} className="icon" alt="" />
                <p>92 Cherry Drive Uniondale, NY 11553</p>
              </div>
              <div className="information">
                <img src={email1} className="icon" alt="style" />
                <p>lorem@ipsum.com</p>
              </div>
              <div className="information">
                <img src={phone1} className="icon" alt="style" />
                <p>123-456-789</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form action="index.html" autoComplete="off">
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <label htmlFor="">Username</label>
                <span>Username</span>
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label htmlFor="">Email</label>
                <span>Email</span>
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <label htmlFor="">Phone</label>
                <span>Phone</span>
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="input"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                ></textarea>
                <label htmlFor="">Message</label>
                <span>Message</span>
              </div>
              <input
                type="button"
                value="Send"
                className="btn"
                onClick={handleContactClick}
              />
              {messageSent && <p className="message-sent">Message Sent!</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
