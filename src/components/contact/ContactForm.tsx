import React from "react";

const ContactForm = () => {
  return (
    <div className="container">
      <h1>Contact Us</h1>
      <form
        action="https://formsubmit.co/contact@lingadevaru.in"
        method="POST"
      >
        {/* Hidden Inputs for FormSubmit Settings */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="New Message from Portfolio Website!" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_autoresponse" value="Thank you bro for reaching out! I will get back to you shortly." />

        {/* Form Fields */}
        <div className="form-group">
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Full Name"
                required
              />
            </div>
            <div className="col">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email Address"
                required
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Your Message"
            className="form-control"
            name="message"
            rows={10}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-lg btn-dark btn-block">
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
