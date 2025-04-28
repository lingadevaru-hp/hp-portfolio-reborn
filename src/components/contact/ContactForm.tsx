import React, { useState } from "react";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      await fetch("https://formsubmit.co/ajax/contact@lingadevaru.in", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      setIsSubmitted(true);
      e.currentTarget.reset(); // Clear form after submit
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900">
      <h1 className="text-3xl text-white mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        {/* Hidden Fields */}
        <input type="hidden" name="_captcha" value="false" />
        <input
          type="hidden"
          name="_autoresponse"
          value="Thank you for contacting Lingadevaru HP! I will get back to you soon."
        />
        <input
          type="hidden"
          name="_subject"
          value="New Message from Lingadevaru Website!"
        />

        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            required
            className="w-full p-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition duration-300"
        >
          Submit
        </button>

        {isSubmitted && (
          <div className="text-green-400 text-center mt-4">
            ✅ Your message has been sent successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
