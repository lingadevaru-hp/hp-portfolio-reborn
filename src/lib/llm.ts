/**
 * This file contains the backend logic for processing the contact form,
 * including LLM interaction and email sending using SendGrid.
 * For this example an imaginary API is used, this code is for illustrative purposes only.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import MailerSend from "mailersend";
const genAI = new GoogleGenerativeAI("AIzaSyCwD-hYhnf4xH8FVML1K3tGhIBr6yJc3r4");

const personalDetails = {
    name: "John",
    profession: "software developer",
    availability: "mornings and evenings",
    notAvailable: "afternoons",
    interests: ["software development"], // Add other interests here if needed
};

const MAILERSEND_API_KEY = "mlsn.e71cfa349124c26e7f48ee3c954dc6b2826526a2cf4daa7b35d70d98ef3c99d2"; // Replace with your actual API key
const FROM_EMAIL = "contact@lingadevaru.in";

/** 
 * Simulates a call to an LLM.
 * @param prompt The prompt to send to the LLM.
 * @returns A promise that resolves with the LLM's response.
 */

async function getLLMResponse(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("LLM response:", text);
    return text;

}

/** 
 * Sends an email using the MailerSend API.
 * @param toEmail The recipient's email address.
 * @param response The response to send to the user.
 * @returns A Promise that resolves with a success message or rejects with an error message.
 */
async function sendEmail(toEmail: string, response: string): Promise<string> {
    const mailerSend = new MailerSend({
        api_key: MAILERSEND_API_KEY,
    });

    const sentFrom = {
        email: FROM_EMAIL,
        name: "John",
    };

    const recipients = [
        {
            email: toEmail,
        },
    ];

    const emailParams = {
        from: sentFrom,
        to: recipients,
        subject: "Response from John",
        html: `<p>${response}</p>`,
    };

    try {
        await mailerSend.email.send(emailParams);
        return "Email sent successfully!";
    } catch (error) {
        console.error("Error sending email:", error.body);
        throw new Error("Failed to send email.");
    }
}
/**
 * Processes the contact form data, interacts with the LLM, and sends an email.
 */

export async function processContactForm(name: string, email: string, message: string): Promise<string> {
    const prompt = `
  Objective: Act as me, ${personalDetails.name}, a ${personalDetails.profession}, and generate a friendly and helpful email response to a user who contacted me.
  Personal Details: My name is ${personalDetails.name}, I am a ${personalDetails.profession}. I like to hang out in the ${personalDetails.availability}, but not in the ${personalDetails.notAvailable}. I like ${personalDetails.interests.join(", ")}

  User Details: The user's name is ${name}, their email is ${email}, and their message is: ${message}.
  Instructions: Generate an email to be sent to ${email} that replies to the user's message. Reply in first person, from my point of view. Be friendly and helpful.
  Email:
  `;

    try {
        const response = await getLLMResponse(prompt);
        console.log("LLM response:", response);
        const sendEmailResponse = await sendEmail(email, response);
        return sendEmailResponse;
    } catch (error) {
        console.error("Error processing contact form:", error);
        return "Sorry, there was an error processing your message.";
    }
}