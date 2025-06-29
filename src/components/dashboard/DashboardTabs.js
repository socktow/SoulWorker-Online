"use client";
import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { label: 'Overview', path: '/dashboard/main' },
  { label: 'N-Coin History', path: '/dashboard/coin-purchase' },
  { label: 'My Inquiry', path: '/dashboard/inquiry' },
  { label: 'Forum Activities', path: '/dashboard/forum-activity' },
  // { label: 'Coin Charge', path: '/dashboard/coin-charge' }, // Nếu cần thêm tab này
];

export default function DashboardTabs() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-0">
      {tabs.map((tab, idx) => {
        const isActive = pathname === tab.path || (tab.path === '/dashboard/main' && pathname === '/dashboard');
        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`relative px-12 py-5 text-lg font-semibold border border-gray-200 border-b-0 focus:outline-none transition-colors
              ${isActive ? 'bg-yellow-400 text-black z-10' : 'bg-white text-gray-600 hover:bg-yellow-50'}
              ${idx === 0 ? 'rounded-tl-lg' : ''}
              ${idx === tabs.length - 1 ? 'rounded-tr-lg' : ''}
            `}
            style={{
              marginRight: '-1px',
              clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)',
              minWidth: 200,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
} 