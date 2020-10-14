import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="bg-white shadow-sm">
      <div className="container py-4 px-2 flex items-center">
        <img
          className="h-8 w-8 md:h-12 md:w-12 rounded-full ml-2"
          src="https://pbs.twimg.com/profile_images/1245998426396831744/fcQ36KJ9_400x400.jpg"
        />
        <span className="pl-2 text-2xl md:text-3xl font-medium"> 
          Michał Pietraszko
        </span>
        <div className="w-6 h-6 md:w-8 md:h-8 mr-2 ml-auto lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => setBurgerOpen((open) => !open)}
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="hidden lg:block ml-auto">
          <Link href="/">
            <span
              className={`hover:bg-gray-400 hover: cursor-pointer t p-2 mr-4 rounded-sm ${
                router.pathname === "/" && "bg-gray-200"
              }`}
            >
              Home
            </span>
          </Link>
          <Link href="/about">
            <span
              className={`hover:bg-gray-400 cursor-pointer t p-2 mr-4 rounded-sm ${
                router.pathname === "/about" && "bg-gray-200"
              }`}
            >
              About
            </span>
          </Link>
        </div>
      </div>
      {burgerOpen && (
        <div className="container px-2 flex flex-col divide-y divide-gray-500 bg-gray-300 lg:hidden">
          <Link href="/">
            <span className="py-1 hover:underline cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="py-1 hover:underline cursor-pointer">About</span>
          </Link>
        </div>
      )}
    </div>
  );
}
