import { useRef, useState } from "react";
import { ScrollView } from "react-native";

import { SPECIAL_BUTTONS, TButton } from "@/constants/calc";

export function useCalc() {
  const ref = useRef<ScrollView>(null);
  const [equation, setEquation] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleAction = (action: string) => {
    const clearAll = () => {
      setEquation([]);
      setShowResult(false);
    };

    const clearLast = () => {
      setEquation((prev) => prev.slice(0, -1));
      ref.current?.scrollToEnd({ animated: true });
      setShowResult(false);
    };

    const calculate = () => {
      const SPECIAL_BUTTONS_WITHOUT_PERCENT = SPECIAL_BUTTONS.filter((e) => e !== "%");
      const lastElement = equation.at(-1);
      if (lastElement && SPECIAL_BUTTONS_WITHOUT_PERCENT.includes(lastElement)) {
        clearLast();
      }

      const limiter = lastElement === "%" ? "/ 100" : "/ 100 *";

      let sanitizedEquation = equation
        .join("")
        .replace(/(\d)([^\d.])/g, "$1 $2")
        .replace(/([^\d.])(\d)/g, "$1 $2")
        .replace(/ \. /g, ".")
        .replace(/%/g, limiter)
        .replace(/x/g, "*");

      if (lastElement && SPECIAL_BUTTONS_WITHOUT_PERCENT.includes(lastElement)) {
        sanitizedEquation = sanitizedEquation.slice(0, -1);
      }

      setResult(eval(sanitizedEquation));
      setShowResult(true);
    };

    switch (action) {
      case "clearAll":
        clearAll();
        break;
      case "clearLast":
        clearLast();
        break;
      case "calculate":
        calculate();
        break;
      default:
        break;
    }
  };

  const handleEquation = (button: TButton) => {
    if (button.char) {
      let performScroll: boolean = false;

      setEquation((prev) => {
        const lastChar = prev[prev.length - 1];
        const isCurrentSpecial = SPECIAL_BUTTONS.includes(button.char);
        const isLastSpecial = SPECIAL_BUTTONS.includes(lastChar);

        if (isCurrentSpecial && prev.length === 0 && button.char !== "-") {
          return prev;
        }

        if (isLastSpecial && isCurrentSpecial && prev.length > 1 && lastChar !== button.char) {
          performScroll = true;
          return [...prev.slice(0, -1), button.char];
        }

        if (!(isLastSpecial && isCurrentSpecial)) {
          performScroll = true;
          return [...prev, button.char];
        }

        return prev;
      });

      if (performScroll) ref.current?.scrollToEnd({ animated: true });
    }

    if (button.action) handleAction(button.action);
  };

  return { ref, equation, showResult, result, handleEquation };
}
