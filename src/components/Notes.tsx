import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Save, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Eye, 
  FileText, 
  Check,
  Paperclip,
  UploadCloud,
  X,
  Download,
  FileUp
} from 'lucide-react';
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
  const [fileAttachment, setFileAttachment] = useState<{ name: string; url: string; type: string } | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
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
        subject.toLowerCase().includes(query) ||
        (n.fileAttachment && n.fileAttachment.name.toLowerCase().includes(query))
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
    setFileAttachment(undefined);
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
    setFileAttachment(note.fileAttachment);
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
    if (!noteContent.trim() && !fileAttachment) {
      alert('Vui lòng nhập nội dung ghi chú hoặc tải lên file đính kèm tài liệu!');
      return;
    }

    const targetId = selectedNoteId || `note-${Date.now()}`;
    const newNote: StudyNote = {
      id: targetId,
      lessonId,
      content: noteContent,
      date: noteDate || new Date().toISOString().split('T')[0],
      time: noteTime || new Date().toTimeString().split(' ')[0].substring(0, 5),
      updatedAt: new Date().toISOString(),
      fileAttachment
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
        setFileAttachment(undefined);
      }
    }
  };

  // File Upload Helper (converts selected file directly to a state-supported Base64 string payload)
  const processUploadedFile = (file: File) => {
    setUploadProgress(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFileAttachment({
          name: file.name,
          url: event.target.result as string,
          type: file.type
        });
      }
      setUploadProgress(false);
    };
    reader.onerror = () => {
      alert('Không thể đọc file đã chọn. Hãy thử lại!');
      setUploadProgress(false);
    };
    reader.readAsDataURL(file);
  };

  // Drag controls
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleRemoveAttachment = () => {
    setFileAttachment(undefined);
  };

  const getSubjectColorClasses = (subject?: string) => {
    switch (subject) {
      case 'Toán': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'Hóa': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Sinh': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Lý': return 'text-sky-600 bg-sky-50 border-sky-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <div id="notes-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[550px] text-slate-800 font-sans">
      
      {/* 1. LEFT COLUMN: LIST OF WRITTEN NOTES IN ELEGANT LIGHT ROSE PALETTE (5 Columns) */}
      <div id="notes-list-panel" className="lg:col-span-5 bg-white border border-[#FFE1E5] rounded-3xl p-5 flex flex-col h-full shadow-sm overflow-hidden">
        
        {/* Panel Header */}
        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="text-[#800F2F]" size={18} />
              <h3 className="font-serif font-black text-sm text-slate-800">Sổ tay học tập ({notes.length})</h3>
            </div>
            
            <button
              onClick={handleStartNewNote}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold bg-[#800F2F] hover:bg-[#A71E40] text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus size={12} />
              Ghi chú mới
            </button>
          </div>

          {/* Note query input */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input
              type="text"
              placeholder="Tìm kiếm nhanh ghi chú..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#800F2F] transition-all placeholder-slate-400"
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
                      ? 'bg-[#FFF5F7] border-[#FFE1E5] shadow-xs ring-1 ring-[#800F2F]/10'
                      : 'border-slate-100 bg-white hover:bg-slate-50/50 hover:border-rose-100'
                  }`}
                >
                  {/* Top Subject and Time tags */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${getSubjectColorClasses(lessonObj?.subject)}`}>
                      {lessonObj?.subject || 'Khác'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar size={10} className="text-slate-400" />
                      {note.date} {note.time}
                    </span>
                  </div>

                  {/* Note block teaser */}
                  <div className="space-y-1 min-w-0">
                    <span className="font-bold text-[11px] block text-slate-800 truncate leading-snug-tight">
                      {lessonObj ? lessonObj.title : 'Chưa phân loại bài học'}
                    </span>
                    <p className="text-[10px] text-slate-500 truncate-2-lines leading-snug break-words">
                      {note.content}
                    </p>
                  </div>

                  {/* Attached file badge helper */}
                  {note.fileAttachment && (
                    <div className="flex items-center gap-1 mt-1 text-[8px] font-mono font-bold text-[#800F2F] bg-[#FFF0F2] border border-[#FFE1E5] px-1.5 py-0.5 rounded-md w-fit">
                      <Paperclip size={8} />
                      <span className="truncate max-w-[120px]">{note.fileAttachment.name}</span>
                    </div>
                  )}

                  {/* Hover trash to directly remove */}
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(note.id);
                      }}
                      className="absolute right-2 bottom-2 text-slate-400 hover:text-red-600 transition-colors p-1.5 hover:bg-[#FFF0F2] rounded-md"
                      title="Xóa ghi chép"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 flex flex-col items-center justify-center text-slate-400 gap-2">
              <BookOpen size={28} className="text-slate-300" />
              <span className="text-xs font-bold">Không có bài ghi chú nào</span>
              <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed px-4">Hãy bấm nút "Ghi chú mới" để thiết lập nội dung ghi chép cho bài học của bạn!</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. RIGHT COLUMN: EDITOR CORE PANEL (7 Columns) */}
      <div id="notes-editor-panel" className="lg:col-span-7 bg-white border border-[#FFE1E5] rounded-3xl p-5 flex flex-col h-full shadow-sm overflow-hidden relative">
        {isEditing ? (
          <form onSubmit={handleSave} className="flex flex-col h-full space-y-4">
            
            {/* Editor Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-rose-50 pb-3 gap-3">
              <div>
                <h4 className="font-serif font-black text-sm text-[#800F2F]">
                  {selectedNoteId ? 'Sửa sổ tay ghi chép' : 'Soạn thảo ghi chép'}
                </h4>
                <p className="text-[10px] text-slate-400">Tự động đồng bộ với hồ sơ học tập của bạn</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {!isAdmin && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    <Eye size={11} />
                    Chỉ xem
                  </span>
                )}

                <button
                  type="submit"
                  className={`flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer ${
                    isAdmin
                      ? 'bg-[#800F2F] hover:bg-[#A71E40] text-white active:scale-95'
                      : 'bg-slate-50 text-slate-400 border border-slate-200 hover:text-[#800F2F]'
                  }`}
                >
                  {saveSuccess ? (
                    <>
                      <Check size={14} className="text-emerald-600 bg-emerald-50 p-0.5 rounded" />
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
                <label className="block text-[9px] font-mono uppercase tracking-widest text-[#800F2F] mb-1">
                  Liên kết bài học từ SGK (Bài x)
                </label>
                <select
                  value={lessonId}
                  onChange={(e) => setLessonId(e.target.value)}
                  disabled={!isAdmin}
                  className="w-full px-3 py-2 text-[11px] rounded-xl border border-slate-205 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none disabled:opacity-50"
                >
                  {lessons.some(l => l.id.startsWith('custom-')) && (
                    <optgroup label="✨ Bài học tự do (Tự thêm)">
                      {lessons.filter(l => l.id.startsWith('custom-')).map(lesson => (
                        <option key={lesson.id} value={lesson.id} className="bg-white">
                          [{lesson.subject} Lớp {lesson.grade}] {lesson.title}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup label="📚 Sách giáo khoa chính thức">
                    {lessons.filter(l => !l.id.startsWith('custom-')).map(lesson => (
                      <option key={lesson.id} value={lesson.id} className="bg-white">
                        [{lesson.subject} Lớp {lesson.grade}] - {lesson.title}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Date Input Field */}
              <div className="sm:col-span-3">
                <label className="block text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                  Chọn ngày ghi
                </label>
                <div className="relative">
                  <Calendar size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="date"
                    value={noteDate}
                    onChange={(e) => setNoteDate(e.target.value)}
                    disabled={!isAdmin}
                    className="w-full pl-7.5 pr-2 py-2 text-[11px] rounded-xl border border-slate-205 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none disabled:opacity-50 font-mono"
                  />
                </div>
              </div>

              {/* Time Input Field */}
              <div className="sm:col-span-2">
                <label className="block text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                  Chọn giờ
                </label>
                <div className="relative">
                  <Clock size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="time"
                    value={noteTime}
                    onChange={(e) => setNoteTime(e.target.value)}
                    disabled={!isAdmin}
                    className="w-full pl-7.5 pr-2 py-2 text-[11px] rounded-xl border border-slate-205 bg-white text-slate-800 focus:outline-[#800F2F] focus:outline-none disabled:opacity-50 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Note Rich Textarea Document Sheet */}
            <div className="flex-1 flex flex-col gap-3 min-h-[220px]">
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                disabled={!isAdmin}
                placeholder={
                  isAdmin
                    ? "Hãy viết các công thức, kiến thức lý thuyết nồng nầm quan trọng để đi thi, mẹo nhớ của bạn cho bài học tại đây..."
                    : "Mở khóa quyền ở mục cài đặt hoặc nhấn lưu để liên kết mã PIN (2028)"
                }
                className="w-full h-full flex-1 p-4 text-xs rounded-2xl border border-slate-200 focus:outline-none focus:border-[#800F2F] bg-slate-50/40 resize-none font-sans text-slate-805 leading-relaxed placeholder-slate-400 disabled:opacity-75"
              />
            </div>

            {/* 3. DYNAMIC UPLOAD ATTACHMENT DRAG AREA & FILE RENDERER PANEL */}
            <div className="pt-3 border-t border-rose-50 space-y-3">
              <label className="block text-[9px] font-mono uppercase tracking-widest text-[#800F2F] font-bold">
                Tài liệu học tập đính kèm (PDF, Word, Ảnh đề thi)
              </label>

              {fileAttachment ? (
                /* Attachment Display Card */
                <div className="flex items-center justify-between p-3 rounded-2xl border border-[#FFE1E5] bg-[#FFF8F9] text-xs">
                  <div className="flex items-center gap-2.5 truncate max-w-[70%]">
                    <div className="p-2 rounded-xl bg-white text-[#800F2F] border border-[#FFE1E5] flex-shrink-0">
                      <Paperclip size={14} />
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-slate-800 truncate" title={fileAttachment.name}>
                        {fileAttachment.name}
                      </p>
                      <p className="text-[9px] text-slate-400 font-mono">
                        {fileAttachment.type || 'Ứng dụng/Tệp tin'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* View/Download link */}
                    <a
                      href={fileAttachment.url}
                      download={fileAttachment.name}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#800F2F] hover:border-[#FFE1E5] transition-colors"
                      title="Tải tệp tin về thiết bị"
                    >
                      <Download size={13} />
                    </a>

                    {/* Remove button */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={handleRemoveAttachment}
                        className="p-1.5 rounded-lg bg-white border border-[#FFE1E5] text-red-500 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Gỡ bỏ tệp"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Drag-and-drop / selector area */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all ${
                    isDragging
                      ? 'border-[#800F2F] bg-[#FFF8F9]'
                      : 'border-slate-200 hover:border-rose-200 hover:bg-slate-50/30'
                  } ${!isAdmin ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <input
                    type="file"
                    id="note-file-uploader"
                    disabled={!isAdmin}
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  
                  <label
                    htmlFor={isAdmin ? "note-file-uploader" : undefined}
                    className={`flex flex-col items-center justify-center gap-1.5 w-full h-full ${
                      isAdmin ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                  >
                    <UploadCloud className="text-slate-400 hover:text-[#800F2F] transition-colors" size={24} />
                    <div>
                      <span className="text-[10px] text-slate-600 font-bold">
                        {uploadProgress ? 'Đang đọc dữ liệu...' : 'Kéo thả tệp hoặc Bấm vào đây để tải lên'}
                      </span>
                      <p className="text-[9px] text-slate-400 mt-0.5">Hỗ trợ PDF, file nén đề thi, giáo trình hoặc ảnh chụp công thức</p>
                    </div>
                  </label>
                </div>
              )}
            </div>

          </form>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 gap-3">
            <BookOpen size={48} className="text-rose-100 animate-pulse" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-700">Sổ tay khoa bảng cá nhân</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Học viên hãy chọn một ghi chép học tập ở danh mục bên trái hoặc kích nút <strong className="text-[#800F2F]">"Ghi chú mới"</strong> để bắt đầu soạn các kiến thức hay và tải tài liệu giúp đỗ đạt đại học Phạm Ngọc Thạch nhé!
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
