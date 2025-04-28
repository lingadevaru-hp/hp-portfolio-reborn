
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NameSwitcherProps {
  className?: string;
}

const NameSwitcher: React.FC<NameSwitcherProps> = ({ className = "" }) => {
  const fullNameText = "Hello,I am Lingadevaru";
  const nickname = "Thoshan";

  const [displayText, setDisplayText] = useState(fullNameText);
  const [stage, setStage] = useState<"full" | "eraseFullName" | "typeNick" | "eraseNick" | "typeFullName">("full");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const startingText = "Hello, I am ";

    switch(stage) {
      case "full":
        timeout = setTimeout(() => {
          setStage("eraseFullName");
        }, 2000);
        break;

      case "eraseFullName": {
        if (displayText.length > startingText.length) {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, 100);
        } else {
          setStage("typeNick");
        }
        break;
      }

      case "typeNick": {
        if (displayText.length < startingText.length + nickname.length) {
          timeout = setTimeout(() => {
            setDisplayText(startingText + nickname.slice(0, displayText.length - startingText.length + 1));
          }, 120);
        } else {
          timeout = setTimeout(() => {
            setStage("eraseNick");
          }, 2000);
        }
        break;
      }

      case "eraseNick": {
        if (displayText.length > startingText.length) {
          timeout = setTimeout(() => {
            setDisplayText(prev => prev.slice(0, -1));
          }, 80);
        } else {
          setStage("typeFullName");
        }
        break;
      }

      case "typeFullName": {
        const fullNameWithoutPrefix = "Lingadevaru";
        if (displayText.length < startingText.length + fullNameWithoutPrefix.length) {
          timeout = setTimeout(() => {
            setDisplayText(startingText + fullNameWithoutPrefix.slice(0, displayText.length - startingText.length + 1));
          }, 150);
        } else {
          timeout = setTimeout(() => {
            setStage("full");
          }, 2000);
        }
        break;
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, stage, nickname]);

  return (
    <motion.h1 
      className={`text-4xl md:text-6xl font-bold mb-4 ${className} whitespace-nowrap min-h-[1.4em]`}
      aria-label={displayText}
      aria-live="polite"
    >
      {displayText}
      <motion.span
        className="inline-block w-[2px] h-[1.2em] bg-primary ml-[2px] align-middle"
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.h1>
  );
};

export default NameSwitcher;
