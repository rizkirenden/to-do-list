"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Import React Icons
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="relative">
          <Image
            src="/images/profile.jpeg"
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border-4 border-indigo-500 shadow-lg shadow-indigo-500/50 hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 rounded-full border-4 border-transparent animate-ping shadow-lg shadow-indigo-500/50"></div>
        </div>
        <h1 className="mt-6 text-4xl font-bold text-gray-300 leading-relaxed">
          Moh. Rizki
        </h1>
        {/* Social Icons below name */}
        <div className="flex space-x-4 mt-4">
          <a
            href="https://github.com/rizkirenden"
            className="text-gray-300 hover:text-[#333] dark:hover:text-[#f5f5f5] transition-colors"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/rizki-renden"
            className="text-gray-300 hover:text-[#0077B5] transition-colors"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/rizkirenden/"
            className="text-gray-300 hover:text-[#E1306C] transition-colors"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={isLoaded ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:-translate-y-1 transition-transform border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
            About Me
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Nama saya Moh. Rizki, seorang Full Stack Developer dengan gelar S1
            dari Universitas Tadulako (UNTAD), dengan fokus pada Sistem Komputer
            (S.Kom). Judul tugas akhir saya adalah Sistem Deteksi Dini Kebakaran
            Menggunakan IoT, GIS, Web, dan Mobile. Dalam proyek ini, saya
            merancang dan mengembangkan sistem yang mengintegrasikan teknologi
            Internet of Things (IoT) untuk mendeteksi kebakaran secara real-time
            dan memetakan data menggunakan Geographic Information System (GIS).
            Aplikasi ini dibuat dengan Laravel untuk platform web dan React
            Native untuk aplikasi mobile, yang memungkinkan pengguna untuk
            mendapatkan informasi yang akurat dan cepat mengenai potensi
            kebakaran di wilayah mereka.
          </p>
          <div className="h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent my-4"></div>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={isLoaded ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:-translate-y-1 transition-transform border border-gray-700"
        >
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">Skills</h3>
          <SkillBar name="HTML" level={95} />
          <SkillBar name="CSS" level={90} />
          <SkillBar name="JAVA SCRIPT" level={85} />
          <SkillBar name="Dota 2" level={75} />
          <div className="h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent my-4"></div>
        </motion.div>
      </div>
    </div>
  );
};

const SkillBar = ({ name, level }) => (
  <div className="flex items-center mb-4">
    <span className="w-24 text-gray-300">{name}</span>
    <div className="flex-1 h-2 bg-gray-700 rounded-full mx-4 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 1 }}
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
      />
    </div>
    <span className="text-indigo-400 font-bold">{level}%</span>
  </div>
);

export default Profile;
