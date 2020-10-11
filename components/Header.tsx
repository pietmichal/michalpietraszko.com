import Link from "next/link";

export default function Header() {
  return (
    <div className="container py-4 flex items-center">
      <img
        className="h-12 w-12 rounded-full"
        src="https://pbs.twimg.com/profile_images/1245998426396831744/fcQ36KJ9_400x400.jpg"
      />
      <span className="pl-4 text-3xl font-medium">Michał Pietraszko</span>
      <div className="flex-auto"></div>
      <span className="pr-4">
        <Link href="/">Home</Link>
      </span>
      <span className="pr-4">
        <Link href="/about">About</Link>
      </span>
    </div>
  );
}
