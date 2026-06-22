import React, { useState } from 'react';
import { CheckSquare, Square, Search, BookOpen, AlertCircle, FileText, Calendar, ChevronRight, X, Sparkles, BookMarked } from 'lucide-react';
import { Lesson } from '../data/defaultLessons';
import { LessonProgress } from '../types';
import { THEORY_DATA } from '../data/theoryData';

interface RoadmapProps {
  lessons: Lesson[];
  progress: LessonProgress[];
  onToggleProgress: (lessonId: string, completed: boolean) => void;
  isAdmin: boolean;
  triggerUnlockModal: () => void;
}

export default function Roadmap({ 
  lessons, 
  progress, 
  onToggleProgress, 
  isAdmin,
  triggerUnlockModal
}: RoadmapProps) {
  const [selectedGrade, setSelectedGrade] = useState<'11' | '12'>('12');
  const [selectedSubject, setSelectedSubject] = useState<'Tất cả' | 'Toán' | 'Hóa' | 'Sinh' | 'Lý'>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for active Theory modal viewer
  const [viewingTheoryLesson, setViewingTheoryLesson] = useState<Lesson | null>(null);

  // Index progress list to object for O(1) checks
  const completedMap = React.useMemo(() => {
    const map: Record<string, boolean> = {};
    progress.forEach(p => {
      if (p.completed) map[p.lessonId] = true;
    });
    return map;
  }, [progress]);

  // Filter lessons based on grade, subject, and filter queries
  const filteredLessons = React.useMemo(() => {
    return lessons.filter(lesson => {
      const matchGrade = lesson.grade === selectedGrade;
      const matchSubject = selectedSubject === 'Tất cả' || lesson.subject === selectedSubject;
      const matchSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.chapter.toLowerCase().includes(searchQuery.toLowerCase());
      return matchGrade && matchSubject && matchSearch;
    });
  }, [lessons, selectedGrade, selectedSubject, searchQuery]);

  // Group lessons by Chapter for presentation
  const groupedLessons = React.useMemo(() => {
    const groups: Record<string, Lesson[]> = {};
    filteredLessons.forEach(lesson => {
      if (!groups[lesson.chapter]) {
        groups[lesson.chapter] = [];
      }
      groups[lesson.chapter].push(lesson);
    });
    return groups;
  }, [filteredLessons]);

  const handleLessonToggle = (lessonId: string) => {
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }
    const currentlyCompleted = completedMap[lessonId] || false;
    onToggleProgress(lessonId, !currentlyCompleted);
  };

  const handleOpenTheory = (lesson: Lesson) => {
    setViewingTheoryLesson(lesson);
  };

  const subjects: ('Toán' | 'Hóa' | 'Sinh' | 'Lý')[] = ['Toán', 'Hóa', 'Sinh', 'Lý'];

  // Formatting helper to substitute basic markdown indicators into beautiful styled bullet text lists
  const renderFormattedTheory = (rawText?: string) => {
    if (!rawText) {
      return (
        <div className="text-zinc-500 text-xs italic space-y-2.5">
          <p>Hiện tại bài học này đang được tổng hợp nội dung chi tiết bám sát tệp SGK bản mới nhất.</p>
          <div className="bg-zinc-900 border border-zinc-800 p-4.5 rounded-2xl text-zinc-300 not-italic space-y-2.5">
            <h5 className="font-bold text-rose-400 flex items-center gap-1.5"><Sparkles size={13}/> Gợi ý Ôn Thi Cốt Lõi:</h5>
            <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-relaxed text-zinc-300">
              <li>Ôn tập kỹ các câu hỏi nhận biết và thông hiểu trong sách giáo khoa để nắm chắc điểm thi cốt lõi.</li>
              <li>Thường xuyên áp dụng làm bài tập thực hành, luyện đề trắc nghiệm tính giờ tại mục Pomodoro.</li>
              <li>Sử dụng chức năng Thời khóa biểu để xếp lịch tối ưu thời khoảng buổi học vào các khung giờ vàng ghi nhớ sâu.</li>
            </ul>
          </div>
        </div>
      );
    }

    const lines = rawText.split('\n');
    return (
      <div className="space-y-4 text-xs text-zinc-300 font-sans leading-relaxed tracking-wide">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('###')) {
            return (
              <h4 key={idx} className="font-serif font-black text-rose-400 text-sm mt-5 pb-1 border-b border-zinc-900 flex items-center gap-1.5">
                <BookMarked size={14}/>
                {trimmed.replace('###', '').trim()}
              </h4>
            );
          }
          if (trimmed.startsWith('- **') || trimmed.startsWith('+ **')) {
            // Strong formatted points
            const content = trimmed.substring(2).trim();
            return (
              <p key={idx} className="pl-2 border-l-2 border-rose-950/60 text-zinc-300">
                {content}
              </p>
            );
          }
          if (trimmed.startsWith('*') || trimmed.startsWith('-') || trimmed.startsWith('+')) {
            return (
              <li key={idx} className="list-none pl-4 relative before:content-['•'] before:text-rose-500 before:absolute before:left-1.5 text-zinc-400 text-[11px]">
                {trimmed.substring(1).trim()}
              </li>
            );
          }
          if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
            return (
              <div key={idx} className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-center font-mono text-rose-300 text-[11px] overflow-x-auto my-2.5">
                {trimmed.replace(/\$\$/g, '')}
              </div>
            );
          }
          return trimmed ? <p key={idx} className="text-zinc-300 text-[11px]">{trimmed}</p> : <div key={idx} className="h-1" />;
        })}
      </div>
    );
  };

  return (
    <div id="roadmap-view" className="space-y-6 font-sans text-zinc-100">
      
      {/* 1. HERO HEADINGS */}
      <div id="roadmap-hero" className="bg-zinc-950 p-6 rounded-3xl border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <h2 className="font-serif text-xl font-black text-rose-400">Lộ Trình Ôn Thi THPT Quốc Gia</h2>
          <p className="text-xs text-zinc-400 mt-1">Hệ thống bài học chuẩn chương trình khung SGK Toán, Hóa, Sinh, Lý</p>
        </div>

        {/* Read-only Alert Warning for anonymous non-admins */}
        {!isAdmin && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-900/60 text-amber-400 text-xs font-semibold">
            <AlertCircle size={14} className="text-amber-500 flex-shrink-0 animate-bounce" />
            <span>Chế độ chỉ xem. Nhập PIN tại Cài đặt để đánh dấu hoàn thành bài!</span>
          </div>
        )}
      </div>

      {/* 2. CONTROLS BAR: GRADE & SUBJECT NAVIGATION */}
      <div id="roadmap-filters-wrapper" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          
          {/* Grade Selector Toggle */}
          <div id="grade-selectors" className="flex items-center p-1 bg-zinc-900 rounded-2xl border border-zinc-800 w-full sm:w-auto">
            <button
              onClick={() => setSelectedGrade('11')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === '11' 
                  ? 'bg-rose-600 text-white shadow-md' 
                  : 'text-zinc-400 hover:text-rose-400'
              }`}
            >
              Chương trình Lớp 11
            </button>
            <button
              onClick={() => setSelectedGrade('12')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === '12' 
                  ? 'bg-rose-600 text-white shadow-md' 
                  : 'text-zinc-400 hover:text-rose-400'
              }`}
            >
              Chương trình Lớp 12
            </button>
          </div>

          {/* Search bar input */}
          <div id="roadmap-search-field" className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
            <input
              type="text"
              placeholder="Tìm tên bài, chương..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Floating Subject Filters List */}
        <div id="subject-filter-row" className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          <button
            onClick={() => setSelectedSubject('Tất cả')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSubject === 'Tất cả' 
                ? 'bg-rose-600 text-white shadow-md' 
                : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-rose-400/50 hover:text-rose-400'
            }`}
          >
            Tất cả các môn
          </button>
          {subjects.map((sub) => {
            const isActive = selectedSubject === sub;
            let colorAccent = 'hover:bg-rose-950/20 hover:text-rose-400';
            if (sub === 'Hóa') colorAccent = 'hover:bg-amber-950/20 hover:text-amber-400';
            if (sub === 'Sinh') colorAccent = 'hover:bg-emerald-950/20 hover:text-emerald-400';
            if (sub === 'Lý') colorAccent = 'hover:bg-sky-950/20 hover:text-sky-400';

            return (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-rose-600 text-white shadow-md' 
                    : `bg-zinc-900 border border-zinc-800 text-zinc-400 ${colorAccent}`
                }`}
              >
                Môn {sub}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. LESSON DIRECTORY */}
      <div id="chapters-grouping-grid" className="space-y-6">
        {Object.keys(groupedLessons).length > 0 ? (
          (Object.entries(groupedLessons) as [string, Lesson[]][]).map(([chapter, chapterLessons]) => (
            <div key={chapter} className="bg-zinc-950 rounded-3xl border border-zinc-850 overflow-hidden shadow-xl">
              
              {/* Chapter branding header */}
              <div id={`chapter-header-${chapter.replace(/\s+/g, '-')}`} className="bg-zinc-900/40 px-5 py-4 border-b border-zinc-900 flex items-center justify-between">
                <h3 className="font-serif text-sm font-black text-rose-300 tracking-wide flex items-center gap-2">
                  <BookOpen size={15} />
                  {chapter}
                </h3>
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-lg bg-zinc-900 text-zinc-400 font-bold border border-zinc-800">
                  {chapterLessons.length} bài học
                </span>
              </div>

              {/* Chapter items list */}
              <div className="divide-y divide-zinc-900/60 px-2">
                {chapterLessons.map((lesson) => {
                  const isCompleted = completedMap[lesson.id] || false;
                  
                  // Color codes for subjects
                  let subjectColor = 'text-rose-400 bg-rose-950/40 border border-rose-900/40';
                  if (lesson.subject === 'Hóa') {
                    subjectColor = 'text-amber-400 bg-amber-950/40 border border-amber-900/40';
                  } else if (lesson.subject === 'Sinh') {
                    subjectColor = 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/40';
                  } else if (lesson.subject === 'Lý') {
                    subjectColor = 'text-sky-400 bg-sky-950/40 border border-sky-900/40';
                  }

                  return (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-4 transition-all duration-300 ${
                        isCompleted ? 'bg-zinc-900/20' : 'hover:bg-zinc-900/40'
                      }`}
                    >
                      {/* Left: Checkmark & Lesson Info */}
                      <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        {/* Checkbox trigger button */}
                        <button
                          id={`lesson-check-${lesson.id}`}
                          onClick={() => handleLessonToggle(lesson.id)}
                          className={`flex-shrink-0 focus:outline-none transition-transform active:scale-90 ${
                            isAdmin ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckSquare className="text-rose-500 w-5.5 h-5.5" />
                          ) : (
                            <Square className="text-zinc-700 hover:text-rose-400 w-5.5 h-5.5" />
                          )}
                        </button>
 
                        <div className="truncate pr-4">
                          <h4 className={`text-xs md:text-sm font-semibold leading-snug truncate ${isCompleted ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                            {lesson.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-lg ${subjectColor}`}>
                              {lesson.subject}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions shortcut */}
                      <div className="flex items-center gap-2">
                        {/* VIEW SYSTEM THEORY BUTTON */}
                        <button
                          onClick={() => handleOpenTheory(lesson)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-rose-400 hover:border-rose-500 transition-all leading-none cursor-pointer"
                        >
                          <FileText size={11} />
                          Lý thuyết thi
                        </button>

                        <button
                          onClick={() => handleLessonToggle(lesson.id)}
                          className={`hidden xs:inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all ml-1 ${
                            isCompleted 
                              ? 'bg-zinc-900 text-zinc-500 border border-zinc-800/40' 
                              : 'bg-rose-950/40 text-rose-400 border border-rose-900/50 hover:bg-rose-600 hover:text-white'
                          }`}
                        >
                          {isCompleted ? 'Hoàn thành' : 'Đánh dấu'}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))
        ) : (
          <div className="bg-zinc-950 p-12 rounded-3xl border border-zinc-850 text-center max-w-md mx-auto">
            <AlertCircle className="mx-auto text-zinc-700 mb-4" size={40} />
            <h4 className="text-sm font-bold text-zinc-300">Không tìm thấy bài học nào</h4>
            <p className="text-xs text-zinc-500 mt-1">Hãy thử điều chỉnh lại bộ lọc môn học hoặc từ khóa tìm kiếm của bạn.</p>
          </div>
        )}
      </div>

      {/* 4. EXAM THEORY DETAILS FLOATING POPUP OVERLAY */}
      {viewingTheoryLesson && (
        <div id="theory-viewer-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setViewingTheoryLesson(null)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
          />
          
          <div 
            id="theory-viewer-dialog"
            className="relative bg-zinc-950 border border-zinc-850 max-w-2xl w-full max-h-[85vh] p-6 rounded-3xl shadow-2xl animate-popIn z-10 flex flex-col overflow-hidden text-zinc-100"
          >
            {/* Modal Heading block */}
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest bg-rose-950/40 text-rose-400 border border-rose-900/40 px-2 py-0.5 rounded-md">
                  Môn {viewingTheoryLesson.subject} Lớp {viewingTheoryLesson.grade}
                </span>
                <h3 className="font-serif font-black text-xs md:text-sm text-zinc-100 truncate max-w-xs md:max-w-md" title={viewingTheoryLesson.title}>
                  {viewingTheoryLesson.title}
                </h3>
              </div>
              <button
                onClick={() => setViewingTheoryLesson(null)}
                className="text-zinc-500 hover:text-rose-400 font-bold p-1 rounded-md"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable Core Theory Body */}
            <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-4 scrollbar-thin">
              {renderFormattedTheory(THEORY_DATA[viewingTheoryLesson.id])}
            </div>

            {/* Modal Footer actions shortcut linkage */}
            <div className="pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
              <span>Hệ thống lý thuyết bám sát chuẩn SGK ôn luyện thi</span>
              <button
                onClick={() => setViewingTheoryLesson(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-800 transition-all cursor-pointer font-bold"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
