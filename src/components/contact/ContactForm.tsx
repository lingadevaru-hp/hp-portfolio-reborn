import React, { useState, useEffect } from "react";
import { processContactForm } from "@/lib/llm";

const ContactForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState<   
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (submissionStatus === "success" || submissionStatus === "error") {
      setShowPopup(true);
    }
  }, [submissionStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmissionStatus("loading");
    const formData = new FormData(e.currentTarget);
    // Extract data for processContactForm
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    e.preventDefault();
    try {
      // Process and get the reply
      const reply = await processContactForm(name, email, message);
      setPopupMessage(reply);
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
      console.error("Error submitting the form", error);   
      setPopupMessage("Sorry, there was an error processing your message.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900">
      <h1 className="text-3xl text-white mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
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

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              {submissionStatus === "loading" && (
                <div className="text-blue-400 text-center">
                  ⏳ Processing... Please wait.
                </div>
              )}
              {submissionStatus === "success" && (
                <div className="text-green-400 text-center">
                  <p>{popupMessage}</p>
                </div>
              )}
              {submissionStatus === "error" && (
                <div className="text-red-400 text-center">
                  <p>{popupMessage}</p>
                </div>
              )}    
              <button
                className="mt-4 p-2 bg-gray-300 rounded-md"
                onClick={() => {
                  setShowPopup(false);
                  setSubmissionStatus("idle");
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
