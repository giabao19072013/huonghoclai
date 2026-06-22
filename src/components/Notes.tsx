import React, { useState } from 'react';
import { BookOpen, Search, Save, Calendar, Clock, Plus, Trash2, Eye, FileText, Check } from 'lucide-react';
import { Lesson } from '../data/defaultLessons';
import { StudyNote } from '../types';

interface NotesProps {
  lessons: Lesson[];
  notes: StudyNote[];
  onSaveNote: (note: StudyNote) => void;
  onDeleteNote: (noteId: string) => void;
  isAdmin: boolean;
  triggerUnlockModal: () => void;
}

export default function Notes({
  lessons,
  notes,
  onSaveNote,
  onDeleteNote,
  isAdmin,
  triggerUnlockModal
}: NotesProps) {
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [lessonId, setLessonId] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteDate, setNoteDate] = useState<string>('');
  const [noteTime, setNoteTime] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter notes based on searchable content or lesson title
  const filteredNotes = React.useMemo(() => {
    return notes.filter(n => {
      const lesson = lessons.find(l => l.id === n.lessonId);
      const title = lesson ? lesson.title : '';
      const subject = lesson ? lesson.subject : '';
      const query = searchQuery.toLowerCase();
      return (
        n.content.toLowerCase().includes(query) ||
        title.toLowerCase().includes(query) ||
        subject.toLowerCase().includes(query)
      );
    }).sort((a, b) => {
      // Sort newest notes first
      const dateA = `${a.date}T${a.time}`;
      const dateB = `${b.date}T${b.time}`;
      return dateB.localeCompare(dateA);
    });
  }, [notes, lessons, searchQuery]);

  // Start adding a new note
  const handleStartNewNote = () => {
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const timeStr = today.toTimeString().split(' ')[0].substring(0, 5);

    setLessonId(lessons[0]?.id || '');
    setNoteContent('');
    setNoteDate(dateStr);
    setNoteTime(timeStr);
    setSelectedNoteId(null);
    setIsEditing(true);
  };

  // Open note details for editing or viewing
  const handleViewNote = (note: StudyNote) => {
    setSelectedNoteId(note.id);
    setLessonId(note.lessonId);
    setNoteContent(note.content);
    setNoteDate(note.date);
    setNoteTime(note.time);
    setIsEditing(true);
  };

  // Handle note submission save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }
    if (!lessonId) {
      alert('Vui lòng chọn bài học từ danh sách!');
      return;
    }
    if (!noteContent.trim()) {
      alert('Vui lòng nhập nội dung ghi chú!');
      return;
    }

    const targetId = selectedNoteId || `note-${Date.now()}`;
    const newNote: StudyNote = {
      id: targetId,
      lessonId,
      content: noteContent,
      date: noteDate || new Date().toISOString().split('T')[0],
      time: noteTime || new Date().toTimeString().split(' ')[0].substring(0, 5),
      updatedAt: new Date().toISOString()
    };

    onSaveNote(newNote);
    setSelectedNoteId(targetId);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDelete = (noteId: string) => {
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }
    if (confirm('Bạn có chắc muốn xóa vĩnh viễn ghi chú học tập này không?')) {
      onDeleteNote(noteId);
      if (selectedNoteId === noteId) {
        setIsEditing(false);
        setSelectedNoteId(null);
      }
    }
  };

  const getSubjectColorClasses = (subject?: string) => {
    switch (subject) {
      case 'Toán': return 'text-rose-400 bg-rose-950/40 border-rose-900/60';
      case 'Hóa': return 'text-amber-400 bg-amber-950/40 border-amber-900/60';
      case 'Sinh': return 'text-emerald-400 bg-emerald-950/40 border-emerald-900/60';
      case 'Lý': return 'text-sky-400 bg-sky-950/40 border-sky-900/60';
      default: return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div id="notes-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[550px] text-zinc-100 font-sans">
      
      {/* 1. LEFT COLUMN: LIST OF WRITTEN NOTES IN DARK DECENT PALETTE (5 Columns) */}
      <div id="notes-list-panel" className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 flex flex-col h-full shadow-2xl overflow-hidden">
        
        {/* Panel Header */}
        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="text-rose-400" size={18} />
              <h3 className="font-serif font-black text-sm text-zinc-200">Sổ tay học tập ({notes.length})</h3>
            </div>
            
            <button
              onClick={handleStartNewNote}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Plus size={12} />
              Ghi chú mới
            </button>
          </div>

          {/* Note query input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={13} />
            <input
              type="text"
              placeholder="Tìm kiếm nhanh ghi chú..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-100 focus:outline-none focus:border-rose-500 transition-all placeholder-zinc-500"
            />
          </div>
        </div>

        {/* Scrollable list items container */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => {
              const lessonObj = lessons.find(l => l.id === note.lessonId);
              const isSelected = selectedNoteId === note.id;

              return (
                <div
                  key={note.id}
                  onClick={() => handleViewNote(note)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 relative group ${
                    isSelected
                      ? 'bg-zinc-900 border-rose-500 shadow-lg'
                      : 'border-zinc-900 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-800'
                  }`}
                >
                  {/* Top Subject and Time tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${getSubjectColorClasses(lessonObj?.subject)}`}>
                      {lessonObj?.subject || 'Khác'}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-mono flex items-center gap-1">
                      <Calendar size={10} className="text-zinc-500" />
                      {note.date} {note.time}
                    </span>
                  </div>

                  {/* Note block teaser */}
                  <div className="space-y-1 min-w-0">
                    <span className="font-bold text-[11px] block text-zinc-300 truncate leading-snug-tight">
                      {lessonObj ? lessonObj.title : 'Chưa phân loại bài học'}
                    </span>
                    <p className="text-[10px] text-zinc-400 truncate-2-lines leading-snug break-words">
                      {note.content}
                    </p>
                  </div>

                  {/* Hover trash to directly remove */}
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note.id);
                      }}
                      className="absolute right-2 bottom-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-zinc-800 rounded-md"
                      title="Xóa ghi chép"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 flex flex-col items-center justify-center text-zinc-500 gap-2">
              <BookOpen size={28} className="text-zinc-700" />
              <span className="text-xs">Không có bài ghi chú nào</span>
              <p className="text-[10px] text-zinc-600 max-w-xs leading-relaxed px-4">Hãy bấm nút "Ghi chú mới" để thiết lập nội dung ghi chép cho bài học của bạn!</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. RIGHT COLUMN: EDITOR CORE PANEL AT DEEP BLACK (7 Columns) */}
      <div id="notes-editor-panel" className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 flex flex-col h-full shadow-2xl overflow-hidden relative">
        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col h-full space-y-4">
            
            {/* Editor Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-3 gap-3">
              <div>
                <h4 className="font-serif font-black text-sm text-zinc-200">
                  {selectedNoteId ? 'Sửa sổ tay ghi chép' : 'Soạn thảo ghi chép'}
                </h4>
                <p className="text-[10px] text-zinc-400">Tự động lưu xuống Cloud và bộ nhớ trình duyệt của Hương</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {!isAdmin && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-950/30 border border-amber-900/60 px-2.5 py-1 rounded-lg">
                    <Eye size={11} />
                    Chỉ xem
                  </span>
                )}

                <button
                  type="submit"
                  className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer ${
                    isAdmin
                      ? 'bg-rose-600 hover:bg-rose-500 text-white active:scale-95'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-rose-400'
                  }`}
                >
                  {saveSuccess ? (
                    <>
                      <Check size={14} className="text-emerald-400 bg-emerald-950 p-0.5 rounded" />
                      Đã lưu!
                    </>
                  ) : (
                    <>
                      <Save size={13} />
                      {isAdmin ? 'Đồng bộ Lưu' : 'Cần mã PIN'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Input Details */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
              {/* Lesson Dropdown Field */}
              <div className="sm:col-span-7">
                <label className="block text-[9px] font-mono uppercase tracking-widest text-rose-400/80 mb-1">
                  Liên kết bài học từ SGK (Bài x)
                </label>
                <select
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  disabled={!isAdmin}
                  className="w-full px-3 py-2 text-[11px] rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-rose-500 disabled:opacity-50"
                >
                  {lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id} className="bg-zinc-950">
                      [{lesson.subject} {lesson.grade}] - {lesson.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Input Field */}
              <div className="sm:col-span-3">
                <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Chọn ngày ghi
                </label>
                <div className="relative">
                  <Calendar size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="date"
                    value={noteDate}
                    onChange={(e) => setNoteDate(e.target.value)}
                    disabled={!isAdmin}
                    className="w-full pl-7.5 pr-2 py-2 text-[11px] rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-rose-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Time Input Field */}
              <div className="sm:col-span-2">
                <label className="block text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                  Chọn giờ
                </label>
                <div className="relative">
                  <Clock size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="time"
                    value={noteTime}
                    onChange={(e) => setNoteTime(e.target.value)}
                    disabled={!isAdmin}
                    className="w-full pl-7.5 pr-2 py-2 text-[11px] rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:border-rose-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Note Rich Textarea Document Sheet */}
            <div className="flex-1">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                disabled={!isAdmin}
                placeholder={
                  isAdmin
                    ? "Hãy viết các công thức, kiến thức lý thuyết nồng nầm quan trọng để đi thi, mẹo nhớ của Hương cho bài học x tại đây..."
                    : "mở khóa quyền admin ở mục cài đặt hoặc nhấn lưu để liên kết PIN."
                }
                className="w-full h-full p-4.5 text-xs rounded-2xl border border-zinc-800 focus:outline-none focus:border-rose-500 bg-zinc-900/40 resize-none font-mono text-zinc-200 leading-relaxed placeholder-zinc-600 disabled:opacity-75"
              />
            </div>
          </form>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 gap-3">
            <BookOpen size={48} className="text-zinc-800 animate-pulse" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-zinc-300">Nhật ký khoa bảng của Hương học lại</h4>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto leading-relaxed">
                Hương hãy chọn một ghi chép học tập ở danh mục bên trái hoặc kích nút <strong className="text-rose-400">"Ghi chú mới"</strong> để bắt đầu soạn các kiến thức hay giúp đỗ đạt đại học Y khoa nhé!
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
