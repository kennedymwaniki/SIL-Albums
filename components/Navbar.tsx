"use client";
import { auth } from "@/lib/auth";
import Link from "next/link";
import React, { useState } from "react";
import SignOutButton from "./SignOutButton";

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
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

        {/* desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8">
            <Link href="/how-it-works">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                How it Works
              </li>
            </Link>
            <Link href="/photos">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                Photos
              </li>
            </Link>
            <Link href="/users">
              <li className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                Users
              </li>
            </Link>
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                Hey, {session?.user?.name}
              </button>
              <SignOutButton />
            </>
          ) : (
            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* mobile Hamburger Button */}
        <div className="md:hidden">
          <button
            className="text-gray-600 hover:text-gray-900 z-50 relative"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-100/20 bg-opacity-100 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Menu</span>
            <button
              onClick={closeMobileMenu}
              className="text-gray-600 hover:text-gray-900"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-6 py-4">
            <ul className="space-y-6">
              <li>
                <Link href="/how-it-works" onClick={closeMobileMenu}>
                  <span className="text-lg text-gray-700 hover:text-blue-600 cursor-pointer transition-colors block py-2">
                    How it Works
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/photos" onClick={closeMobileMenu}>
                  <span className="text-lg text-gray-700 hover:text-blue-600 cursor-pointer transition-colors block py-2">
                    Photos
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/users" onClick={closeMobileMenu}>
                  <span className="text-lg text-gray-700 hover:text-blue-600 cursor-pointer transition-colors block py-2">
                    Users
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="px-6 py-4 border-t border-gray-200">
            {session ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  Signed in as{" "}
                  <span className="font-medium">{session?.user?.name}</span>
                </div>
                <SignOutButton />
              </div>
            ) : (
              <Link href="/login" onClick={closeMobileMenu}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-lg transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
