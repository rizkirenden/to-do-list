"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import Link from "next/link";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-indigo-600">
            Moh Rizki_Tugas 4
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <a
                href="/todolist"
                className="text-gray-700 hover:text-indigo-600 transition"
              >
                Home
              </a>
            </div>
            <div className="flex items-center space-x-4 ml-6">
              <Link href="/profile">
                <button className="p-2 text-gray-600 hover:text-indigo-600 transition">
                  <FiUser size={20} />
                </button>
              </Link>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4 px-4">
            <div className="flex flex-col space-y-4">
              <a
                href="/todolist"
                className="text-gray-700 hover:text-indigo-600 transition py-2"
                onClick={toggleMenu}
              >
                Home
              </a>
              <div className="flex space-x-4 pt-4 border-t">
                <Link href="/profile">
                  <button className="p-2 text-gray-600 hover:text-indigo-600 transition">
                    <FiUser size={20} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
