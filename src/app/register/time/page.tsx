"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SelectTimePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [participants, setParticipants] = useState<{ [key: string]: number }>(
    {}
  );

  const times = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  useEffect(() => {
    // Redirect to the name page if the name is not provided
    if (!name) {
      router.replace("/register/name");
    }

    // Fetch participant counts per time slot from Supabase
    async function fetchParticipants() {
      const { data, error } = await supabase.rpc("get_time_participants_count");

      if (error) {
        console.error(error);
        return;
      }

      // Transform data into a key-value pair for easier usage
      const counts = (data || []).reduce(
        (
          acc: { [key: string]: number },
          item: { selected_time: string; count: number }
        ) => {
          acc[item.selected_time.slice(0, 5)] = item.count;
          return acc;
        },
        {}
      );

      setParticipants(counts);
    }

    fetchParticipants();
  }, [name, router]);

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = async () => {
    // Save to the database
    const { data, error: pError } = await supabase
      .from("participants")
      .insert({ name })
      .select("id")
      .single();
    if (pError) {
      alert("데이터베이스 저장 중 오류가 발생했습니다.");
      return;
    }

    const { error } = await supabase.from("participant_times").insert(
      selectedTimes.map((time) => ({
        participant_id: data.id,
        selected_time: time,
      }))
    );
    if (error) {
      alert("데이터베이스 저장 중 오류가 발생했습니다.");
      return;
    }

    router.push(
      `/register/welcome?name=${encodeURIComponent(
        name!
      )}&time=${encodeURIComponent(selectedTimes[0])}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">시간을 선택해주세요</h1>
      <div className="flex-1 overflow-y-auto w-full mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => toggleTime(time)}
              className={`font-bold text-xl w-full border p-2 rounded ${
                selectedTimes.includes(time) ? "bg-blue-500 text-white" : ""
              }`}
            >
              {time} ({participants[time] || 0}명)
            </button>
          ))}
        </div>
      </div>
      <button
        disabled={selectedTimes.length === 0}
        onClick={handleSubmit}
        className={`text-xl py-2 px-4 rounded w-full ${
          selectedTimes.length > 0
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        다음
      </button>
    </div>
  );
}
