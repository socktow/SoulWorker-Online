"use client";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  {
    name: "News",
    href: "/news",
    subLinks: [
      { name: "Latest News", href: "/news?type=0" },
      { name: "Notice", href: "/news?type=1" },
      { name: "Maintenance", href: "/news?type=2" },
      { name: "Updates", href: "/news?type=3" },
      { name: "Shop", href: "/news?type=4" },
      { name: "Event", href: "/news?type=5" },
      { name: "GM Video", href: "/news?type=6" },
    ],
  },
  {
    name: "About",
    href: "/game-introduction",
    subLinks: [
      { name: "Game", href: "/game-introduction" },
      { name: "Play Guide", href: "/game-guide" },
    ],
  },
  {
    name: "Forum",
    href: "/forum/home",
    subLinks: [
      { name: "Forum Home", href: "/forum/home" },
      { name: "General Discussion", href: "/forum/discussion" },
      { name: "Game Tips", href: "/forum/game-tips" },
      { name: "Q & A", href: "/forum/qa" },
      { name: "Art & Media", href: "/forum/art-media" },
    ],
  },
  {
    name: "Download",
    href: "/game-download",
    subLinks: [{ name: "Game Download", href: "/game-download" }],
  },
  {
    name: "Support",
    href: "/support/faq",
    subLinks: [
      { name: "FAQ", href: "/support/faq" },
      { name: "1:1 Inquiry", href: "/support/qna" },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div id="Header">
      <div className="flex flex-nowrap justify-between h-20 px-6 border-b bg-white shadow-sm">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="ml-6 mt-1">
            <Link aria-label="logo" href="/home-page">
              <img
                src="/static/img/main_logo.png"
                alt="logo"
                className="h-12 w-auto"
              />
            </Link>
          </h1>
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-12 ml-16 text-black">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  className="px-3 py-2 font-semibold hover:text-blue-600 text-black"
                  aria-label="nav-item"
                  href={link.href}
                >
                  {link.name}
                </Link>
                <ul className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded hidden group-hover:block z-10 text-black">
                  {link.subLinks.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        className="block px-4 py-2 hover:bg-gray-100 text-black"
                        href={sub.href}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center">
          <ul className="flex items-center mr-8 text-black">
            <li>
              <Link
                className="flex items-center gap-2 px-3 py-2 hover:text-blue-600 text-black"
                aria-label="nav-item"
                href="/signin"
              >
                <img
                  className="object-cover h-5 w-5"
                  src="/static/img/icon-login.png"
                  alt="login"
                />
                Login
              </Link>
            </li>
            <span className="mx-2 w-px h-6 bg-gray-300"></span>
            <li>
              <Link
                className="flex items-center gap-2 px-3 py-2 hover:text-blue-600 text-black"
                aria-label="nav-item"
                href="/signup"
              >
                <img
                  className="object-cover h-5 w-5"
                  src="/static/img/icon-register.png"
                  alt="register"
                />
                Create Account
              </Link>
            </li>
          </ul>
          <a href="#" className="relative group ml-4">
            <div className="btn-wrap relative z-10">
              <img
                src="/static/img/main_game_txt.png"
                alt="game start"
                className="h-8 w-auto"
              />
            </div>
            <div className="overlay absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
              <img
                src="/static/img/magin_gnb_bg.jpg"
                alt="bg"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </a>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.name}>
              <h3 className="font-bold text-lg mb-2">{link.name}</h3>
              <ul className="space-y-2 pl-4 border-l-2 border-gray-200">
                {link.subLinks.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      className="block hover:text-blue-600"
                      href={sub.href}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t pt-4 space-y-4">
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
              href="/signin"
            >
              <img
                className="object-cover h-5 w-5"
                src="/static/img/icon-login.png"
                alt="login"
              />
              Login
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2"
              href="/signup"
            >
              <img
                className="object-cover h-5 w-5"
                src="/static/img/icon-register.png"
                alt="register"
              />
              Create Account
            </Link>
          </div>
        </nav>
      </div>
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
} 