"use client";

export default function SiteLayout({ children }) {
  return (
    <div className="flex justify-center items-center w-full px-2">
      <main className="w-full max-w-7xl mx-auto my-4">{children}</main>
    </div>
  );
} 