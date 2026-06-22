import React, { useState, useEffect } from 'react';
import { Menu, Lock, Unlock, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  setIsOpenMobile: (open: boolean) => void;
  triggerUnlockModal: () => void;
  lockAdminMode: () => void;
}

export default function Header({ 
  isAdmin, 
  setIsOpenMobile, 
  triggerUnlockModal,
  lockAdminMode
}: HeaderProps) {
  const [greeting, setGreeting] = useState('Chào buổi học tốt, Hương ✦');

  useEffect(() => {
    const updateGreeting = () => {
      const hours = new Date().getHours();
      if (hours >= 5 && hours < 11) {
        setGreeting('Chào buổi sáng, Hương ✦');
      } else if (hours >= 11 && hours < 17) {
        setGreeting('Chào buổi chiều, Hương ✦');
      } else if (hours >= 17 && hours < 22) {
        setGreeting('Chào buổi tối, Hương ✦');
      } else {
        setGreeting('Hương học khuya muộn rồi ✦');
      }
    };
    
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header id="app-header" className="bg-white border-b border-[#FFE1E5] px-6 py-5 sticky top-0 z-10 flex items-center justify-between">
      {/* Left side: Hamburger (on mobile) & Dynamic Greeting Title */}
      <div id="header-greeting-area" className="flex items-center gap-4">
        {/* Toggle mobile menu button */}
        <button
          id="mobile-sidebar-hamburger"
          onClick={() => setIsOpenMobile(true)}
          className="md:hidden p-2 rounded-xl border border-[#FFE1E5] bg-[#FFF0F2] text-[#800F2F] hover:bg-[#FFE1E5] active:scale-95 transition-all"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 id="header-greeting" className="text-xl md:text-2xl font-serif font-bold text-[#800F2F] leading-tight">
            {greeting}
          </h1>
          <p id="header-sub" className="text-xs md:text-sm text-slate-500 mt-1 font-medium italic">
            Mỗi bài học là một bước tới gần ngày bạn khoác áo blouse. Hôm nay học gì nào?
          </p>
        </div>
      </div>

      {/* Right side: Badge status & Secret lock trigger */}
      <div id="header-badge-control" className="flex items-center gap-2.5">
        <span 
          id="thpt-2028-badge"
          className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#800F2F] to-[#A71E40] text-white shadow-sm shadow-[#800F2F]/20"
        >
          Tốt nghiệp THPT 2028 🎓
        </span>

        {/* Lock / Unlock administrative access button trigger */}
        {isAdmin ? (
          <button
            id="secret-lock-admin-btn"
            onClick={lockAdminMode}
            title="Đang ở chế độ Admin - Nhấp để khóa lại"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-all cursor-pointer"
          >
            <Unlock size={14} className="text-emerald-500 animate-pulse" />
            <span className="hidden xs:inline">Admin</span>
          </button>
        ) : (
          <button
            id="secret-unlock-admin-btn"
            onClick={triggerUnlockModal}
            title="Nhập mã PIN để mở khóa quyền Admin"
            className="p-2 rounded-xl text-slate-400 hover:text-[#800F2F] hover:bg-[#FFF0F2] border border-transparent hover:border-[#FFE1E5] transition-all cursor-pointer"
          >
            <Lock size={16} />
          </button>
        )}
      </div>
    </header>
  );
}
