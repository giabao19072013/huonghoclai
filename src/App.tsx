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
  isUsingFirebase
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

  // 1. Initial Data Fetching from Database or local cache fallback
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
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
    try {
      await saveLessonProgress(lessonId, completed);
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
    } catch (e) {
      alert('Không thể lưu trạng thái bài học lên cơ sở dữ liệu!');
    }
  };

  // B. Documents upload
  const handleAddAsset = async (newAsset: DocumentAsset) => {
    try {
      await saveDocumentAsset(newAsset);
      setAssets(prev => [...prev, newAsset]);
    } catch (e) {
      alert('Không thể lưu tài liệu mới!');
    }
  };

  const handleDeleteAsset = async (assetId: string) => {
    try {
      await deleteDocumentAsset(assetId);
      setAssets(prev => prev.filter(a => a.id !== assetId));
    } catch (e) {
      alert('Không thể xóa tài liệu!');
    }
  };

  // C. Notes notepad journals
  const handleSaveNote = async (note: StudyNote) => {
    try {
      await saveStudyNote(note);
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
    } catch (e) {
      alert('Ghi chú của bạn không thể được lưu trữ lúc này!');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteStudyNote(noteId);
      setNotes(prev => prev.filter(n => n.id !== noteId));
    } catch (e) {
      alert('Không thể xóa ghi chú này!');
    }
  };

  // D. Timetable agenda schedules
  const handleAddSchedule = async (newEvent: StudySchedule) => {
    try {
      await saveStudySchedule(newEvent);
      setSchedules(prev => [...prev, newEvent]);
    } catch (e) {
      alert('Lên lịch học bài không thành công!');
    }
  };

  const handleDeleteSchedule = async (eventId: string) => {
    try {
      await deleteStudySchedule(eventId);
      setSchedules(prev => prev.filter(s => s.id !== eventId));
    } catch (e) {
      alert('Không thể xóa buổi học khỏi lịch!');
    }
  };

  const handleToggleScheduleCompleted = async (eventId: string) => {
    try {
      const match = schedules.find(s => s.id === eventId);
      if (!match) return;
      const updated = { ...match, completed: !match.completed };
      await saveStudySchedule(updated);
      setSchedules(prev => prev.map(s => s.id === eventId ? updated : s));
    } catch (e) {
      alert('Không thể thay đổi trạng thái hoàn thành!');
    }
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
                <Pomodoro />
              )}

              {activeTab === 'settings' && (
                <Settings 
                  isAdmin={isAdmin}
                  onUnlock={unlockAdminMode}
                  onLock={lockAdminMode}
                  onSaveFirebaseConfig={handleSaveFirebaseConfig}
                  onResetFirebaseConfig={handleResetFirebaseConfig}
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

    </div>
  );
}
