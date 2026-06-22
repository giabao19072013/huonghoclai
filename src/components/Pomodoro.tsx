import React, { useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target, Sparkles } from 'lucide-react';

interface PomodoroProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: (running: boolean) => void;
  mode: 'study' | 'break';
  setMode: (mode: 'study' | 'break') => void;
  studyTime: number;
  setStudyTime: (time: number) => void;
  breakTime: number;
  setBreakTime: (time: number) => void;
  sessionsCompleted: number;
  setSessionsCompleted: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pomodoro({
  timeLeft,
  setTimeLeft,
  isRunning,
  setIsRunning,
  mode,
  setMode,
  studyTime,
  setStudyTime,
  breakTime,
  setBreakTime,
  sessionsCompleted,
  setSessionsCompleted
}: PomodoroProps) {

  // Formatter "MM:SS"
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'study' ? studyTime * 60 : breakTime * 60);
  };

  // Skip current session
  const handleSkip = () => {
    setIsRunning(false);
    if (mode === 'study') {
      setMode('break');
      setTimeLeft(breakTime * 60);
    } else {
      setMode('study');
      setTimeLeft(studyTime * 60);
    }
  };

  const ringPercentage = mode === 'study' 
    ? (timeLeft / (studyTime * 60)) * 100 
    : (timeLeft / (breakTime * 60)) * 100;

  return (
    <div id="pomodoro-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* LEFT: TIMER DISPLAY CARD (7 Columns) */}
      <div id="pomodoro-timer-card" className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-[#FFE1E5] flex flex-col items-center justify-center shadow-sm">
        
        {/* Toggle Mode headers */}
        <div className="flex items-center gap-2 mb-8">
          <span className={`px-4 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            mode === 'study' 
              ? 'bg-[#800F2F] text-white shadow-sm' 
              : 'bg-slate-100 text-slate-500'
          }`}>
            <Target size={14} />
            Tập trung học
          </span>

          <span className={`px-4 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
            mode === 'break' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'bg-slate-100 text-slate-500'
          }`}>
            <Coffee size={14} />
            Nghỉ xả hơi
          </span>
        </div>

        {/* Circular Countdown Progress Ring */}
        <div id="pomodoro-circle-indicator" className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              cx="144"
              cy="144"
              r="120"
              className="stroke-slate-50 fill-none"
              strokeWidth="10"
              cx-offset="md:cx-128"
            />
            {/* Front progress ring */}
            <circle
              cx="144"
              cy="144"
              r="120"
              className={`fill-none transition-all duration-300 ${
                mode === 'study' ? 'stroke-[#800F2F]' : 'stroke-emerald-500'
              }`}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - ringPercentage / 100)}
              strokeLinecap="round"
            />
          </svg>

          {/* Clock number values overlaid inside */}
          <div className="absolute flex flex-col items-center">
            <span id="tomato-digits" className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight font-mono">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#800F2F] font-black mt-2 flex items-center gap-1">
              {mode === 'study' ? 'Sẵn sàng học ✦' : 'Nướp sương xả hơi'}
            </span>
          </div>
        </div>

        {/* Timers Action Controls */}
        <div id="pomodoro-controls" className="flex items-center gap-4 mt-8">
          <button
            id="pomodoro-reset-btn"
            onClick={handleReset}
            title="Thiết lập lại từ đầu"
            className="p-3.5 rounded-full border border-[#FFE1E5] text-slate-500 hover:text-[#800F2F] hover:bg-[#FFF0F2] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw size={18} />
          </button>

          <button
            id="pomodoro-play-pause-btn"
            onClick={handleToggle}
            className={`px-8 py-3.5 rounded-full text-white font-bold flex items-center gap-2 shadow-lg shadow-[#800f2f]/10 cursor-pointer hover:scale-105 active:scale-95 transition-all ${
              mode === 'study' ? 'bg-[#800F2F] hover:bg-[#A71E40]' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={16} className="fill-current" />
                Tạm dừng
              </>
            ) : (
              <>
                <Play size={16} className="fill-current" />
                Bắt đầu học
              </>
            )}
          </button>

          {/* Skip buttons */}
          <button
            id="pomodoro-skip-btn"
            onClick={handleSkip}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-[#800F2F] transition-colors cursor-pointer"
          >
            Bỏ qua
          </button>
        </div>

      </div>

      {/* RIGHT: CONFIGURATION & STATISTICS PANEL (5 Columns) */}
      <div id="pomodoro-settings-card" className="lg:col-span-5 bg-[#FFF5F7] border border-[#FFE1E5] p-6 rounded-3xl flex flex-col justify-between shadow-sm">
        
        <div className="space-y-6">
          <div className="flex items-center gap-1.5 text-[#800F2F] pb-1 border-b border-[#FFE1E5]">
            <Sparkles size={18} className="animate-spin duration-1000" />
            <span className="font-serif font-black text-sm">Cài đặt Pomodoro</span>
          </div>

          {/* Adjust Concentration session period */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
              <span className="font-bold flex items-center gap-1">
                <Target size={12} className="text-[#800F2F]" />
                Thời gian Tập trung
              </span>
              <span className="font-bold font-mono text-[#800F2F]">{studyTime} phút</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={studyTime}
              onChange={(e) => setStudyTime(Number(e.target.value))}
              className="w-full accent-[#800F2F] bg-[#FFE1E5]/60 h-1.5 rounded-xl cursor-ew-resize"
            />
          </div>

          {/* Adjust break period */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
              <span className="font-bold flex items-center gap-1">
                <Coffee size={12} className="text-emerald-500" />
                Thời gian nghỉ xả hơi
              </span>
              <span className="font-bold font-mono text-emerald-600">{breakTime} phút</span>
            </div>
            <input
              type="range"
              min="3"
              max="20"
              step="1"
              value={breakTime}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-[#FFE1E5]/60 h-1.5 rounded-xl cursor-ew-resize"
            />
          </div>
        </div>

        {/* Pomodoro count report card at lower margin */}
        <div className="mt-8 bg-white border border-[#FFE1E5] rounded-2xl p-4 flex items-center gap-4.5 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#FFF0F2] text-[#800F2F] flex items-center justify-center font-serif text-xl font-bold font-mono">
            {sessionsCompleted}
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-800">Chu kỳ hoàn thành</h5>
            <p className="text-[11px] text-slate-400 mt-1">Mỗi 4 kì tập trung sâu, hãy tự thưởng một kì nghỉ dài 15-20 phút nhé!</p>
          </div>
        </div>

      </div>

    </div>
  );
}
