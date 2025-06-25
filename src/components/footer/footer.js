import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTwitch,
  FaDiscord,
  FaTiktok,
} from "react-icons/fa";

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebook className="w-6 h-6" />,
    href: "https://www.facebook.com/elsword",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="w-6 h-6" />,
    href: "https://x.com/elsword",
  },
  {
    name: "Youtube",
    icon: <FaYoutube className="w-6 h-6" />,
    href: "https://www.youtube.com/user/ElswordUS",
  },
  {
    name: "Twitch",
    icon: <FaTwitch className="w-6 h-6" />,
    href: "https://www.twitch.tv/elsword",
  },
  {
    name: "Discord",
    icon: <FaDiscord className="w-6 h-6" />,
    href: "https://discord.com/invite/Elsword",
  },
  {
    name: "TikTok",
    icon: <FaTiktok className="w-6 h-6" />,
    href: "https://www.tiktok.com/@officialelsword",
  },
];

const footerNavLinks = [
  { name: "Your Account", href: "https://my.koggames.com/" },
  { name: "About", href: "/game/" },
  { name: "Support", href: "https://my.koggames.com/support" },
  { name: "Policies & Agreements", href: "/privacy-policy/" },
];

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-10">
        {/* Top section: Logo and Social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <Link href="/home-page">
            <img src="/static/img/main_logo.png" alt="logo" className="h-12 w-auto" />
            </Link>
          </div>
          <div>
            <ul className="flex gap-5">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.icon}
                    <span className="sr-only">{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Middle section: Navigation */}
        <div className="flex justify-center mb-6">
          <ul
            id="menu-footer-menu"
            className="flex flex-wrap justify-center gap-x-8 gap-y-2"
          >
            {footerNavLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom section: Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>Copyright © 2025 KOG Games Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 