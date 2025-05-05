"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-[#CA8653]/10 bg-[#1B212F]/80 backdrop-blur-md"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-2xl font-bold text-transparent"
            >
              MudraGyana
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center space-x-8 md:flex">
            {["Home", "About Us"].map((text, idx) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (idx + 1) }}
              >
                <Link
                  href={text === "Home" ? "/" : "#about"}
                  className="text-sm font-medium tracking-wider text-[#FFFFFF] uppercase transition-colors duration-200 hover:text-[#CA8653]"
                >
                  {text}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] px-6 py-2 text-sm font-medium tracking-wider text-white uppercase shadow-lg transition-opacity duration-200 hover:opacity-90 hover:shadow-[#CA8653]/20"
              >
                {session ? "Logout" : "Login"}
              </Link>
            </motion.div>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 space-y-4 px-4 pb-4 text-center md:hidden"
            >
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-[#FFFFFF] uppercase hover:text-[#CA8653]"
              >
                Home
              </Link>
              <Link
                href="#about"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-[#FFFFFF] uppercase hover:text-[#CA8653]"
              >
                About Us
              </Link>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                onClick={() => setIsOpen(false)}
                className="inline-block rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] px-6 py-2 text-sm font-medium text-white uppercase shadow-lg hover:opacity-90 hover:shadow-[#CA8653]/20"
              >
                {session ? "Logout" : "Login"}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
