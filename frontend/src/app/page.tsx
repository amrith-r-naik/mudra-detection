import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { FaGithub } from "react-icons/fa";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#1B212F] to-[#210f37] text-white">
        {/* Navigation Bar */}
        <header className="fixed w-full top-0 z-50 bg-[#1B212F]/80 backdrop-blur-md border-b border-[#CA8653]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-transparent">
                    MudraGyana
                  </span>
                </Link>
              </div>

              <nav className="flex items-center space-x-8">
                <Link
                  href="/"
                  className="text-[#FFFFFF] hover:text-[#CA8653] transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-[#FFFFFF] hover:text-[#CA8653] transition-colors duration-200 text-sm uppercase tracking-wider font-medium"
                >
                  About Us
                </Link>
                <Link
                  href={session ? "/api/auth/signout" : "/api/auth/signin"}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] text-white font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-[#CA8653]/20"
                >
                  {session ? "Logout" : "Login"}
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-grow flex flex-col items-center justify-center px-6 text-center py-32 mt-16">
          {/* Background Dancers */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <img
              src="/dancer-left.png"
              alt="Dancer Left"
              className="absolute left-0 bottom-0 w-[220px] sm:w-[600px] opacity-30"
            />
            <img
              src="/dancer-right.png"
              alt="Dancer Right"
              className="absolute right-0 bottom-0 w-[220px] sm:w-[500px] opacity-30"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#FFFFFF] to-[#CA8653] bg-clip-text text-transparent">
              Predict and Learn Bharatanatya Mudras
            </h1>
            <p className="text-lg sm:text-lg mb-10 text-[#FFFFFF]/90">
              Experience the blend of classical art and modern AI to recognize Asamyukta Hastas
            </p>
            <Link
              href="/mudra-detector"
              className="inline-block rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] px-8 py-3 text-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#CA8653]/20 hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </section>
        {/* After Hero Section, before Footer */}
        <section id="about" className="py-24 px-6 bg-[#241F2A]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-transparent">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-[#1B212F] p-6 rounded-lg border border-[#CA8653]/20 hover:border-[#CA8653]/40 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-[#CA8653] to-[#b27242] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#CA8653]">Position Your Hand</h3>
                <p className="text-[#FFFFFF]/80">
                  Place your hand against a plain background with good lighting. Ensure your mudra gesture is clear and well-formed.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#1B212F] p-6 rounded-lg border border-[#CA8653]/20 hover:border-[#CA8653]/40 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-[#CA8653] to-[#b27242] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#CA8653]">Capture Image</h3>
                <p className="text-[#FFFFFF]/80">
                  Use our built-in camera feature to take a photo, or upload an existing image of your mudra gesture.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#1B212F] p-6 rounded-lg border border-[#CA8653]/20 hover:border-[#CA8653]/40 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-[#CA8653] to-[#b27242] rounded-full flex items-center justify-center mb-4 text-white font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#CA8653]">View Results</h3>
                <p className="text-[#FFFFFF]/80">
                  Our AI will analyze your mudra and provide instant results, identifying the specific Asamyukta Hasta being performed.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-lg text-[#FFFFFF]/80 max-w-2xl mx-auto">
                MudraGyana uses advanced AI technology to recognize and classify traditional Bharatanatyam hand gestures, making it easier for students and enthusiasts to learn and practice.
              </p>
              <Link
                href="/mudra-detector"
                className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] text-white font-semibold hover:shadow-lg hover:shadow-[#CA8653]/20 transition-all duration-200 hover:scale-105"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-[#1B212F]/90 backdrop-blur-md border-t border-[#CA8653]/10 py-8 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo and Copyright */}
              <div className="mb-4 md:mb-0">
                <span className="text-xl font-bold bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-transparent">
                  MudraGyana
                </span>
                <p className="text-sm text-[#FFFFFF]/60 mt-2">
                  © 2024 MudraGyana. All rights reserved.
                </p>
              </div>

              {/* Project Link */}
              <Link
                href="https://github.com/trishashetty19/mudra-detection"
                target="_blank"
                className="text-[#FFFFFF]/80 hover:text-[#CA8653] transition-colors duration-200 flex items-center"
              >
                <FaGithub className="w-5 h-5 mr-2" />
                <span>View Project on GitHub</span>
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </HydrateClient>
  );
}