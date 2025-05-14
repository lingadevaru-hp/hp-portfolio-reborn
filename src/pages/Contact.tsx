
import ContactSection from "@/components/ContactSection";
// Sidebar is now handled by Layout component
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar is now handled by Layout component */}
      <main className="flex-grow">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
