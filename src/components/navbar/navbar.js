"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { getUser, signOut, isAuthenticated, AUTH_EVENTS } from "@/lib/auth";

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
  }
];

// User Login Section Component
function UserLoginSection({ user, isUserMenuOpen, setIsUserMenuOpen }) {
  const handleSignOut = () => {
    signOut();
    setIsUserMenuOpen(false);
  };

  if (!user) {
    return (
      <ul className="flex items-center mr-8 text-black gap-2">
        <li>
          <Link
            className="flex items-center gap-2 px-3 py-2 hover:text-yellow-500 text-black text-lg rounded-full border border-transparent hover:border-yellow-400 transition-all duration-150 shadow-sm"
            aria-label="nav-item"
            href="/signin"
          >
            <span className="bg-white rounded-full p-2 shadow hover:bg-yellow-100 transition">
              <img
                className="object-cover h-5 w-5"
                src="/static/img/icon-login.png"
                alt="login"
              />
            </span>
            Login
          </Link>
        </li>
        <span className="mx-2 w-px h-6 bg-gray-300"></span>
        <li>
          <Link
            className="flex items-center gap-2 px-3 py-2 hover:text-yellow-500 text-black text-lg rounded-full border border-transparent hover:border-yellow-400 transition-all duration-150 shadow-sm"
            aria-label="nav-item"
            href="/signup"
          >
            <span className="bg-white rounded-full p-2 shadow hover:bg-yellow-100 transition">
              <img
                className="object-cover h-5 w-5"
                src="/static/img/icon-register.png"
                alt="register"
              />
            </span>
            Create Account
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="relative mr-8 user-menu">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-3 px-4 py-2 hover:bg-yellow-50 rounded-xl border border-transparent hover:border-yellow-300 transition-all duration-150 shadow-sm"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-md">
          <FaUser className="text-white text-lg" />
        </div>
        <div className="text-left">
          <div className="text-sm font-semibold text-gray-900">{user.username}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </button>

      {/* User Dropdown Menu */}
      {isUserMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-2xl rounded-2xl z-40 border-t-4 border-yellow-300 pt-3 pb-3">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-sm font-semibold text-gray-900">{user.username}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
          
          <ul className="py-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <FaUser className="text-gray-400" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                onClick={() => setIsUserMenuOpen(false)}
              >
                <FaCog className="text-gray-400" />
                Settings
              </Link>
            </li>
            <li className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full transition-colors"
              >
                <FaSignOutAlt className="text-red-400" />
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

// Mobile User Section Component
function MobileUserSection({ user, setIsMenuOpen }) {
  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
  };

  if (!user) {
    return (
      <div className="border-t pt-4 space-y-4">
        <Link
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2"
          href="/signin"
        >
          <span className="bg-white rounded-full p-2 shadow">
            <img
              className="object-cover h-5 w-5"
              src="/static/img/icon-login.png"
              alt="login"
            />
          </span>
          Login
        </Link>
        <Link
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2"
          href="/signup"
        >
          <span className="bg-white rounded-full p-2 shadow">
            <img
              className="object-cover h-5 w-5"
              src="/static/img/icon-register.png"
              alt="register"
            />
          </span>
          Create Account
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t pt-4 space-y-4">
      <div className="flex items-center gap-3 px-4 py-3 bg-yellow-50 rounded-xl">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
          <FaUser className="text-white text-lg" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{user.username}</div>
          <div className="text-xs text-gray-500">{user.email}</div>
        </div>
      </div>
      
      <Link
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2"
        href="/dashboard"
      >
        <FaUser className="text-gray-400" />
        Dashboard
      </Link>
      <Link
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center gap-2"
        href="/profile"
      >
        <FaCog className="text-gray-400" />
        Settings
      </Link>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 text-red-600 w-full"
      >
        <FaSignOutAlt className="text-red-400" />
        Sign Out
      </button>
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    const userData = getUser();
    setUser(userData);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();

    // Listen for custom auth events
    const handleLogin = (event) => {
      console.log('Login event received:', event.detail);
      setUser(event.detail.user);
      setIsLoading(false);
    };

    const handleLogout = () => {
      console.log('Logout event received');
      setUser(null);
      setIsUserMenuOpen(false);
    };

    // Add event listeners
    window.addEventListener(AUTH_EVENTS.LOGIN, handleLogin);
    window.addEventListener(AUTH_EVENTS.LOGOUT, handleLogout);

    // Cleanup
    return () => {
      window.removeEventListener(AUTH_EVENTS.LOGIN, handleLogin);
      window.removeEventListener(AUTH_EVENTS.LOGOUT, handleLogout);
    };
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  return (
    <div id="Header" className="relative z-50">
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
          <ul className="hidden md:flex items-center gap-12 ml-16 text-black text-lg font-bold uppercase tracking-wide">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  className="px-3 py-2 font-bold text-black text-lg uppercase tracking-wider flex flex-col items-center group/nav"
                  aria-label="nav-item"
                  href={link.href}
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-yellow-400 scale-x-0 group-hover/nav:scale-x-100 transition-transform origin-left duration-200" />
                  </span>
                </Link>
                {/* Sublinks dropdown with fade+slide, border-yellow, shadow, rounded-xl, centered */}
                <ul
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-0 w-60 bg-white shadow-2xl rounded-2xl z-40 text-black border-t-4 border-yellow-300 pt-3 pb-3 flex flex-col items-center opacity-0 group-hover:opacity-100 group-hover:translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-200"
                  style={{ minWidth: 220 }}
                >
                  {link.subLinks.map((sub) => (
                    <li key={sub.name} className="w-full flex justify-center">
                      <Link
                        className="block px-4 py-2 text-base text-center rounded-xl transition-all duration-150 hover:bg-yellow-100 hover:text-yellow-600 hover:scale-105"
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
          <UserLoginSection 
            user={user} 
            isUserMenuOpen={isUserMenuOpen} 
            setIsUserMenuOpen={setIsUserMenuOpen} 
          />
          <a href="#" className="relative group ml-4">
            <div className="btn-wrap relative z-10 border-2 border-yellow-400 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
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
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.name}>
              <h3 className="font-bold text-lg mb-2 uppercase tracking-wider">{link.name}</h3>
              <ul className="space-y-2 pl-4 border-l-2 border-yellow-300">
                {link.subLinks.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      onClick={() => setIsMenuOpen(false)}
                      className="block hover:text-yellow-600 hover:scale-105 transition-all"
                      href={sub.href}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <MobileUserSection user={user} setIsMenuOpen={setIsMenuOpen} />
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
