import React, { useState } from 'react';
import { CheckSquare, Square, Search, BookOpen, AlertCircle, FileText, Calendar, ChevronRight, X, Sparkles, BookMarked, Plus, Trash2 } from 'lucide-react';
import { Lesson } from '../data/defaultLessons';
import { LessonProgress } from '../types';
import { THEORY_DATA } from '../data/theoryData';

interface RoadmapProps {
  lessons: Lesson[];
  progress: LessonProgress[];
  onToggleProgress: (lessonId: string, completed: boolean) => void;
  isAdmin: boolean;
  triggerUnlockModal: () => void;
  onAddCustomLesson?: (newLesson: Lesson) => void;
  onDeleteCustomLesson?: (lessonId: string) => void;
}

export default function Roadmap({ 
  lessons, 
  progress, 
  onToggleProgress, 
  isAdmin,
  triggerUnlockModal,
  onAddCustomLesson,
  onDeleteCustomLesson
}: RoadmapProps) {
  const [selectedGrade, setSelectedGrade] = useState<'11' | '12'>('12');
  const [selectedSubject, setSelectedSubject] = useState<'Tất cả' | 'Toán' | 'Hóa' | 'Sinh' | 'Lý'>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for active Theory modal viewer
  const [viewingTheoryLesson, setViewingTheoryLesson] = useState<Lesson | null>(null);

  // States for adding custom/free lessons
  const [addingToChapter, setAddingToChapter] = useState<{ chapterName: string; grade: '11' | '12'; subject: 'Toán' | 'Hóa' | 'Sinh' | 'Lý' } | null>(null);
  const [newLessonTitle, setNewLessonTitle] = useState('');

  // States for adding custom chapters
  const [addingChapter, setAddingChapter] = useState<{ grade: '11' | '12'; subject: 'Toán' | 'Hóa' | 'Sinh' | 'Lý' } | null>(null);
  const [newChapterName, setNewChapterName] = useState('');
  const [newChapterFirstLesson, setNewChapterFirstLesson] = useState('');

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

  const handleConfirmAddCustomLesson = () => {
    if (!addingToChapter || !newLessonTitle.trim()) return;
    if (!onAddCustomLesson) return;

    const newLesson: Lesson = {
      id: `custom-${Date.now()}`,
      title: newLessonTitle.trim(),
      grade: addingToChapter.grade,
      subject: addingToChapter.subject,
      chapter: addingToChapter.chapterName
    };

    onAddCustomLesson(newLesson);
    setNewLessonTitle('');
    setAddingToChapter(null);
  };

  const handleConfirmAddChapter = () => {
    if (!addingChapter || !newChapterName.trim()) return;
    if (!onAddCustomLesson) return;

    const newLesson: Lesson = {
      id: `custom-${Date.now()}`,
      title: newChapterFirstLesson.trim() || 'Bài học mở đầu',
      grade: addingChapter.grade,
      subject: addingChapter.subject,
      chapter: newChapterName.trim()
    };

    onAddCustomLesson(newLesson);
    setNewChapterName('');
    setNewChapterFirstLesson('');
    setAddingChapter(null);
  };

  const subjects: ('Toán' | 'Hóa' | 'Sinh' | 'Lý')[] = ['Toán', 'Hóa', 'Sinh', 'Lý'];

  // Formatting helper to substitute basic markdown indicators into beautiful styled bullet text lists
  const renderFormattedTheory = (rawText?: string) => {
    if (!rawText) {
      return (
        <div className="text-slate-500 text-xs italic space-y-2.5">
          <p>Hiện tại bài học này đang được tổng hợp nội dung chi tiết bám sát tệp SGK bản mới nhất.</p>
          <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl text-slate-700 not-italic space-y-2.5">
            <h5 className="font-bold text-[#800F2F] flex items-center gap-1.5"><Sparkles size={13}/> Gợi ý Ôn Thi Cốt Lõi:</h5>
            <ul className="list-disc pl-5 space-y-1.5 text-[11px] leading-relaxed text-slate-600">
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
      <div className="space-y-4 text-xs text-slate-700 font-sans leading-relaxed tracking-wide">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('###')) {
            return (
              <h4 key={idx} className="font-serif font-black text-[#800F2F] text-sm mt-5 pb-1 border-b border-slate-100 flex items-center gap-1.5">
                <BookMarked size={14}/>
                {trimmed.replace('###', '').trim()}
              </h4>
            );
          }
          if (trimmed.startsWith('- **') || trimmed.startsWith('+ **')) {
            // Strong formatted points
            const content = trimmed.substring(2).trim();
            return (
              <p key={idx} className="pl-3 border-l-2 border-[#800F2F]/40 text-slate-700 font-medium my-2">
                {content}
              </p>
            );
          }
          if (trimmed.startsWith('*') || trimmed.startsWith('-') || trimmed.startsWith('+')) {
            return (
              <li key={idx} className="list-none pl-4 relative before:content-['•'] before:text-rose-600 before:absolute before:left-1.5 text-slate-600 text-[11px]">
                {trimmed.substring(1).trim()}
              </li>
            );
          }
          if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
            return (
              <div key={idx} className="bg-[#FFF0F2] p-3 rounded-xl border border-[#FFE1E5] text-center font-mono text-[#800F2F] text-[11px] overflow-x-auto my-2.5">
                {trimmed.replace(/\$\$/g, '')}
              </div>
            );
          }
          return trimmed ? <p key={idx} className="text-slate-600 text-[11px]">{trimmed}</p> : <div key={idx} className="h-1" />;
        })}
      </div>
    );
  };

  return (
    <div id="roadmap-view" className="space-y-6 font-sans text-slate-800">
      
      {/* 1. HERO HEADINGS */}
      <div id="roadmap-hero" className="bg-[#FFF5F7] p-6 rounded-3xl border border-[#FFE1E5] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-xl font-black text-[#800F2F]">Lộ Trình Ôn Thi THPT Quốc Gia</h2>
          <p className="text-xs text-slate-500 mt-1">Hệ thống bài học chuẩn chương trình khung SGK Toán, Hóa, Sinh, Lý</p>
        </div>

        {/* Read-only Alert Warning for anonymous non-admins */}
        {!isAdmin && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
            <AlertCircle size={14} className="text-amber-500 flex-shrink-0 animate-bounce" />
            <span>Chế độ chỉ xem. Nhập PIN tại Cài đặt để đánh dấu hoàn thành bài!</span>
          </div>
        )}
      </div>

      {/* 2. CONTROLS BAR: GRADE & SUBJECT NAVIGATION */}
      <div id="roadmap-filters-wrapper" className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          
          {/* Grade Selector Toggle */}
          <div id="grade-selectors" className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/85 w-full sm:w-auto">
            <button
              onClick={() => setSelectedGrade('11')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === '11' 
                  ? 'bg-[#800F2F] text-white shadow-sm' 
                  : 'text-slate-500 hover:text-[#800F2F]'
              }`}
            >
              Chương trình Lớp 11
            </button>
            <button
              onClick={() => setSelectedGrade('12')}
              className={`flex-1 sm:flex-none px-6 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedGrade === '12' 
                  ? 'bg-[#800F2F] text-white shadow-sm' 
                  : 'text-slate-500 hover:text-[#800F2F]'
              }`}
            >
              Chương trình Lớp 12
            </button>
          </div>

          {/* Search bar input */}
          <div id="roadmap-search-field" className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Tìm tên bài, chương..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl border border-[#FFE1E5] bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] transition-all placeholder-slate-400"
            />
          </div>
        </div>

        {/* Floating Subject Filters List & Add Chapter Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-[#FFE1E5]/60 shadow-sm">
          <div id="subject-filter-row" className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-1">
            <button
              onClick={() => setSelectedSubject('Tất cả')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === 'Tất cả' 
                  ? 'bg-[#800F2F] text-white shadow-sm' 
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-rose-300 hover:text-[#800F2F]'
              }`}
            >
              Tất cả các môn
            </button>
            {subjects.map((sub) => {
              const isActive = selectedSubject === sub;
              let colorAccent = 'hover:border-rose-300 hover:text-[#800F2F]';
              if (sub === 'Hóa') colorAccent = 'hover:border-amber-300 hover:text-amber-600';
              if (sub === 'Sinh') colorAccent = 'hover:border-emerald-300 hover:text-emerald-600';
              if (sub === 'Lý') colorAccent = 'hover:border-sky-300 hover:text-sky-600';

              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#800F2F] text-white shadow-sm' 
                      : `bg-slate-50 border border-slate-200 text-slate-600 ${colorAccent}`
                  }`}
                >
                  Môn {sub}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              if (!isAdmin) {
                triggerUnlockModal();
                return;
              }
              setAddingChapter({
                grade: selectedGrade,
                subject: selectedSubject === 'Tất cả' ? 'Toán' : selectedSubject
              });
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold bg-[#800F2F] hover:bg-[#A71E40] text-white transition-all cursor-pointer shadow-sm shadow-[#800f2f]/10"
          >
            <Plus size={14} />
            Thêm chương học mới
          </button>
        </div>
      </div>

      {/* 3. LESSON DIRECTORY */}
      <div id="chapters-grouping-grid" className="space-y-6">
        {Object.keys(groupedLessons).length > 0 ? (
          (Object.entries(groupedLessons) as [string, Lesson[]][]).map(([chapter, chapterLessons]) => (
            <div key={chapter} className="bg-white rounded-3xl border border-[#FFE1E5] overflow-hidden shadow-sm">
              
              {/* Chapter branding header */}
              <div id={`chapter-header-${chapter.replace(/\s+/g, '-')}`} className="bg-[#FFF8F9] px-5 py-4 border-b border-[#FFE1E5] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-serif text-sm font-black text-[#800F2F] tracking-wide flex items-center gap-2">
                    <BookOpen size={15} />
                    {chapter}
                  </h3>
                  <button
                    onClick={() => {
                      if (!isAdmin) {
                        triggerUnlockModal();
                        return;
                      }
                      const firstLess = chapterLessons[0];
                      setAddingToChapter({
                        chapterName: chapter,
                        grade: firstLess ? firstLess.grade : selectedGrade,
                        subject: firstLess ? firstLess.subject : (selectedSubject === 'Tất cả' ? 'Toán' : selectedSubject)
                      });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-extrabold bg-rose-50 border border-[#FFE1E5] text-[#800F2F] hover:bg-[#800F2F] hover:text-white transition-all cursor-pointer shadow-sm"
                  >
                    <Plus size={10} />
                    Thêm bài học tự do
                  </button>
                </div>
                <span className="self-start sm:self-auto text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-lg bg-white text-slate-500 font-bold border border-slate-100 whitespace-nowrap">
                  {chapterLessons.length} bài học
                </span>
              </div>

              {/* Chapter items list */}
              <div className="divide-y divide-slate-100 px-2">
                {chapterLessons.map((lesson) => {
                  const isCompleted = completedMap[lesson.id] || false;
                  
                  // Color codes for subjects
                  let subjectColor = 'text-[#800F2F] bg-[#FFF0F2] border border-[#FFE1E5]';
                  if (lesson.subject === 'Hóa') {
                    subjectColor = 'text-amber-700 bg-amber-50 border border-amber-200';
                  } else if (lesson.subject === 'Sinh') {
                    subjectColor = 'text-emerald-700 bg-emerald-50 border border-emerald-250';
                  } else if (lesson.subject === 'Lý') {
                    subjectColor = 'text-sky-700 bg-sky-50 border border-sky-200';
                  }

                  return (
                    <div 
                      key={lesson.id} 
                      className={`flex items-center justify-between p-4 transition-all duration-300 ${
                        isCompleted ? 'bg-slate-50/40' : 'hover:bg-[#FFF8F9]/45'
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
                            <CheckSquare className="text-[#800F2F] w-5.5 h-5.5" />
                          ) : (
                            <Square className="text-slate-300 hover:text-[#800F2F] w-5.5 h-5.5" />
                          )}
                        </button>
 
                        <div className="truncate pr-4">
                          <h4 className={`text-xs md:text-sm font-semibold leading-snug truncate ${isCompleted ? 'line-through text-slate-400 font-normal' : 'text-slate-700'}`}>
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
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white border border-slate-200 text-slate-600 hover:text-[#800F2F] hover:border-[#FFE1E5] hover:bg-[#FFF8F9] transition-all leading-none cursor-pointer"
                        >
                          <FileText size={11} />
                          Lý thuyết thi
                        </button>

                        <button
                          onClick={() => handleLessonToggle(lesson.id)}
                          className={`hidden xs:inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all ml-1 cursor-pointer ${
                            isCompleted 
                              ? 'bg-slate-50 text-slate-400 border border-slate-205' 
                              : 'bg-rose-50 text-[#800F2F] border border-rose-200 hover:bg-[#800F2F] hover:text-white'
                          }`}
                        >
                          {isCompleted ? 'Hoàn thành' : 'Đánh dấu'}
                        </button>

                        {lesson.id.startsWith('custom-') && onDeleteCustomLesson && (
                          <button
                            onClick={() => {
                              if (!isAdmin) {
                                triggerUnlockModal();
                                return;
                              }
                              onDeleteCustomLesson(lesson.id);
                            }}
                            className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-150 transition-all cursor-pointer ml-1"
                            title="Xóa bài học tự do"
                          >
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-[#FFE1E5] text-center max-w-md mx-auto">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={40} />
            <h4 className="text-sm font-bold text-slate-700">Không tìm thấy bài học nào</h4>
            <p className="text-xs text-slate-400 mt-1">Hãy thử điều chỉnh lại bộ lọc môn học hoặc từ khóa tìm kiếm của bạn.</p>
          </div>
        )}
      </div>

      {/* 4. EXAM THEORY DETAILS FLOATING POPUP OVERLAY */}
      {viewingTheoryLesson && (
        <div id="theory-viewer-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setViewingTheoryLesson(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
          />
          
          <div 
            id="theory-viewer-dialog"
            className="relative bg-white border border-[#FFE1E5] max-w-2xl w-full max-h-[85vh] p-6 rounded-3xl shadow-2xl animate-popIn z-10 flex flex-col overflow-hidden text-slate-800"
          >
            {/* Modal Heading block */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest bg-[#FFF0F2] text-[#800F2F] border border-[#FFE1E5] px-2.5 py-0.5 rounded-md">
                  Môn {viewingTheoryLesson.subject} Lớp {viewingTheoryLesson.grade}
                </span>
                <h3 className="font-serif font-black text-xs md:text-sm text-[#800F2F] truncate max-w-xs md:max-w-md" title={viewingTheoryLesson.title}>
                  {viewingTheoryLesson.title}
                </h3>
              </div>
              <button
                onClick={() => setViewingTheoryLesson(null)}
                className="text-slate-400 hover:text-[#800F2F] font-bold p-1 rounded-md"
              >
                <X size={15} />
              </button>
            </div>

            {/* Scrollable Core Theory Body */}
            <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-4 scrollbar-thin">
              {renderFormattedTheory(THEORY_DATA[viewingTheoryLesson.id])}
            </div>

            {/* Modal Footer actions shortcut linkage */}
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
              <span>Hệ thống lý thuyết bám sát chuẩn SGK ôn luyện thi</span>
              <button
                onClick={() => setViewingTheoryLesson(null)}
                className="px-4 py-2 rounded-xl bg-[#800F2F] hover:bg-[#A71E40] text-white transition-all cursor-pointer font-bold shadow-sm shadow-[#800f2f]/10"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ADD CUSTOM LESSON POPUP OVERLAY */}
      {addingToChapter && (
        <div id="add-lesson-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setAddingToChapter(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
          />
          
          <div 
            id="add-lesson-dialog"
            className="relative bg-white border border-[#FFE1E5] max-w-md w-full p-6 rounded-3xl shadow-2xl animate-popIn z-10 flex flex-col overflow-hidden text-slate-800"
          >
            {/* Modal Heading block */}
            <div className="flex items-center justify-between pb-3.5 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono font-black tracking-widest bg-[#FFF0F2] text-[#800F2F] border border-[#FFE1E5] px-2.5 py-0.5 rounded-md">
                  Chương {addingToChapter.subject} lớp {addingToChapter.grade}
                </span>
                <h3 className="font-serif font-black text-xs md:text-sm text-[#800F2F]">
                  Thêm bài học tự do
                </h3>
              </div>
              <button
                onClick={() => setAddingToChapter(null)}
                className="text-slate-400 hover:text-[#800F2F] font-bold p-1 rounded-md"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleConfirmAddCustomLesson(); }} className="mt-4 space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#800F2F] mb-1.5 font-bold">
                  Chương hiện tại
                </label>
                <div className="px-3 py-2 text-[11px] rounded-xl border border-slate-200 bg-slate-50 text-slate-500 font-medium leading-relaxed">
                  {addingToChapter.chapterName}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#800F2F] mb-1.5 font-bold">
                  Nhập tên bài học tự do
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bài tập Nâng cao về Khúc xạ ánh sáng..."
                  value={newLessonTitle}
                  onChange={(e) => setNewLessonTitle(e.target.value)}
                  className="w-full px-3 py-2 text-[11px] rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] transition-all"
                  autoFocus
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddingToChapter(null)}
                  className="px-4 py-2 text-[11px] font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-[11px] font-bold rounded-xl bg-[#800F2F] hover:bg-[#A71E40] text-white transition-all cursor-pointer shadow-sm shadow-[#800f2f]/10"
                >
                  Thêm ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. ADD CUSTOM CHAPTER POPUP OVERLAY */}
      {addingChapter && (
        <div id="add-chapter-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setAddingChapter(null)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
          />
          
          <div 
            id="add-chapter-dialog"
            className="relative bg-white border border-[#FFE1E5] max-w-md w-full p-6 rounded-3xl shadow-2xl animate-popIn z-10 flex flex-col overflow-hidden text-slate-800"
          >
            {/* Modal Heading block */}
            <div className="flex items-center justify-between pb-3.5 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-[#800F2F] text-white shadow-sm shrink-0">
                  <Sparkles size={14} />
                </span>
                <h3 className="font-serif font-black text-sm text-[#800F2F]">
                  Thêm chương học mới
                </h3>
              </div>
              <button
                onClick={() => setAddingChapter(null)}
                className="text-slate-400 hover:text-[#800F2F] font-bold p-1 rounded-md cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleConfirmAddChapter(); }} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#800F2F] mb-1.5 font-bold">
                    Môn học
                  </label>
                  <select
                    value={addingChapter.subject}
                    onChange={(e) => setAddingChapter(prev => prev ? { ...prev, subject: e.target.value as any } : null)}
                    className="w-full px-3 py-2 text-[11px] rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] transition-all"
                  >
                    <option value="Toán">Toán</option>
                    <option value="Hóa">Hóa</option>
                    <option value="Sinh">Sinh</option>
                    <option value="Lý">Lý</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-[#800F2F] mb-1.5 font-bold">
                    Khối lớp
                  </label>
                  <select
                    value={addingChapter.grade}
                    onChange={(e) => setAddingChapter(prev => prev ? { ...prev, grade: e.target.value as any } : null)}
                    className="w-full px-3 py-2 text-[11px] rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] transition-all"
                  >
                    <option value="11">Lớp 11</option>
                    <option value="12">Lớp 12</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#800F2F] mb-1.5 font-bold">
                  Tên chương mới
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Chương 6: Điện học nâng cao..."
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  className="w-full px-3 py-2 text-[11px] rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#800F2F] mb-1.5 font-bold flex items-center gap-1">
                  Bài học mở đầu
                  <span className="text-[9px] font-normal text-slate-400 font-sans italic">(Có thể tùy chỉnh)</span>
                </label>
                <input
                  type="text"
                  placeholder="Mặc định: Bài học mở đầu"
                  value={newChapterFirstLesson}
                  onChange={(e) => setNewChapterFirstLesson(e.target.value)}
                  className="w-full px-3 py-2 text-[11px] rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none focus:border-[#800F2F] transition-all"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddingChapter(null)}
                  className="px-4 py-2 text-[11px] font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-[11px] font-bold rounded-xl bg-[#800F2F] hover:bg-[#A71E40] text-white transition-all cursor-pointer shadow-sm shadow-[#800f2f]/10"
                >
                  Thêm chương học
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
