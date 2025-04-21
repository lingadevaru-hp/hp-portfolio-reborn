
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NameSwitcherProps {
  className?: string;
}

const NameSwitcher: React.FC<NameSwitcherProps> = ({ className = "" }) => {
  const fullNameText = "Hello, I am H P";
  const nickname = "Thoshan";

  const [displayText, setDisplayText] = useState(fullNameText);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stage, setStage] = useState<"full" | "eraseHP" | "typeNick" | "eraseNick" | "typeHP">("full");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // The logic:
    // stage full: displayed "Hello, I am H P" for 2000ms then move to eraseHP
    // eraseHP: erase "H P" part (last 3 chars)
    // typeNick: type "Thoshan" after "Hello, I am "
    // display for 2000ms
    // eraseNick: erase "Thoshan"
    // typeHP: type "H P"
    // loop

    const startingText = "Hello, I am ";
    const hpText = "H P";

    switch(stage) {
      case "full":
        timeout = setTimeout(() => {
          setStage("eraseHP");
        }, 2000);
        break;

      case "eraseHP": {
        // Erase last character of hpText from displayText until removed
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
        // Type out nickname after startingText
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
          setStage("typeHP");
        }
        break;
      }

      case "typeHP": {
        if (displayText.length < startingText.length + hpText.length) {
          timeout = setTimeout(() => {
            setDisplayText(startingText + hpText.slice(0, displayText.length - startingText.length + 1));
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
      className={`text-4xl md:text-6xl font-bold mb-4 ${className} whitespace-pre-wrap`}
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

