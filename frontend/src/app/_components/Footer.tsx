import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#CA8653]/10 bg-[#1B212F]/90 py-8 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <span className="bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-xl font-bold text-transparent">
              MudraGyana
            </span>
            <p className="mt-2 text-sm text-[#FFFFFF]/60">
              © 2024 MudraGyana. All rights reserved.
            </p>
          </div>

          <Link
            href="https://github.com/trishashetty19/mudra-detection"
            target="_blank"
            className="flex items-center text-[#FFFFFF]/80 transition-colors duration-200 hover:text-[#CA8653]"
          >
            <FaGithub className="mr-2 h-5 w-5" />
            <span>View Project on GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
