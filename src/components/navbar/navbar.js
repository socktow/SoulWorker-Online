import Link from "next/link";

export default function Navbar() {
  return (
    <div id="Header">
      <div className="flex flex-nowrap justify-between h-20 px-6 border-b bg-white shadow-sm">
        <div className="flex items-center">
          <h1 className="ml-6 mt-1">
            <Link aria-label="logo" href="/home-page">
              <img src="/static/img/main_logo.png" alt="logo" className="h-12 w-auto" />
            </Link>
          </h1>
          <ul className="flex items-center gap-12 ml-16 text-black">
            <li className="relative group">
              <Link className="px-3 py-2 font-semibold hover:text-blue-600 text-black" aria-label="nav-item" href="/news">News</Link>
              <ul className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded hidden group-hover:block z-10 text-black">
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/news?type=0">Latest News</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/news?type=1">Notice</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/news?type=2">Maintenance</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/news?type=3">Updates</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/news?type=4">Shop</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/news?type=5">Event</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/news?type=6">GM Video</Link></li>
              </ul>
            </li>
            <li className="relative group">
              <Link className="px-3 py-2 font-semibold hover:text-blue-600 text-black" aria-label="nav-item" href="/game-introduction">About</Link>
              <ul className="absolute left-0 top-full mt-2 w-40 bg-white shadow-lg rounded hidden group-hover:block z-10 text-black">
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/game-introduction">Game</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/game-guide">Play Guide</Link></li>
              </ul>
            </li>
            <li className="relative group">
              <Link className="px-3 py-2 font-semibold hover:text-blue-600 text-black" aria-label="nav-item" href="/forum/home">Forum</Link>
              <ul className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded hidden group-hover:block z-10 text-black">
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/forum/home">Forum Home</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/forum/discussion">General Discussion</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/forum/game-tips">Game Tips</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/forum/qa">Q & A</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/forum/art-media">Art & Media</Link></li>
              </ul>
            </li>
            <li className="relative group">
              <Link className="px-3 py-2 font-semibold hover:text-blue-600 text-black" aria-label="nav-item" href="/game-download">Download</Link>
              <ul className="absolute left-0 top-full mt-2 w-44 bg-white shadow-lg rounded hidden group-hover:block z-10 text-black">
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/game-download">Game Download</Link></li>
              </ul>
            </li>
            <li className="relative group">
              <Link className="px-3 py-2 font-semibold hover:text-blue-600 text-black" aria-label="nav-item" href="/support/faq">Support</Link>
              <ul className="absolute left-0 top-full mt-2 w-40 bg-white shadow-lg rounded hidden group-hover:block z-10 text-black">
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/support/faq">FAQ</Link></li>
                <li><Link className="block px-4 py-2 hover:bg-gray-100 text-black" href="/support/qna">1:1 Inquiry</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center mr-8 text-black">
            <li>
              <Link className="flex items-center gap-2 px-3 py-2 hover:text-blue-600 text-black" aria-label="nav-item" href="/signin">
                <img className="object-cover h-5 w-5" src="/static/img/icon-login.png" alt="login" />Login
              </Link>
            </li>
            <span className="mx-2 w-px h-6 bg-gray-300"></span>
            <li>
              <Link className="flex items-center gap-2 px-3 py-2 hover:text-blue-600 text-black" aria-label="nav-item" href="/signup">
                <img className="object-cover h-5 w-5" src="/static/img/icon-register.png" alt="register" />Create Account
              </Link>
            </li>
          </ul>
          <a href="#" className="relative group ml-4">
            <div className="btn-wrap relative z-10">
              <img src="/static/img/main_game_txt.png" alt="game start" className="h-8 w-auto" />
            </div>
            <div className="overlay absolute inset-0 z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
              <img src="/static/img/magin_gnb_bg.jpg" alt="bg" className="w-full h-full object-cover rounded" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
} 