import React from 'react';
import { 
  Home, 
  Map, 
  FileText, 
  BookOpen, 
  Calendar, 
  Clock, 
  Settings, 
  X,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isAdmin, 
  isOpenMobile, 
  setIsOpenMobile 
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'roadmap', label: 'Lộ trình học', icon: Map },
    { id: 'documents', label: 'Tài liệu', icon: FileText },
    { id: 'notes', label: 'Ghi chú', icon: BookOpen },
    { id: 'schedule', label: 'Lịch học', icon: Calendar },
    { id: 'pomodoro', label: 'Pomodoro', icon: Clock },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  const SidebarContent = () => (
    <div id="sidebar-container" className="flex flex-col h-full bg-[#FFF0F2] border-r border-[#FFE1E5] text-slate-800">
      {/* Branding Header Area */}
      <div id="sidebar-branding" className="p-6 border-b border-[#FFE1E5]">
        <div className="flex items-center justify-between">
          <span className="font-serif text-2xl font-bold text-[#800F2F]">
            Hương Học Lại
          </span>
          {/* Mobile close button inside the sidebar drawer */}
          <button 
            id="mobile-close-btn"
            onClick={() => setIsOpenMobile(false)}
            className="md:hidden p-1.5 rounded-full hover:bg-[#FFE1E5] text-[#800F2F] transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono text-slate-500 tracking-tight">
            {isAdmin ? 'Chế độ Admin' : 'Chế độ Người xem'}
          </span>
        </div>
      </div>

      {/* Navigation Links body */}
      <nav id="sidebar-navigation" className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              id={`sidebar-item-${item.id}`}
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium tracking-wide transition-all duration-300 ${
                isActive 
                  ? 'bg-[#800F2F] text-white shadow-md shadow-[#800f2f]/10 translate-x-1' 
                  : 'text-slate-600 hover:bg-[#FFE5E8] hover:text-[#800F2F]'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Signature Slogan Footer */}
      <div id="sidebar-slogan" className="p-6 border-t border-[#FFE1E5] bg-[#FFF5F7]">
        <p className="text-xs italic text-[#A71E40] font-medium text-center tracking-wide block">
          Học vì mình của tương lai ✦
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (fixed left side) */}
      <aside id="desktop-sidebar" className="hidden md:block w-64 h-screen fixed top-0 left-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (swipe/fade in) */}
      <AnimatePresence>
        {isOpenMobile && (
          <div id="mobile-sidebar-overlay" className="md:hidden fixed inset-0 z-40 flex">
            {/* Dark glass backdrop element */}
            <motion.div
              id="mobile-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setIsOpenMobile(false)}
            />
            {/* Drawout sidebar card element */}
            <motion.div
              id="mobile-sidebar-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-64 max-w-xs h-full z-10"
            >
              <SidebarContent />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
