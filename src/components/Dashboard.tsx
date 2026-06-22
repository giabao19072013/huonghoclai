import React, { useState, useEffect } from 'react';
import { Play, Map, Calendar as CalendarIcon, ClipboardList, GraduationCap } from 'lucide-react';
import { Lesson } from '../data/defaultLessons';
import { LessonProgress, StudySchedule } from '../types';

interface DashboardProps {
  lessons: Lesson[];
  progress: LessonProgress[];
  schedules: StudySchedule[];
  setActiveTab: (tab: string) => void;
  profileExamDate: string;
  profileGoal: string;
  profileName: string;
  profileExamName: string;
}

export default function Dashboard({ 
  lessons, 
  progress, 
  schedules, 
  setActiveTab,
  profileExamDate,
  profileGoal,
  profileName,
  profileExamName
}: DashboardProps) {
  const [countdownDays, setCountdownDays] = useState(0);
  const [todayString, setTodayString] = useState('');
  const [todaySchedules, setTodaySchedules] = useState<StudySchedule[]>([]);

  // 1. Calculate Exam Countdown Days dynamically based on custom user settings
  useEffect(() => {
    const calculateCountdown = () => {
      const examDateStr = profileExamDate || '2028-06-26';
      const examDate = new Date(`${examDateStr}T00:00:00`);
      const now = new Date();
      
      // Reset hours to capture full days exactly
      const examDateStart = new Date(examDate.getFullYear(), examDate.getMonth(), examDate.getDate());
      const nowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const diffTime = examDateStart.getTime() - nowStart.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setCountdownDays(diffDays > 0 ? diffDays : 0);
    };

    calculateCountdown();
    // Update every hour
    const interval = setInterval(calculateCountdown, 3600000);
    return () => clearInterval(interval);
  }, [profileExamDate]);

  // 2. Fetch today's date formatted in Vietnamese & query today's schedules
  useEffect(() => {
    const daysOfWeekVN = [
      'Chủ Nhật',
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy'
    ];
    
    const now = new Date();
    const dayName = daysOfWeekVN[now.getDay()];
    const dateFormatted = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    
    setTodayString(`${dayName}, Ngày ${dateFormatted}`);

    // Query schedules for today (YYYY-MM-DD)
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const todayISO = `${yyyy}-${mm}-${dd}`;
    const filteredToday = schedules.filter(s => s.date === todayISO);
    
    // Sort today's schedules chronologically
    filteredToday.sort((a, b) => a.startTime.localeCompare(b.startTime));
    setTodaySchedules(filteredToday);

  }, [schedules]);

  // 3. Compute Progress Stats
  const completedLessonsMap = React.useMemo(() => {
    const map: Record<string, boolean> = {};
    progress.forEach(p => {
      if (p.completed) map[p.lessonId] = true;
    });
    return map;
  }, [progress]);

  const totalLessonsCount = lessons.length;
  const completedLessonsCount = lessons.filter(l => completedLessonsMap[l.id]).length;
  const overallPercentage = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  // Compute stats per subject
  const subjectStats = React.useMemo(() => {
    const subjects: ('Toán' | 'Hóa' | 'Sinh' | 'Lý')[] = ['Toán', 'Hóa', 'Sinh', 'Lý'];
    return subjects.map(sub => {
      const subLessons = lessons.filter(l => l.subject === sub);
      const subTotal = subLessons.length;
      const subCompleted = subLessons.filter(l => completedLessonsMap[l.id]).length;
      const percentage = subTotal > 0 ? Math.round((subCompleted / subTotal) * 100) : 0;
      
      let colorClass = 'bg-[#800F2F]';
      let bgLightClass = 'bg-[#FFF0F2]';
      if (sub === 'Hóa') {
        colorClass = 'bg-amber-500';
        bgLightClass = 'bg-amber-50';
      } else if (sub === 'Sinh') {
        colorClass = 'bg-emerald-600';
        bgLightClass = 'bg-emerald-50';
      } else if (sub === 'Lý') {
        colorClass = 'bg-sky-500';
        bgLightClass = 'bg-sky-50';
      }

      return {
        name: sub,
        completed: subCompleted,
        total: subTotal,
        percentage,
        colorClass,
        bgLightClass
      };
    });
  }, [lessons, completedLessonsMap]);

  return (
    <div id="dashboard-view" className="space-y-6">
      
      {/* 1. MAIN COUNTDOWN CARD */}
      <div 
        id="main-countdown-card"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#800F2F] via-[#A71E40] to-[#C9184A] text-white p-6 md:p-8 shadow-lg shadow-[#800F2F]/10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div id="countdown-mesh" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
        
        <div id="countdown-left-stats" className="z-10 text-center md:text-left">
          <span className="text-xs uppercase tracking-widest font-mono text-pink-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            {profileExamName}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3 leading-tight">
            Đếm ngược ngày vinh quang
          </h2>
          <p className="text-sm text-pink-100 mt-2 font-medium max-w-lg flex items-center gap-1.5 justify-center md:justify-start">
            <GraduationCap size={16} />
            Mục tiêu: <span className="font-bold underline decoration-dotted">{profileGoal}</span>
          </p>
          <div className="mt-4 text-xs font-mono text-pink-200">
            Góc học tập của sĩ tử {profileName} 🎯
          </div>
        </div>

        {/* Dynamic Countdown Number */}
        <div id="countdown-right-clock" className="z-10 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-5 md:px-8 text-center min-w-[160px] shadow-inner">
          <div id="countdown-days" className="text-5xl md:text-6xl font-serif font-black tracking-tight text-white drop-shadow-sm">
            {countdownDays}
          </div>
          <div className="text-[11px] font-mono tracking-widest text-pink-100 uppercase mt-1">
            Ngày còn lại
          </div>
        </div>
      </div>

      {/* 2. STATS & GRAPHICS ROW */}
      <div id="dashboard-metrics-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* PROGRESS CARD (7 Columns) */}
        <div id="overall-progress-card" className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#FFE1E5] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#800F2F]">Tiến độ học tập</h3>
              <p className="text-xs text-slate-400 mt-0.5">Tiến trình chuẩn bị kiến thức toàn diện</p>
            </div>
            <span className="text-sm font-semibold text-[#800F2F] bg-[#FFF0F2] px-3 py-1 rounded-xl">
              {completedLessonsCount}/{totalLessonsCount} bài
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 py-2">
            {/* SVG Circular Ring Chart */}
            <div id="progress-circle-chart" className="relative flex-shrink-0 w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90">
                {/* Background circle track */}
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-slate-100 fill-none"
                  strokeWidth="10"
                />
                {/* Foreground circle indicator */}
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-[#800F2F] fill-none transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - overallPercentage / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-800 tracking-tight">{overallPercentage}%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">Đã xong</span>
              </div>
            </div>

            {/* Individual Subjects Progress Bars */}
            <div id="progress-subject-bars" className="flex-1 w-full space-y-3.5">
              {subjectStats.map((sub, index) => (
                <div key={index} id={`subject-progress-${sub.name}`}>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-slate-700">{sub.name}</span>
                    <span className="font-mono text-slate-500">{sub.completed}/{sub.total} bài ({sub.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${sub.colorClass} rounded-full transition-all duration-1000`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TODAY SCHEDULE CARD (5 Columns) */}
        <div id="today-schedule-card" className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#FFE1E5] flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-[#FFF0F2] pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-[#FFF0F2] text-[#800F2F]">
                <CalendarIcon size={16} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#800F2F]">Lịch học hôm nay</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{todayString}</span>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[160px] pr-1 space-y-2.5">
            {todaySchedules.length > 0 ? (
              todaySchedules.map((sch) => {
                let colorBorder = 'border-l-4 border-l-[#800F2F] bg-[#FFF8F9]';
                if (sch.subject === 'Hóa') colorBorder = 'border-l-4 border-l-amber-500 bg-amber-50/30';
                if (sch.subject === 'Sinh') colorBorder = 'border-l-4 border-l-emerald-600 bg-emerald-50/20';
                if (sch.subject === 'Lý') colorBorder = 'border-l-4 border-l-sky-500 bg-sky-50/30';

                return (
                  <div key={sch.id} className={`p-3 rounded-2xl border border-slate-100/80 ${colorBorder} flex justify-between items-center transition-all hover:translate-x-0.5`}>
                    <div id={`schedule-item-detail-${sch.id}`}>
                      <h4 className="text-sm font-semibold text-slate-800 leading-tight truncate max-w-[170px]">{sch.title}</h4>
                      <span className="text-[10px] uppercase font-mono text-slate-400 mt-1 block">{sch.subject}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-600">{sch.startTime} - {sch.endTime}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-6">
                <p className="text-xs text-slate-400">
                  Chưa có buổi học nào hôm nay – thêm vào mục Lịch học nhé.
                </p>
                <button
                  id="go-to-schedule-short"
                  onClick={() => setActiveTab('schedule')}
                  className="mt-3 text-xs font-bold text-[#800F2F] hover:text-[#A71E40] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <CalendarIcon size={12} />
                  Mở lịch ngay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. QUICK START CHANNELS */}
      <div id="quick-start-channels-wrapper" className="bg-white rounded-3xl p-6 border border-[#FFE1E5] shadow-sm">
        <h3 className="font-serif text-base font-bold text-[#800F2F] mb-4">Lối tắt học nhanh</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Channel 1: Pomodoro */}
          <button 
            id="quick-start-pomodoro"
            onClick={() => setActiveTab('pomodoro')}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F2] to-[#FFF5F7] border border-[#FFE1E5] hover:border-[#800F2F] text-left transition-all duration-300 hover:shadow-md active:scale-[0.98] group cursor-pointer animate-none"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-[#FFE1E5] flex items-center justify-center text-[#800F2F] group-hover:scale-105 transition-transform shadow-sm">
              <Play size={20} className="fill-current" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#800F2F]">Vào học 25 phút (Pomodoro)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Một phiên tập trung sâu, học và nghỉ chuẩn khoa học</p>
            </div>
          </button>

          {/* Channel 2: Roadmap */}
          <button 
            id="quick-start-roadmap"
            onClick={() => setActiveTab('roadmap')}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-pink-50/20 border border-slate-100 hover:border-[#800F2F] text-left transition-all duration-300 hover:shadow-md active:scale-[0.98] group cursor-pointer animate-none"
          >
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-150 flex items-center justify-center text-slate-600 group-hover:scale-105 transition-transform shadow-sm">
              <Map size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Tiếp tục lộ trình học</h4>
              <p className="text-xs text-slate-400 mt-0.5">Xem danh sách các bài học, chương trình Lớp 11 & Lớp 12</p>
            </div>
          </button>

        </div>
      </div>

    </div>
  );
}
