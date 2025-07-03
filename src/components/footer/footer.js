"use client";
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTwitch,
  FaDiscord,
  FaTiktok,
} from "react-icons/fa";

const socialIcons = [
  { name: "Facebook", icon: <FaFacebook /> },
  { name: "Twitter", icon: <FaTwitter /> },
  { name: "YouTube", icon: <FaYoutube /> },
  { name: "Twitch", icon: <FaTwitch /> },
  { name: "Discord", icon: <FaDiscord /> },
  { name: "TikTok", icon: <FaTiktok /> },
];

const navLinks = ["Home", "About", "Support", "Privacy", "Terms"];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-10 pb-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">

        {/* Logo + Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <img src="/static/img/main_logo.png" alt="Logo" className="h-12" />
          <div className="flex gap-4">
            {socialIcons.map((item) => (
              <button
                key={item.name}
                aria-label={item.name}
                className="text-xl hover:text-white transition-colors duration-300"
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-3 text-sm">
          {navLinks.map((text, idx) => (
            <button
              key={idx}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              {text}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4" />

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
