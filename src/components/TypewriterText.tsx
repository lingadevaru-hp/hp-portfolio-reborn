
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 150,
  deletingSpeed = 100,
  delayBetweenTexts = 2000,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    const handleTyping = () => {
      const currentText = texts[textIndex];
      
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.substring(0, displayText.length + 1));
          timeout = setTimeout(handleTyping, typingSpeed);
        } else {
          // Start deleting after delay
          timeout = setTimeout(() => {
            setIsDeleting(true);
            handleTyping();
          }, delayBetweenTexts);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
          timeout = setTimeout(handleTyping, deletingSpeed);
        } else {
          // Start typing the next text
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          timeout = setTimeout(handleTyping, 500);
        }
      }
    };

    timeout = setTimeout(handleTyping, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <span className={`relative inline-block ${className}`}>
      {displayText}
      <motion.span
        className="inline-block w-[2px] h-[1.2em] bg-primary ml-[2px] align-middle"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </span>
  );
};

export default TypewriterText;
