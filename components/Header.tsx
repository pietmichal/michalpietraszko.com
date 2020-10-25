import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  return (
    <div className="bg-white">
      <div className="container py-4 px-2 flex items-center">
        <img
          className="h-8 w-8 md:h-12 md:w-12 rounded-full ml-2"
          src="https://pbs.twimg.com/profile_images/1245998426396831744/fcQ36KJ9_400x400.jpg"
        />
        <span className="pl-2 text-2xl font-medium">Michał Pietraszko</span>
        <div className="hidden lg:block ml-auto">
          <Link href="/">
            <span
              className={`${
                router.pathname === "/"
                  ? "border-gray-400"
                  : "border-transparent"
              } cursor-pointer box-border border-2 p-2 mr-4 rounded-md hover:border-gray-800`}
            >
              Home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
