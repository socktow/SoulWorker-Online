'use client';

import {
  AppstoreOutlined,
  GiftOutlined,
  LockOutlined,
  ShopOutlined,
  UserOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  DesktopOutlined,
  BookOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardOutlined className="text-lg" />,
  },
  {
    title: 'Tiện ích',
    items: [
      { title: 'Thông báo', path: '/admin/notice', icon: <FileTextOutlined /> },
      { title: 'Server', path: '/admin/server', icon: <DesktopOutlined /> },
      { title: 'Version', path: '/admin/version', icon: <FileTextOutlined /> },
      { title: 'Giftcode', path: '/admin/giftcode', icon: <GiftOutlined /> },
      { title: 'Khóa IP', path: '/admin/lock-ip', icon: <LockOutlined /> },
      { title: 'Webshop', path: '/admin/webshop', icon: <ShopOutlined /> },
    ],
  },
  {
    title: 'Thông tin',
    items: [
      { title: 'Tài khoản', path: '/admin/account', icon: <UserOutlined /> },
      { title: 'Payment', path: '/admin/payment', icon: <CreditCardOutlined /> },
      { title: 'Thẻ nạp', path: '/admin/card', icon: <CreditCardOutlined /> },
    ],
  },
  {
    title: 'Collections',
    items: [
      { title: 'Post (25)', path: '/admin/post', icon: <BookOutlined /> },
      { title: 'User (1)', path: '/admin/user', icon: <UserOutlined /> },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState(['Dashboard']);

  const toggleSection = (sectionTitle) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(item => item !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SW</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">SoulWorker</h1>
            <p className="text-gray-400 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.path ? (
              // Single menu item
              <Link href={item.path}>
                <div className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
                  ${isActive(item.path) 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}>
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
              </Link>
            ) : (
              // Menu section with sub-items
              <div>
                <button
                  onClick={() => toggleSection(item.title)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                    ${expandedSections.includes(item.title) 
                      ? 'bg-gray-700 text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <SettingOutlined className="text-lg" />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedSections.includes(item.title) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSections.includes(item.title) && (
                  <div className="mt-2 ml-4 space-y-1">
                    {item.items.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.path}>
                        <div className={`
                          flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer
                          ${isActive(subItem.path) 
                            ? 'bg-blue-600 text-white shadow-lg' 
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                          }
                        `}>
                          {subItem.icon}
                          <span className="text-sm">{subItem.title}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer transition-all duration-200">
          <LogoutOutlined className="text-lg" />
          <span className="font-medium">Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}
