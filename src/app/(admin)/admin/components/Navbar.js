'use client';

import {
  NotificationOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  MessageOutlined,
  TagsOutlined,
  ToolOutlined,
  UserOutlined,
  CreditCardOutlined,
  SendOutlined,
  LockOutlined,
  ShopOutlined,
  GiftOutlined,
  EditOutlined,
  OrderedListOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  BlockOutlined,
  DownOutlined,
} from '@ant-design/icons';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const sections = [
  {
    label: 'NEWS',
    icon: <NotificationOutlined />,
    items: [
      { title: 'All', path: '/admin/news/all', icon: <FileTextOutlined /> },
      { title: 'Notice', path: '/admin/news/notice', icon: <NotificationOutlined /> },
      { title: 'Maintenance', path: '/admin/news/maintenance', icon: <ToolOutlined /> },
      { title: 'Update', path: '/admin/news/update', icon: <SyncOutlined /> },
      { title: 'Shop', path: '/admin/news/shop', icon: <ShopOutlined /> },
      { title: 'Event', path: '/admin/news/event', icon: <TagsOutlined /> },
      { title: 'GM Video', path: '/admin/news/video', icon: <VideoCameraOutlined /> },
    ],
  },
  {
    label: 'FORUM',
    icon: <MessageOutlined />,
    items: [
      { title: 'All', path: '/admin/forum/all', icon: <MessageOutlined /> },
      { title: 'Discussion', path: '/admin/forum/discussion', icon: <FileTextOutlined /> },
      { title: 'Game Tips', path: '/admin/forum/game-tips', icon: <ToolOutlined /> },
      { title: 'Q&A', path: '/admin/forum/q-a', icon: <MessageOutlined /> },
      { title: 'ArtMedia', path: '/admin/forum/artmedia', icon: <VideoCameraOutlined /> },
    ],
  },
  {
    label: 'SUPPORT',
    icon: <GiftOutlined />,
    items: [
      { title: 'Ticket - All', path: '/admin/support/ticket/all', icon: <OrderedListOutlined /> },
      { title: 'Ticket - Processing', path: '/admin/support/ticket/processing', icon: <SyncOutlined /> },
      { title: 'Ticket - Done', path: '/admin/support/ticket/done', icon: <CheckCircleOutlined /> },
      { title: 'Giftcode List', path: '/admin/support/giftcode/list', icon: <GiftOutlined /> },
      { title: 'Giftcode Create', path: '/admin/support/giftcode/create', icon: <EditOutlined /> },
      { title: 'Giftcode Log', path: '/admin/support/giftcode/log', icon: <FileTextOutlined /> },
    ],
  },
  {
    label: 'ACCOUNT',
    icon: <UserOutlined />,
    items: [
      { title: 'List Account', path: '/admin/account/list', icon: <UserOutlined /> },
      { title: 'Edit Account', path: '/admin/account/edit', icon: <EditOutlined /> },
      { title: 'Ban Account', path: '/admin/account/ban', icon: <LockOutlined /> },
    ],
  },
  {
    label: 'PAYMENT',
    icon: <CreditCardOutlined />,
    items: [
      { title: 'Rate Edit', path: '/admin/payment/rate', icon: <CreditCardOutlined /> },
      { title: 'Check Log', path: '/admin/payment/log', icon: <FileTextOutlined /> },
    ],
  },
  {
    label: 'GAMESERVER',
    icon: <SendOutlined />,
    items: [
      { title: 'Send Mail', path: '/admin/server/send-mail', icon: <SendOutlined /> },
      { title: 'Ban Account', path: '/admin/server/ban', icon: <LockOutlined /> },
      { title: 'Giftcode Ingame - List', path: '/admin/server/giftcode/list', icon: <GiftOutlined /> },
      { title: 'Giftcode Ingame - Create', path: '/admin/server/giftcode/create', icon: <EditOutlined /> },
      { title: 'Giftcode Ingame - Log', path: '/admin/server/giftcode/log', icon: <FileTextOutlined /> },
      { title: 'Events Server', path: '/admin/server/events', icon: <TagsOutlined /> },
      { title: 'Block IP', path: '/admin/server/block-ip', icon: <BlockOutlined /> },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    const initialOpen = {};
    sections.forEach((section) => {
      if (section.items.some((item) => pathname.startsWith(item.path))) {
        initialOpen[section.label] = true;
      }
    });
    setOpenSections(initialOpen);
  }, [pathname]);

  const toggleSection = (label) => {
    setOpenSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isActive = (path) => pathname === path;

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col shadow-xl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">SW</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">SoulWorker</h1>
            <p className="text-gray-400 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {sections.map((section) => (
          <div key={section.label}>
            <button
              onClick={() => toggleSection(section.label)}
              className="w-full flex justify-between items-center px-4 py-2 rounded-md text-left text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              <div className="flex items-center space-x-2">
                {section.icon}
                <span className="font-medium">{section.label}</span>
              </div>
              <DownOutlined
                className={`transition-transform duration-200 ${
                  openSections[section.label] ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openSections[section.label] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pl-8 mt-2 space-y-1">
                {section.items.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <div
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm cursor-pointer transition
                        ${
                          isActive(item.path)
                            ? 'bg-blue-600 text-white border-l-4 border-white'
                            : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
