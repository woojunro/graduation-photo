import DDayCounter from "@/components/DDayCounter";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
        {/* Left Side: Image */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <Image
            src={process.env.NEXT_PUBLIC_HERO_IMAGE_SRC as string}
            alt="Graduation Photo"
            width={150}
            height={150}
            className="rounded-lg"
          />
        </div>

        {/* Right Side: Text and Button */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">졸업생은 추억이 필요해요</h1>
          <p className="text-2xl text-gray-600 mb-4">
            화석은 더 이상 학교에 남을 수 없어요…
          </p>
          <p className="text-2xl text-gray-600 mb-4">
            마지막으로 함께 사진 찍기를 원합니다.
          </p>
          <a
            className="bg-red-500 text-4xl font-bold text-white px-6 py-2 rounded-2xl shadow-md hover:bg-red-600"
            href="/register/name"
          >
            함께하기
          </a>
        </div>
      </section>

      {/* D-Day Section */}
      <DDayCounter />
    </main>
  );
}
