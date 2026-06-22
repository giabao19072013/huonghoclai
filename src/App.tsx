import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X, HelpCircle, BookOpen } from 'lucide-react';
import { DEFAULT_LESSONS } from './data/defaultLessons';
import { LessonProgress, DocumentAsset, StudyNote, StudySchedule, FirebaseConfig } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Roadmap from './components/Roadmap';
import Documents from './components/Documents';
import Notes from './components/Notes';
import Schedule from './components/Schedule';
import Pomodoro from './components/Pomodoro';
import Settings from './components/Settings';
import QuizSimulation from './components/QuizSimulation';
import Footer from './components/Footer';

// Import Firebase API Methods
import {
  getLessonsProgress,
  saveLessonProgress,
  getDocumentAssets,
  saveDocumentAsset,
  deleteDocumentAsset,
  getStudyNotes,
  saveStudyNote,
  deleteStudyNote,
  getStudySchedules,
  saveStudySchedule,
  deleteStudySchedule,
  isUsingFirebase,
  clearAllFirebaseCollections,
  synchronizeLocalAndCloud
} from './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(true);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinInputValue, setPinInputValue] = useState('');
  const [pinModalError, setPinModalError] = useState(false);

  // Core synchronized states
  const [lessons, setLessons] = useState(DEFAULT_LESSONS);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [assets, setAssets] = useState<DocumentAsset[]>([]);
  const [notes, setNotes] = useState<StudyNote[]>([]);
  const [schedules, setSchedules] = useState<StudySchedule[]>([]);
  const [loading, setLoading] = useState(true);

  // Profile customization states loaded from localStorage
  const [profileName, setProfileName] = useState(() => localStorage.getItem('HUONG_PROFILE_NAME') || 'Hương');
  const [profileExamName, setProfileExamName] = useState(() => localStorage.getItem('HUONG_PROFILE_EXAM_NAME') || 'Tốt nghiệp THPT 2028');
  const [profileExamDate, setProfileExamDate] = useState(() => localStorage.getItem('HUONG_PROFILE_EXAM_DATE') || '2028-06-26');
  const [profileGoal, setProfileGoal] = useState(() => localStorage.getItem('HUONG_PROFILE_GOAL') || 'Khúc xạ · ĐH Y khoa Phạm Ngọc Thạch – 25 điểm');

  const handleUpdateProfile = (name: string, examName: string, examDate: string, goal: string) => {
    setProfileName(name);
    setProfileExamName(examName);
    setProfileExamDate(examDate);
    setProfileGoal(goal);
    localStorage.setItem('HUONG_PROFILE_NAME', name);
    localStorage.setItem('HUONG_PROFILE_EXAM_NAME', examName);
    localStorage.setItem('HUONG_PROFILE_EXAM_DATE', examDate);
    localStorage.setItem('HUONG_PROFILE_GOAL', goal);
  };

  // === COMMONLY ACCESSED POMODORO SHARED STATE ENGINE ===
  const [pomodoroTimeLeft, setPomodoroTimeLeft] = useState(25 * 60);
  const [pomodoroIsRunning, setPomodoroIsRunning] = useState(false);
  const [pomodoroMode, setPomodoroMode] = useState<'study' | 'break'>('study');
  const [pomodoroStudyTime, setPomodoroStudyTime] = useState(25);
  const [pomodoroBreakTime, setPomodoroBreakTime] = useState(5);
  const [pomodoroSessionsCompleted, setPomodoroSessionsCompleted] = useState(0);
  const [isPomodoroTimeoutModalOpen, setIsPomodoroTimeoutModalOpen] = useState(false);
  const [pomodoroTimeoutType, setPomodoroTimeoutType] = useState<'study' | 'break'>('study');

  const triggerAlarmSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playBeep = (startTime: number, freq: number, duration: number, type: OscillatorType = 'square') => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.6, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration - 0.05);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      // High pitch trilling buzzer ring!
      for (let i = 0; i < 5; i++) {
        const t = now + i * 0.45;
        playBeep(t, 650, 0.2, 'square');
        playBeep(t + 0.15, 850, 0.22, 'square');
      }
    } catch (e) {
      console.warn("Unable to play alarm buzzer:", e);
    }
  };

  // Background Pomodoro Countdown loop running independently of tab switching!
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (pomodoroIsRunning) {
      timer = setInterval(() => {
        setPomodoroTimeLeft((prev) => {
          if (prev <= 1) {
            triggerAlarmSound();
            setPomodoroTimeoutType(pomodoroMode);
            setIsPomodoroTimeoutModalOpen(true);
            setPomodoroIsRunning(false);

            if (pomodoroMode === 'study') {
              setPomodoroMode('break');
              setPomodoroSessionsCompleted((s) => s + 1);
              return pomodoroBreakTime * 60;
            } else {
              setPomodoroMode('study');
              return pomodoroStudyTime * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [pomodoroIsRunning, pomodoroMode, pomodoroStudyTime, pomodoroBreakTime]);

  // Handle study/break timer length adjustments
  useEffect(() => {
    setPomodoroTimeLeft(pomodoroMode === 'study' ? pomodoroStudyTime * 60 : pomodoroBreakTime * 60);
    setPomodoroIsRunning(false);
  }, [pomodoroStudyTime, pomodoroBreakTime, pomodoroMode]);

  // 1. Initial Data Fetching from Database or local cache fallback
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);

        // Automatic bi-directional synchronization on initial load or browser reloads!
        if (isUsingFirebase()) {
          try {
            await synchronizeLocalAndCloud();
          } catch (syncErr) {
            console.warn('Background dynamic auto-sync had an initialization issue:', syncErr);
          }
        }

        const [progressData, assetsData, notesData, schedulesData] = await Promise.all([
          getLessonsProgress(),
          getDocumentAssets(),
          getStudyNotes(),
          getStudySchedules()
        ]);

        setProgress(progressData);
        setAssets(assetsData);
        setNotes(notesData);
        setSchedules(schedulesData);
      } catch (err) {
        console.error('Failure to load academic synchronization stores: ', err);
      } finally {
        setLoading(false);
      }
    };

    loadAllData();

    // Checked stored Admin Login status on LocalStorage
    const storedAdmin = localStorage.getItem('HUONG_ADMIN_LOGGED_IN');
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // 2. STATE SYNCHRONIZATION MUTATORS

  // A. Progress (checkmarks)
  const handleToggleProgress = async (lessonId: string, completed: boolean) => {
    // Optimistically update state
    setProgress(prev => {
      const index = prev.findIndex(p => p.lessonId === lessonId);
      const updatedItem = { lessonId, completed, updatedAt: new Date().toISOString() };
      if (index > -1) {
        const next = [...prev];
        next[index] = updatedItem;
        return next;
      } else {
        return [...prev, updatedItem];
      }
    });

    // Write to DB asynchronously in background
    saveLessonProgress(lessonId, completed).catch(e => {
      console.error('Không thể lưu trạng thái bài học lên cơ sở dữ liệu!', e);
    });
  };

  // B. Documents upload
  const handleAddAsset = async (newAsset: DocumentAsset) => {
    // Optimistically update state
    setAssets(prev => [...prev, newAsset]);

    // Write to DB in background
    saveDocumentAsset(newAsset).catch(e => {
      console.error('Không thể lưu tài liệu mới!', e);
    });
  };

  const handleDeleteAsset = async (assetId: string) => {
    // Optimistically update state
    setAssets(prev => prev.filter(a => a.id !== assetId));

    // Delete from DB in background
    deleteDocumentAsset(assetId).catch(e => {
      console.error('Không thể xóa tài liệu!', e);
    });
  };

  // C. Notes notepad journals
  const handleSaveNote = async (note: StudyNote) => {
    // Optimistically update state
    setNotes(prev => {
      const index = prev.findIndex(n => n.id === note.id);
      if (index > -1) {
        const next = [...prev];
        next[index] = note;
        return next;
      } else {
        return [...prev, note];
      }
    });

    // Write to DB in background
    saveStudyNote(note).catch(e => {
      console.error('Ghi chú của bạn không thể được lưu trữ lúc này!', e);
    });
  };

  const handleDeleteNote = async (noteId: string) => {
    // Optimistically update state
    setNotes(prev => prev.filter(n => n.id !== noteId));

    // Delete from DB in background
    deleteStudyNote(noteId).catch(e => {
      console.error('Không thể xóa ghi chú này!', e);
    });
  };

  // D. Timetable agenda schedules
  const handleAddSchedule = async (newEvent: StudySchedule) => {
    // Optimistically update state
    setSchedules(prev => [...prev, newEvent]);

    // Write to DB in background
    saveStudySchedule(newEvent).catch(e => {
      console.error('Lên lịch học bài không thành công!', e);
    });
  };

  const handleDeleteSchedule = async (eventId: string) => {
    // Optimistically update state
    setSchedules(prev => prev.filter(s => s.id !== eventId));

    // Delete from DB in background
    deleteStudySchedule(eventId).catch(e => {
      console.error('Không thể xóa buổi học khỏi lịch!', e);
    });
  };

  const handleToggleScheduleCompleted = async (eventId: string) => {
    const match = schedules.find(s => s.id === eventId);
    if (!match) return;
    const updated = { ...match, completed: !match.completed };

    // Optimistically update state
    setSchedules(prev => prev.map(s => s.id === eventId ? updated : s));

    // Write to DB in background
    saveStudySchedule(updated).catch(e => {
      console.error('Không thể thay đổi trạng thái hoàn thành!', e);
    });
  };

  // 3. ADMIN ACCESS GATEWAYS PIN CONTROLS
  const unlockAdminMode = (pin: string): boolean => {
    if (pin === '2028') {
      setIsAdmin(true);
      localStorage.setItem('HUONG_ADMIN_LOGGED_IN', 'true');
      return true;
    }
    return false;
  };

  const lockAdminMode = () => {
    setIsAdmin(false);
    localStorage.removeItem('HUONG_ADMIN_LOGGED_IN');
  };

  const handleModalPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinModalError(false);
    const ok = unlockAdminMode(pinInputValue);
    if (ok) {
      setPinInputValue('');
      setIsPinModalOpen(false);
    } else {
      setPinModalError(true);
    }
  };

  // E. Dynamic Firebase config persistence
  const handleSaveFirebaseConfig = (config: FirebaseConfig) => {
    localStorage.setItem('HUONG_FIREBASE_CONFIG', JSON.stringify(config));
  };

  const handleResetFirebaseConfig = () => {
    localStorage.removeItem('HUONG_FIREBASE_CONFIG');
  };

  // F. Wiping/Purging data to guarantee a 100% clean paper-like workspace!
  const handleClearAllData = async () => {
    // 1. Reset client states in 0ms seamlessly!
    setProgress([]);
    setAssets([]);
    setNotes([]);
    setSchedules([]);

    // 2. Erase from LocalStorage fallback key collections!
    localStorage.removeItem('huong_lessons_progress');
    localStorage.removeItem('huong_document_assets');
    localStorage.removeItem('huong_study_notes');
    localStorage.removeItem('huong_study_schedules');

    // 3. Delete from actual active Cloud Firestore too!
    try {
      await clearAllFirebaseCollections();
    } catch (e) {
      console.warn("Unable to completely clean server documents:", e);
    }
  };

  // Modal unlocking assistant
  const triggerUnlockModal = () => {
    setPinModalError(false);
    setPinInputValue('');
    setIsPinModalOpen(true);
  };

  return (
    <div id="huong-hoclai-root" className="min-h-screen bg-[#FFFDFE] flex text-slate-800">
      
      {/* A. Fixed Left Sidebar layout */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* B. Main Application Page body (Shifted right on Desktop by 64 units/16rem due to fixed sidebar) */}
      <div id="main-content-flow" className="flex-1 flex flex-col md:pl-64 min-w-0">
        
        {/* Universal Sticky Header greeting and stats */}
        <Header 
          isAdmin={isAdmin}
          setIsOpenMobile={setIsOpenMobile}
          triggerUnlockModal={triggerUnlockModal}
          lockAdminMode={lockAdminMode}
          pomodoroTimeLeft={pomodoroTimeLeft}
          pomodoroIsRunning={pomodoroIsRunning}
          pomodoroMode={pomodoroMode}
          onTimerClick={() => setActiveTab('pomodoro')}
          profileName={profileName}
          profileExamName={profileExamName}
        />

        {/* C. Dynamic View Routers container */}
        <main id="tab-router-container" className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {loading ? (
            <div className="h-96 flex flex-col items-center justify-center space-y-3.5">
              <div className="w-10 h-10 border-4 border-[#FFF0F2] border-t-[#800F2F] rounded-full animate-spin"></div>
              <p className="text-xs text-slate-400 font-medium">Đang tải đồng bộ nhật ký dữ liệu thực tế...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard 
                  lessons={lessons}
                  progress={progress}
                  schedules={schedules}
                  setActiveTab={setActiveTab}
                  profileExamDate={profileExamDate}
                  profileGoal={profileGoal}
                  profileName={profileName}
                  profileExamName={profileExamName}
                />
              )}

              {activeTab === 'roadmap' && (
                <Roadmap 
                  lessons={lessons}
                  progress={progress}
                  onToggleProgress={handleToggleProgress}
                  isAdmin={isAdmin}
                  triggerUnlockModal={triggerUnlockModal}
                />
              )}

              {activeTab === 'documents' && (
                <Documents 
                  lessons={lessons}
                  assets={assets}
                  onAddAsset={handleAddAsset}
                  onDeleteAsset={handleDeleteAsset}
                  isAdmin={isAdmin}
                  triggerUnlockModal={triggerUnlockModal}
                />
              )}

              {activeTab === 'notes' && (
                <Notes 
                  lessons={lessons}
                  notes={notes}
                  onSaveNote={handleSaveNote}
                  onDeleteNote={handleDeleteNote}
                  isAdmin={isAdmin}
                  triggerUnlockModal={triggerUnlockModal}
                />
              )}

              {activeTab === 'schedule' && (
                <Schedule 
                  lessons={lessons}
                  schedules={schedules}
                  onAddSchedule={handleAddSchedule}
                  onDeleteSchedule={handleDeleteSchedule}
                  onToggleScheduleCompleted={handleToggleScheduleCompleted}
                  isAdmin={isAdmin}
                  triggerUnlockModal={triggerUnlockModal}
                />
              )}

              {activeTab === 'pomodoro' && (
                <Pomodoro 
                  timeLeft={pomodoroTimeLeft}
                  setTimeLeft={setPomodoroTimeLeft}
                  isRunning={pomodoroIsRunning}
                  setIsRunning={setPomodoroIsRunning}
                  mode={pomodoroMode}
                  setMode={setPomodoroMode}
                  studyTime={pomodoroStudyTime}
                  setStudyTime={setPomodoroStudyTime}
                  breakTime={pomodoroBreakTime}
                  setBreakTime={setPomodoroBreakTime}
                  sessionsCompleted={pomodoroSessionsCompleted}
                  setSessionsCompleted={setPomodoroSessionsCompleted}
                />
              )}

              {activeTab === 'quiz' && (
                <QuizSimulation />
              )}

              {activeTab === 'settings' && (
                <Settings 
                  isAdmin={isAdmin}
                  onUnlock={unlockAdminMode}
                  onLock={lockAdminMode}
                  onSaveFirebaseConfig={handleSaveFirebaseConfig}
                  onResetFirebaseConfig={handleResetFirebaseConfig}
                  onClearAllData={handleClearAllData}
                  profileName={profileName}
                  profileExamName={profileExamName}
                  profileExamDate={profileExamDate}
                  profileGoal={profileGoal}
                  onUpdateProfile={handleUpdateProfile}
                />
              )}
            </>
          )}
        </main>

        {/* Shared simple contact footer */}
        <Footer />
      </div>

      {/* D. FLOATING MODAL: POPUP ENTER PIN ACCESS OVERLAY */}
      {isPinModalOpen && (
        <div id="pin-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Black blur backdrop */}
          <div 
            id="pin-modal-backdrop"
            onClick={() => setIsPinModalOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
          />
          
          <div 
            id="pin-modal-dialog"
            className="relative bg-white max-w-sm w-full p-6 rounded-3xl border border-[#FFE1E5] shadow-2xl animate-popIn z-10 flex flex-col overflow-hidden"
          >
            {/* Header Dialog */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <div className="flex items-center gap-2 text-[#800F2F]">
                <ShieldCheck size={18} />
                <h3 className="font-serif font-black text-sm text-[#800F2F]">Yêu cầu Quyền Admin</h3>
              </div>
              <button 
                id="close-pin-modal-btn"
                onClick={() => setIsPinModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleModalPinSubmit} className="mt-4 space-y-4">
              <p className="text-xs text-slate-500 leading-relaxed">
                Hành động này bảo mật dữ liệu học của Hương. Vui lòng điền mã PIN bí mật của bạn để cấp quyền chỉnh sửa!
              </p>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">Mã PIN xác nhận</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                  <input
                    type="password"
                    placeholder="Nhập mã PIN xác nhận..."
                    value={pinInputValue}
                    onChange={(e) => setPinInputValue(e.target.value)}
                    required
                    autoFocus
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-rose-100 bg-rose-50/20 text-slate-800 focus:outline-none focus:border-[#800F2F]"
                  />
                </div>
              </div>

              {pinModalError && (
                <p className="text-[10px] font-bold text-red-500">
                  ❌ Sai mã PIN! Vui lòng kiểm tra và thử lại nhé.
                </p>
              )}

              <button
                id="submit-pin-modal-btn"
                type="submit"
                className="w-full py-2 rounded-xl text-xs font-bold bg-[#800F2F] text-white hover:bg-[#A71E40] transition-colors cursor-pointer"
              >
                Xem và Xác nhận
              </button>
            </form>
          </div>
        </div>
      )}

      {/* E. FLOATING MODAL: POMODORO ALARM TIMEOUT ALERTS */}
      {isPomodoroTimeoutModalOpen && (
        <div id="pomodoro-timeout-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            id="pomodoro-timeout-backdrop"
            onClick={() => {
              setIsPomodoroTimeoutModalOpen(false);
              // Trigger a secondary beep to silence/confirm
            }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md" 
          />
          
          <div 
            id="pomodoro-timeout-dialog"
            className="relative bg-white max-w-md w-full p-8 rounded-3xl border border-[#FFE1E5] shadow-25 animate-popIn z-10 flex flex-col items-center text-center space-y-5"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg ring-4 ${
              pomodoroTimeoutType === 'study' 
                ? 'bg-[#800F2F] ring-rose-100 animate-bounce' 
                : 'bg-emerald-600 ring-emerald-100 animate-pulse'
            }`}>
              {pomodoroTimeoutType === 'study' ? '🎓' : '☕'}
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-black text-lg md:text-xl text-[#800F2F]">
                {pomodoroTimeoutType === 'study' 
                  ? '⏰ Hết giờ học rồi, Hương ơi!' 
                  : '☕ Kì nghỉ tuyệt vời đã hết rồi!'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pomodoroTimeoutType === 'study' 
                  ? 'Tuyệt vời vô cùng! Bạn vừa hoàn thành xuất sắc chu kỳ tập trung cao độ 25 phút. Hãy đứng dậy vươn vai, hít thở sâu và nghỉ ngơi xả hơi 5 phút nhé.'
                  : 'Đã nạp đầy năng lượng rồi đúng không nào? Hãy cùng quay lại bàn học tập rực rỡ để tiếp tục chinh phục giấc mơ blouse trắng của bạn Hương nha!'}
              </p>
            </div>

            <button
              id="close-pomodoro-timeout-btn"
              onClick={() => setIsPomodoroTimeoutModalOpen(false)}
              className={`w-full py-3 rounded-2xl text-xs font-black text-white shadow-md active:scale-95 transition-all cursor-pointer ${
                pomodoroTimeoutType === 'study' 
                  ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-200' 
                  : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-200'
              }`}
            >
              {pomodoroTimeoutType === 'study' ? 'BẮT ĐẦU NGHỈ NGƠI ☕' : 'QUAY LẠI HỌC BÀI THÔI 💪'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
