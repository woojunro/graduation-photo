"use client";

import { useState, useEffect } from "react";

// Function to calculate D-Day
const calculateDDay = (): number => {
  const graduationDate = new Date("2025-02-23").getTime();
  const today = new Date().getTime();
  const diffTime = graduationDate - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default function DDayCounter() {
  const [dDay, setDDay] = useState<number>(calculateDDay);

  useEffect(() => {
    const interval = setInterval(() => {
      setDDay(calculateDDay());
    }, 60000); // Update every 1 minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <section className="mt-8 text-center">
      <p className="text-2xl text-gray-700">
        📅 졸업 사진 일시: 2025년 2월 23일{" "}
        <span className="font-bold mt-2">D-{dDay}</span>
      </p>
    </section>
  );
}
