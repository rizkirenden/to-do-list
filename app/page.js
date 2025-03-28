"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/todolist");
    }, 2000);
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white flex-col">
      {loading ? (
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-blue-500 border-solid animate-spin"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-green-500 border-solid animate-spin reverse-spin"></div>
        </div>
      ) : (
        <div className="transition-opacity opacity-0 animate-fadeIn">
          <h1 className="text-3xl font-bold">Hallo</h1>
          <p className="mt-4">Masuk Ke Tugas 4</p>
        </div>
      )}
    </div>
  );
}
