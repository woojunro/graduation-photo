"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnterNamePage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNext = () => {
    router.push(`/register/time?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">이름 또는 별명을 입력해주세요</h1>
      <div className="w-full p-4 flex items-center justify-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="졸업생이 알아볼 수 있으면 돼요"
          className="border text-xl p-2 rounded w-96 max-w-full mb-4"
        />
      </div>
      <button
        disabled={!name.trim()}
        onClick={handleNext}
        className={`text-xl py-2 px-4 rounded ${
          name.trim()
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        다음
      </button>
    </div>
  );
}
