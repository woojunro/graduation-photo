"use client";

import { useSearchParams } from "next/navigation";

export default function WelcomePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const time = searchParams.get("time");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">{name}님, 감사합니다!</h1>
      <p className="text-xl mb-4">졸업생의 추억으로 함께해주셔서 감사합니다.</p>
      <p className="text-xl mb-12">
        {time}에 뵙겠습니다. 도착하시면 연락주시기 바랍니다.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="text-xl bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
