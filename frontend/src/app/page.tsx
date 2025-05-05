import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import Image from "next/image";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="relative flex min-h-screen flex-col bg-gradient-to-br from-[#1B212F] to-[#210f37] text-white">
        {/* Navbar */}
        <Navbar />

        {/* Background Image */}
        {/* Hero Section */}
        <section className="mt-16 flex h-screen flex-grow flex-col items-center justify-center px-6 py-32 text-center">
          {/* Background Dancers */}
          <div className="pointer-events-none fixed inset-0 z-0">
            <Image
              src="/dancer-left.png"
              alt="Dancer Left"
              width={600}
              height={600}
              className="absolute bottom-0 left-0 opacity-30"
            />
            <Image
              src="/dancer-right.png"
              alt="Dancer Right"
              width={500}
              height={500}
              className="invisible absolute right-0 bottom-0 opacity-30 md:visible"
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-4xl">
            <h1 className="mb-4 bg-gradient-to-r from-[#FFFFFF] to-[#CA8653] bg-clip-text text-4xl font-extrabold text-transparent sm:text-4xl">
              Predict and Learn Bharatanatya Mudras
            </h1>
            <p className="mb-10 text-lg text-[#FFFFFF]/90 sm:text-lg">
              Experience the blend of classical art and modern AI to recognize
              Asamyukta Hastas
            </p>
            <Link
              href="/mudra-detector"
              className="inline-block rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] px-8 py-3 text-lg font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#CA8653]/20"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* About Us */}
        <section
          id="about"
          className="bg-[#241F2A]/50 px-6 py-24 backdrop-blur-sm"
        >
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 bg-gradient-to-r from-[#CA8653] to-[#FFFFFF] bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl">
              How It Works
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="rounded-lg border border-[#CA8653]/20 bg-[#1B212F] p-6 transition-colors hover:border-[#CA8653]/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] font-bold text-white">
                  1
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#CA8653]">
                  Position Your Hand
                </h3>
                <p className="text-[#FFFFFF]/80">
                  Place your hand against a plain background with good lighting.
                  Ensure your mudra gesture is clear and well-formed.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-lg border border-[#CA8653]/20 bg-[#1B212F] p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:border-[#CA8653]/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] font-bold text-white">
                  2
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#CA8653]">
                  Capture Image
                </h3>
                <p className="text-[#FFFFFF]/80">
                  Use our built-in camera feature to take a photo, or upload an
                  existing image of your mudra gesture.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-lg border border-[#CA8653]/20 bg-[#1B212F] p-6 transition-colors hover:border-[#CA8653]/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] font-bold text-white">
                  3
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[#CA8653]">
                  View Results
                </h3>
                <p className="text-[#FFFFFF]/80">
                  Our AI will analyze your mudra and provide instant results,
                  identifying the specific Asamyukta Hasta being performed.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="mx-auto max-w-2xl text-lg text-[#FFFFFF]/80">
                MudraGyana uses advanced AI technology to recognize and classify
                traditional Bharatanatyam hand gestures, making it easier for
                students and enthusiasts to learn and practice.
              </p>
              <Link
                href="/mudra-detector"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-[#CA8653] to-[#b27242] px-8 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#CA8653]/20"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </HydrateClient>
  );
}
