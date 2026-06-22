import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Clock, BookOpen, Clock3, Check, Eye, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { StudySchedule } from '../types';
import { Lesson } from '../data/defaultLessons';

interface ScheduleProps {
  lessons: Lesson[];
  schedules: StudySchedule[];
  onAddSchedule: (event: StudySchedule) => void;
  onDeleteSchedule: (eventId: string) => void;
  onToggleScheduleCompleted: (eventId: string) => void;
  isAdmin: boolean;
  triggerUnlockModal: () => void;
}

export default function Schedule({
  lessons,
  schedules,
  onAddSchedule,
  onDeleteSchedule,
  onToggleScheduleCompleted,
  isAdmin,
  triggerUnlockModal
}: ScheduleProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formSubject, setFormSubject] = useState<'Toán' | 'Hóa' | 'Sinh' | 'Lý' | 'Khác'>('Toán');
  const [formLessonId, setFormLessonId] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formStart, setFormStart] = useState('08:00');
  const [formEnd, setFormEnd] = useState('09:30');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month navigation helpers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate grid days for currently selected Month/Year
  const daysInMonth = React.useMemo(() => {
    // Total days in target month
    const totalDays = new Date(year, month + 1, 0).getDate();
    // Weekday of 1st day of target month (0 = Sunday, 1 = Monday ...)
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    // Normalize index: Monday as first column (index 0), Sunday as last (index 6)
    // In Javascript standard Sunday=0, Monday=1, Saturday=6
    const adjustedFirstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const days: { dateStr: string; dayNum: number; isCurrentMonth: boolean }[] = [];

    // Prepend empty cells or previous month tail days
    const totalDaysPrevMonth = new Date(year, month, 0).getDate();
    for (let i = adjustedFirstDayIndex - 1; i >= 0; i--) {
      const d = totalDaysPrevMonth - i;
      const m = month === 0 ? 11 : month - 1;
      const y = month === 0 ? year - 1 : year;
      const formattedMonth = String(m + 1).padStart(2, '0');
      const formattedDay = String(d).padStart(2, '0');
      days.push({
        dateStr: `${y}-${formattedMonth}-${formattedDay}`,
        dayNum: d,
        isCurrentMonth: false,
      });
    }

    // Append current month days
    for (let d = 1; d <= totalDays; d++) {
      const formattedMonth = String(month + 1).padStart(2, '0');
      const formattedDay = String(d).padStart(2, '0');
      days.push({
        dateStr: `${year}-${formattedMonth}-${formattedDay}`,
        dayNum: d,
        isCurrentMonth: true,
      });
    }

    // Append trailing days to reach full grid of multiple of 7 rows
    const totalGridSize = days.length <= 35 ? 35 : 42;
    const trailingCount = totalGridSize - days.length;
    for (let d = 1; d <= trailingCount; d++) {
      const m = month === 11 ? 0 : month + 1;
      const y = month === 11 ? year + 1 : year;
      const formattedMonth = String(m + 1).padStart(2, '0');
      const formattedDay = String(d).padStart(2, '0');
      days.push({
        dateStr: `${y}-${formattedMonth}-${formattedDay}`,
        dayNum: d,
        isCurrentMonth: false,
      });
    }

    return days;
  }, [year, month]);

  // Click on any specific calendar grid day cell to invoke schedule insertion
  const handleCellClick = (dateStr: string) => {
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }
    setFormDate(dateStr);
    
    // Auto populate lesson and title to save time
    if (lessons.length > 0) {
      const firstLesson = lessons[0];
      setFormLessonId(firstLesson.id);
      setFormSubject(firstLesson.subject);
      setFormTitle(`Học ôn bài: ${firstLesson.title}`);
    } else {
      setFormSubject('Khác');
      setFormTitle('Luyện ôn tập chuyên sâu');
    }
    
    setIsFormOpen(true);
  };

  // Sync lesson select to fill corresponding subject type optionally
  const handleLessonChange = (selectedId: string) => {
    setFormLessonId(selectedId);
    if (selectedId === 'none') {
      setFormSubject('Khác');
      return;
    }
    const match = lessons.find(l => l.id === selectedId);
    if (match) {
      setFormSubject(match.subject);
      setFormTitle(`Học ôn bài: ${match.title}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }

    if (!formTitle.trim()) {
      alert('Vui lòng điền nội dung buổi học!');
      return;
    }
    if (!formDate) {
      alert('Vui lòng chọn một ngày trên lưới lịch học!');
      return;
    }

    const newEvent: StudySchedule = {
      id: `sch-${Date.now()}`,
      title: formTitle.trim(),
      subject: formSubject,
      lessonId: formLessonId !== 'none' && formLessonId !== '' ? formLessonId : undefined,
      date: formDate,
      startTime: formStart,
      endTime: formEnd,
      completed: false
    };

    onAddSchedule(newEvent);
    setIsFormOpen(false);
    
    // Reset states
    setFormTitle('');
    setFormLessonId('');
  };

  // Return the styling background matching subject configuration
  const getSubjectColorStyles = (subject: string, completed?: boolean) => {
    const isMuted = completed;
    if (isMuted) {
      return 'bg-zinc-900/60 border-zinc-800 text-zinc-500 opacity-40 line-through';
    }
    switch (subject) {
      case 'Toán': return 'bg-rose-950/50 border-rose-900/70 text-rose-300';
      case 'Hóa': return 'bg-amber-950/50 border-amber-900/70 text-amber-300';
      case 'Sinh': return 'bg-emerald-950/50 border-emerald-900/70 text-emerald-300';
      case 'Lý': return 'bg-sky-950/50 border-sky-900/70 text-sky-300';
      default: return 'bg-zinc-800 border-zinc-700 text-zinc-200';
    }
  };

  const weekdaysHeader = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const monthNames = [
    'Tháng Giêng', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 
    'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 
    'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Chạp'
  ];

  return (
    <div id="schedule-view" className="space-y-6 font-sans text-slate-800">
      
      {/* 1. COMPACT DASHBOARD MENU HEADER (Light Theme Rose accents) */}
      <div id="schedule-header" className="bg-[#FFF5F7] p-6 rounded-3xl border border-[#FFE1E5] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-xl font-black text-[#800F2F]">Lịch Học Lưới Tháng Cá Nhân</h2>
          <p className="text-xs text-slate-500 mt-1">
            Bấm trực tiếp vào các ô ngày để phân phối chuyên mục ôn thi. Tích hoàn thành để buổi học chuyển mờ.
          </p>
        </div>

        {/* Dynamic Controls Nav */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#FFE1E5] text-xs">
            <button 
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-[#FFF0F2] rounded-lg text-slate-400 hover:text-[#800F2F] transition-all cursor-pointer"
              title="Tháng trước"
            >
              <ArrowLeft size={14} />
            </button>
            <span className="font-bold px-3 text-slate-700">
              {monthNames[month]} {year}
            </span>
            <button 
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-[#FFF0F2] rounded-lg text-slate-400 hover:text-[#800F2F] transition-all cursor-pointer"
              title="Tháng sau"
            >
              <ArrowRight size={14} />
            </button>
          </div>

          {isAdmin ? (
            <button
              onClick={() => {
                const todayStr = new Date().toISOString().split('T')[0];
                handleCellClick(todayStr);
              }}
              className="flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-[#800F2F] hover:bg-[#A71E40] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus size={14} />
              Thêm lịch học
            </button>
          ) : (
            <button
              onClick={triggerUnlockModal}
              className="flex items-center gap-1 px-4 py-2.5 rounded-2xl bg-[#FFF0F2] border border-[#FFE1E5] text-[#800F2F] hover:bg-[#A71E40] hover:text-white text-xs font-bold transition-all cursor-pointer"
            >
              <LockModeIcon className="mr-1" />
              Lên lịch (PIN)
            </button>
          )}
        </div>
      </div>

      {/* 2. DYNAMIC INPUT FORM COLLAPSIBLE PANEL */}
      {isFormOpen && (
        <div id="add-schedule-form-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsFormOpen(false)} 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
          />
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-white border border-[#FFE1E5] p-6 rounded-3xl max-w-lg w-full shadow-2xl animate-popIn space-y-4 z-10 text-xs text-slate-800"
          >
            <div className="flex justify-between items-center pb-2 border-b border-rose-100">
              <h4 className="font-serif font-black text-sm text-[#800F2F] flex items-center gap-1.5">
                <Calendar size={15} /> Thêm lịch cho ngày {formDate}
              </h4>
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-[#800F2F] font-bold p-1 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5">
              
              {/* SGK Lessons dropdown picker */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#800F2F] mb-1">
                  Chọn trực tiếp bài học từ lộ trình (SGK)
                </label>
                <select
                  value={formLessonId}
                  onChange={(e) => handleLessonChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#800F2F]"
                >
                  <option value="none">-- Tự điền nội dung khác --</option>
                  {lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id} className="bg-white">
                      [{lesson.subject}] {lesson.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-405 mb-1">
                  Nội dung buổi học cụ thể
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Làm bài tập tự luyện Este - Lipit lớp 12"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Specific subject tag */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-405 mb-1">
                    Nhãn Môn học
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none"
                  >
                    <option value="Toán">Toán</option>
                    <option value="Hóa">Hóa</option>
                    <option value="Sinh">Sinh</option>
                    <option value="Lý">Lý</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                {/* Specific Date set */}
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-405 mb-1">
                    Ngày học
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] text-center font-mono"
                  />
                </div>
              </div>

              {/* Study Hours selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-405 mb-1 flex items-center gap-1">
                    <Clock3 size={11} className="text-slate-400" /> Bắt đầu
                  </label>
                  <input
                    type="time"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none text-center font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-405 mb-1 flex items-center gap-1">
                    <Clock3 size={11} className="text-slate-400" /> Kết thúc
                  </label>
                  <input
                    type="time"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none text-center font-mono"
                  />
                </div>
              </div>

            </div>

            <div className="flex gap-2 justify-end pt-3.5 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition-all cursor-pointer font-bold"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5.5 py-2 rounded-xl bg-[#800F2F] hover:bg-[#A71E40] text-white font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Lưu Học Lịch
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. CORE GRID MONTHLY CALENDAR GRID SHEET (Beautiful Light-Mode grid container) */}
      <div id="monthly-scheduler-grid" className="bg-white border border-[#FFE1E5] rounded-3xl p-4 md:p-6 shadow-sm overflow-hidden">
        
        {/* Weekday headers row */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center">
          {weekdaysHeader.map((header) => {
            const isWeekend = header === 'CN';
            return (
              <span 
                key={header} 
                className={`text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase pb-1.5 border-b border-slate-100 ${
                  isWeekend ? 'text-[#800F2F]' : 'text-slate-400'
                }`}
              >
                {header}
              </span>
            );
          })}
        </div>

        {/* Days grid boxes */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {daysInMonth.map((cell, index) => {
            // Find active study schedules set to exactly this date
            const daySchedules = schedules.filter(s => s.date === cell.dateStr);
            daySchedules.sort((a, b) => a.startTime.localeCompare(b.startTime));

            // Is this cell representing exactly today's date?
            const isToday = cell.dateStr === new Date().toISOString().split('T')[0];

            return (
              <div
                key={`${cell.dateStr}-${index}`}
                id={`calendar-cell-${cell.dateStr}`}
                onClick={() => handleCellClick(cell.dateStr)}
                className={`min-h-[95px] md:min-h-[130px] p-1.5 md:p-2.5 rounded-2xl border flex flex-col gap-1 md:gap-1.5 transition-all text-left overflow-hidden relative cursor-pointer group ${
                  cell.isCurrentMonth
                    ? isToday
                      ? 'bg-[#FFF0F2] border-[#800F2F] shadow-sm ring-1 ring-[#800F2F]/30'
                      : 'bg-white border-slate-100 hover:border-rose-200 hover:bg-[#FFF8F9]/40'
                    : 'bg-slate-50/40 border-transparent opacity-30 hover:opacity-50'
                }`}
              >
                {/* Day label */}
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-black ${
                    isToday ? 'text-[#800F2F] font-extrabold scale-110' : 'text-slate-500'
                  }`}>
                    {cell.dayNum}
                  </span>
                  {cell.isCurrentMonth && daySchedules.length > 0 && (
                    <span className="text-[8px] font-mono font-bold px-1 rounded-sm bg-[#FFF0F2] text-[#800F2F] border border-[#FFE1E5] hidden xs:inline">
                      {daySchedules.length}
                    </span>
                  )}
                </div>

                {/* Scheduled sessions within day cell list */}
                <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin max-h-[65px] md:max-h-[95px]">
                  {daySchedules.map((evt) => {
                    const styleClasses = getSubjectColorStyles(evt.subject, evt.completed);

                    return (
                      <div
                        key={evt.id}
                        onClick={(e) => e.stopPropagation()} // Avoid triggering cell click event
                        className={`p-1 md:p-1.5 rounded-lg border text-[9px] md:text-[10px] leading-tight flex flex-col gap-0.5 relative group/item transition-all ${styleClasses}`}
                      >
                        <div className="flex items-start justify-between gap-1 pr-1.5">
                          <span 
                            className="font-bold truncate select-all flex-1" 
                            title={evt.title}
                          >
                            {evt.title}
                          </span>
                          
                          {/* Completed status check trigger */}
                          <button
                            onClick={() => onToggleScheduleCompleted(evt.id)}
                            className="w-3.5 h-3.5 rounded bg-white border border-slate-205 flex items-center justify-center text-[#800F2F] hover:border-[#800F2F] flex-shrink-0 cursor-pointer"
                            title={evt.completed ? 'Đánh dấu chưa học' : 'Hoàn thành buổi học'}
                          >
                            {evt.completed && <Check size={8} className="text-[#800F2F] stroke-[4px]" />}
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[8px] opacity-75 font-mono mt-0.5">
                          <span className="font-semibold">{evt.startTime}</span>
                          
                          {/* Trash button (Fully functional, easily clickable for everyone with unlock trigger) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isAdmin) {
                                triggerUnlockModal();
                                return;
                              }
                              if (confirm('Bạn muốn xóa buổi học này khỏi lịch tháng?')) {
                                onDeleteSchedule(evt.id);
                              }
                            }}
                            className="text-slate-400 hover:text-red-600 p-0.5 rounded transition-all flex items-center justify-center cursor-pointer"
                            title="Xóa buổi học"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Prompt plus icon show on hover */}
                <div className="absolute right-1.5 bottom-1.5 opacity-0 group-hover:opacity-100 transition-all pointer-events-none hidden md:block">
                  <Plus size={10} className="text-[#800F2F] bg-[#FFF0F2] p-0.5 rounded-full" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Calendar Footer guides */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between text-[10px] text-slate-400">
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="font-mono">Môn học:</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500" /> Toán</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> Hóa</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Sinh</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-sky-500" /> Lý</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-slate-500" /> Khác</span>
          </div>

          <div className="flex items-center gap-1">
            <Check size={10} className="text-[#800F2F]" />
            <span>Tích hộp vuông để hoàn thành bài và chuyển mờ.</span>
          </div>
        </div>

      </div>

    </div>
  );
}

// Minimal customized SVG for lock mode indicator
function LockModeIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={`w-3.5 h-3.5 ${className}`} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}
