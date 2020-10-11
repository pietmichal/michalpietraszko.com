import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  return (
    <>
      <div className="container py-2 px-2 flex items-center bg-white">
        <img
          className="h-8 w-8 md:h-12 md:w-12 rounded-full"
          src="https://pbs.twimg.com/profile_images/1245998426396831744/fcQ36KJ9_400x400.jpg"
        />
        <span className="pl-2 text-lg md:text-3xl font-medium">Michał Pietraszko</span>
        <div className="w-6 h-6 ml-auto">
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
      </div>
      {burgerOpen && (
        <div className="container px-2 flex flex-col divide-y divide-gray-500 bg-gray-300">
          <Link href="/">
            <span className="py-1 hover:underline cursor-pointer">Home</span>
          </Link>
          <Link href="/about">
            <span className="py-1 hover:underline cursor-pointer">About</span>
          </Link>
        </div>
      )}
    </>
  );
}
