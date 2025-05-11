
/**
 * This file contains the backend logic for processing the contact form,
 * including LLM interaction and email sending using SendGrid.
 * For this example an imaginary API is used, this code is for illustrative purposes only.
 */

import process from 'process';
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as MailerSend from "mailersend";

// Initialize Gemini and MailerSend
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!); // This key must be in the .env file
const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY!;// This key must be in the .env file


const personalDetails = {
    name: "Lingadevaru HP",
    profession: "Computer Science student & Full Stack Developer",
    location: "Tumkur, India",
    availability: "Monday to Sunday, 12 AM to 12 PM IST",
    notAvailable: "Weekends & public holidays",
    interests: ["Linux", "Open Source", "Artificial Intelligence", "Yoga", "Mindfulness"],
    website: "lingadevaru.in",
    tone: "Friendly, witty, flirty when casual, but confident and professional when needed",
}

/** 
 * Sends a prompt to the LLM to get a response.
 * @throws Error if the required environment variables are not set.
 * @throws Error if the required environment variables are not a string.
 * @throws Error if the required environment variables are empty.
 * 
 * @param prompt The prompt to send to the LLM.
 * @returns A promise that resolves with the LLM's response.
 */

async function getLLMResponse(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("LLM response:", text);
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
        throw new Error("GOOGLE_GEMINI_API_KEY environment variable is not set");
    }
    if (typeof process.env.GOOGLE_GEMINI_API_KEY !== "string") {
        throw new Error("GOOGLE_GEMINI_API_KEY environment variable is not a string");
    }
    if (!process.env.GOOGLE_GEMINI_API_KEY.trim()) {
        throw new Error("GOOGLE_GEMINI_API_KEY environment variable is empty");
    }
    return text;
}

/** 
 * Sends an email using the MailerSend API.
 * @throws Error if the required environment variables are not set.
 * @param toEmail The recipient's email address.
 * @throws Error if the FROM_EMAIL environment variable is not set.
 * @throws Error if the MAILERSEND_API_KEY is not a string.
 * @throws Error if the MAILERSEND_API_KEY is empty.
 * @throws Error if the FROM_EMAIL is not a string.
 * @throws Error if the FROM_EMAIL is empty.
 * @param response The response to send to the user.
 * @returns A Promise that resolves with a success message or rejects with an error message.
 */
async function sendEmail(toEmail: string, response: string): Promise<string> {
    const mailerSend = new MailerSend.default({ api_key: process.env.MAILERSEND_API_KEY! });
    if (!process.env.MAILERSEND_API_KEY) {
        throw new Error("MAILERSEND_API_KEY environment variable is not set");
    }
    if (!process.env.FROM_EMAIL) {
        throw new Error("FROM_EMAIL environment variable is not set");
    }
    if (typeof process.env.MAILERSEND_API_KEY !== "string") {
        throw new Error("MAILERSEND_API_KEY environment variable is not a string");
    }
    if (!process.env.MAILERSEND_API_KEY.trim()) {
        throw new Error("MAILERSEND_API_KEY environment variable is empty");
    }

    const sentFrom = {
        email: process.env.FROM_EMAIL!,
        name: "Lingadevaru HP",
    };

    const recipients = [
        {
            email: toEmail,
        },
    ];

    const emailParams = {
        from: sentFrom,
        to: recipients,
        subject: "Response from Lingadevaru HP",
        html: `<p>${response}</p>`,
    };

    try {
        await mailerSend.email.send(emailParams);
        return "Email sent successfully!";
    } catch (error: any) {
        console.error("Error sending email:", error.body);
        throw new Error("Failed to send email.");
    }
}

/**
 * Processes the contact form data, interacts with the LLM, and sends an email.
 */
export async function processContactForm(name: string, email: string, message: string): Promise<string> {
    const prompt = `You are acting as **${personalDetails.name}**, a **${personalDetails.profession}** based in **${personalDetails.location}**. You're known for your mix of **friendly professionalism, fun personality, flirty charm**, and your signature **Kannada-English blend** of communication.

#### 🧠 **${personalDetails.name} Persona:**

- **Name:** ${personalDetails.name}
- **Profession:** ${personalDetails.profession}
- **Location:** ${personalDetails.location}
- **Availability:** ${personalDetails.availability}
- **Non-availability:** ${personalDetails.notAvailable}
- **Interests:** ${personalDetails.interests.join(", ")}
- **Website:** ${personalDetails.website}
- **Tone:** ${personalDetails.tone}

---

#### 💌 **Reply Format to User Messages (From Contact Form)**

When a user submits the contact form with:
- **Name** : ${name}
- **Email** : ${email}
- **Message** : ${message}

Generate an **email reply** in the following way:

---

### ✅ **Tone Rules:**
1. **Friendly and professional** — match the energy of the user
2. **Include flirty or playful lines** if the message is casual or fun
3. Use **Kannada + English** mix in a natural, chill way
4. If it's a serious business or collab inquiry, **tone it down slightly but stay warm**
5. If message has errors (like invalid email, or gibberish), politely point that out in a humorous tone

---

### ✉️ **Email Reply Template:**
**Subject:** Got your message! 😄 | ${personalDetails.name} here
**Body:**  
Hi ${name} 👋,

Nim message nodi, swalpa smile barthaytu 😄  
Thanks for reaching out! I read what you said:  
> "${message}"

✨ First of all, **nice to meet you**! I'm **${personalDetails.name}**, full-stack dev, Linux lover, and yoga enthusiast based in **${personalDetails.location}** — you can stalk my tech brain at ${personalDetails.website} 😎

[IF casual/flirty message]  
Hmmm... idu thumba interesting agide 😉  
Looks like we vibe on the same frequency. Ondu hangout plan maadona aa 6AM suggestion nodi, swalpa nanna schedule check maadbeku. But neevu nimma email haakiddu, so I'll keep you posted 😏

[IF message is professional or collab-based]  
Your idea looks solid! I'd love to connect and explore how we can work together. I'm available ${personalDetails.availability} (except ${personalDetails.notAvailable}).  
Shall we plan a quick call or email thread?

[IF invalid email or gibberish]  
Oops, I tried replying but your email ID looks a bit off 😅 Can you double-check and resend? Also, I think the message was half-asleep 🤭

📞 If you're comfy, share your **phone number** too — we can coordinate faster.

Tilli then, keep coding, keep vibing ✨  
Talk soon!  

With good vibes,  
**${personalDetails.name}**  
📍${personalDetails.location}  
🌐 ${personalDetails.website}  
📩 contact@lingadevaru.in`;

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
