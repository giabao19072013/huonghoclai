import React from 'react';
import { Phone, Facebook, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="app-footer" className="mt-12 border-t border-[#FFE1E5] py-6 px-6 bg-[#FFFFFD] text-slate-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Left Side: Brand copyrights */}
        <div id="footer-brand" className="flex items-center gap-2">
          <GraduationCap size={18} className="text-[#800F2F]" />
          <span className="text-xs font-semibold tracking-wide text-slate-700">
            Hương Học Lại &copy; {new Date().getFullYear()} — Luyện thi Y khoa ✦
          </span>
        </div>

        {/* Center: Author specific metadata details */}
        <div id="footer-author-links" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <span className="text-slate-600 font-medium">
            Tác giả: <strong className="text-[#800F2F]">Phạm Thúy Kiều Hương</strong>
          </span>
          
          <span className="h-3.5 w-px bg-[#FFE1E5] hidden sm:block" />

          <a 
            id="footer-phone"
            href="tel:0961476872" 
            className="flex items-center gap-1 hover:text-[#800F2F] transition-all font-mono font-medium"
          >
            <Phone size={12} />
            0961476872
          </a>

          <span className="h-3.5 w-px bg-[#FFE1E5] hidden sm:block" />

          <a 
            id="footer-fb"
            href="https://www.facebook.com/kieuhuong0606/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 text-[#800F2F] font-bold hover:underline"
          >
            <Facebook size={12} className="text-blue-600" />
            Facebook ✦
          </a>
        </div>

      </div>
    </footer>
  );
}
