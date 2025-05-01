// src/components/contact/ContactForm.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import axios from 'axios';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // ← Updated to n8n webhook URL
      await axios.post(
        'https://thoshan.app.n8n.cloud/webhook/contact-form',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      toast({ title: "Message sent!", description: "Thank you for your message. I'll get back to you soon." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({ title: "Error!", description: "There was an error submitting your message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div /* animation props omitted for brevity */>
      <Card className="bg-card/50 border-gradient overflow-hidden h-full shadow-sm hover:shadow-md transition-all">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">Send a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="bg-background/50" />  
            <Input name="email" type="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="bg-background/50" />  
            <Textarea name="message" rows={5} placeholder="Your Message" value={formData.message} onChange={handleChange} required className="min-h-[120px] bg-background/50" />  
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
