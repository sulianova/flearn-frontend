import { useState, useEffect } from "react";
import { MS_PER_SECOND } from "utils";

export function useCountdown(targetDate: Date | null) {
  const calculateTimeLeft = () => {
    if (!targetDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const difference = +targetDate - +new Date();
    
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) {
      return;
    }

    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeout(() => clearInterval(timer), difference + 10 * MS_PER_SECOND);
    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, [targetDate]);

  return timeLeft;
}
