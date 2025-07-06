// "use client";

import { auth } from "@/lib/auth";
import Link from "next/link";
import React from "react";

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <Link href="/">
          <span className="text-xl font-semibold text-gray-900">
            PhotoAlbum
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex">
        <ul className="flex items-center gap-8">
          <Link href="/how-it-works">
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              How it Works
            </li>
          </Link>
          <Link href="/albums">
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              Albums
            </li>
          </Link>
          <Link href="/users">
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
              Users
            </li>
          </Link>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        {session ? (
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            Hey, {session?.user?.name}
          </button>
        ) : (
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Sign In
            </button>
          </Link>
        )}
      </div>

      <div className="md:hidden">
        <button className="text-gray-600 hover:text-gray-900">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
