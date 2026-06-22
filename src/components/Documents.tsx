import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  Link2, 
  Search, 
  Filter, 
  ExternalLink,
  BookOpen,
  Upload
} from 'lucide-react';
import { Lesson } from '../data/defaultLessons';
import { DocumentAsset } from '../types';

interface DocumentsProps {
  lessons: Lesson[];
  assets: DocumentAsset[];
  onAddAsset: (asset: DocumentAsset) => void;
  onDeleteAsset: (assetId: string) => void;
  isAdmin: boolean;
  triggerUnlockModal: () => void;
}

export default function Documents({
  lessons,
  assets,
  onAddAsset,
  onDeleteAsset,
  isAdmin,
  triggerUnlockModal
}: DocumentsProps) {
  const [selectedSubject, setSelectedSubject] = useState<'Tất cả' | 'Toán' | 'Hóa' | 'Sinh' | 'Lý'>('Tất cả');
  const [selectedLessonId, setSelectedLessonId] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  // Form states (Admin Only)
  const [formLessonId, setFormLessonId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<'video' | 'pdf' | 'word' | 'image'>('video');
  const [formUrl, setFormUrl] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Set default form lesson selected inside dropdown on opening
  React.useEffect(() => {
    if (lessons.length > 0 && !formLessonId) {
      setFormLessonId(lessons[0].id);
    }
  }, [lessons, formLessonId]);

  // Local file upload support (Base64 offline caching)
  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Prefill title from filename (remove extension)
    const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    setFormTitle(nameWithoutExt);

    // Auto classify document type
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext || '')) {
      setFormType('pdf');
    } else if (['doc', 'docx', 'txt', 'rtf'].includes(ext || '')) {
      setFormType('word');
    } else if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext || '')) {
      setFormType('image');
    } else {
      setFormType('video');
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFormUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      triggerUnlockModal();
      return;
    }

    if (!formTitle.trim() || !formUrl.trim() || !formLessonId) {
      alert('Vui lòng điền đầy đủ thông tin tài liệu!');
      return;
    }

    // Verify correct resource link URL structure (skip Base64 data)
    let formattedUrl = formUrl.trim();
    if (!formattedUrl.startsWith('data:') && !/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const newAsset: DocumentAsset = {
      id: `doc-${Date.now()}`,
      lessonId: formLessonId,
      title: formTitle.trim(),
      type: formType,
      url: formattedUrl,
      createdAt: new Date().toISOString()
    };

    onAddAsset(newAsset);
    
    // Clear Form inputs
    setFormTitle('');
    setFormUrl('');
    setIsFormOpen(false);
  };

  // Filter study assets
  const filteredAssets = React.useMemo(() => {
    return assets.filter(asset => {
      // Find associated lesson
      const lesson = lessons.find(l => l.id === asset.lessonId);
      if (!lesson) return false;

      const matchSubject = selectedSubject === 'Tất cả' || lesson.subject === selectedSubject;
      const matchLesson = selectedLessonId === 'Tất cả' || asset.lessonId === selectedLessonId;
      const matchSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchSubject && matchLesson && matchSearch;
    });
  }, [assets, lessons, selectedSubject, selectedLessonId, searchQuery]);

  // Lessons list filtered by currently selected subject (for filtering dropdown)
  const dropdownFilteredLessons = React.useMemo(() => {
    if (selectedSubject === 'Tất cả') return lessons;
    return lessons.filter(l => l.subject === selectedSubject);
  }, [lessons, selectedSubject]);

  return (
    <div id="documents-view" className="space-y-6">
      
      {/* 1. HEADER DESCRIPTION ROW */}
      <div id="documents-header" className="bg-white p-6 rounded-3xl border border-[#FFE1E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-xl font-bold text-[#800F2F]">Thư viện Tài liệu & Video giảng</h2>
          <p className="text-xs text-slate-400 mt-1">Lưu trữ các video bài học, đề thi PDF và sơ đồ học tập khoa học</p>
        </div>

        {/* Toggle add document button only for Admin */}
        {isAdmin ? (
          <button
            id="open-add-dialog-btn"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl bg-[#800F2F] text-white text-xs font-bold shadow-md hover:bg-[#A71E40] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus size={16} />
            {isFormOpen ? 'Đóng form' : 'Thêm tài liệu'}
          </button>
        ) : (
          <button
            onClick={triggerUnlockModal}
            className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#800F2F] hover:bg-[#FFF0F2] text-xs font-bold transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus size={16} />
            Thêm tài liệu (PIN)
          </button>
        )}
      </div>

      {/* 2. ADMIN ONLY - ADD ASSET INPUT FORM AREA */}
      {isFormOpen && isAdmin && (
        <form 
          id="add-document-form" 
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-[#FFF5F7] to-white p-6 rounded-3xl border border-[#FFE1E5] shadow-inner space-y-4 animate-fadeIn"
        >
          <h4 className="text-sm font-bold text-[#800F2F]">Đăng tải tài liệu học tập</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold text-[#800F2F]/80 uppercase font-mono mb-1.5Packed font-medium">Tiêu đề tài liệu</label>
              <input
                type="text"
                placeholder="Ví dụ: Đề thi thử Toán - Chương 1 (PDF Quy chuẩn)"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] bg-white transition-all text-slate-800"
              />
            </div>

            {/* URL/Link input */}
            <div>
              <label className="block text-[11px] font-bold text-[#800F2F]/80 uppercase font-mono mb-1.5">Đường dẫn tài liệu (URL)</label>
              <input
                type="text"
                placeholder="Dán link drive/youtube hoặc tự động điền bằng cách Tải file dưới đây..."
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                required
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] bg-white transition-all text-slate-800"
              />
            </div>
          </div>

          {/* DUAL MODE UPLOAD DIRECTLY FROM DEVICE SECTION */}
          <div className="bg-[#FFF5F7] p-4 rounded-2xl border border-dashed border-[#FFE1E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-[#800F2F] uppercase tracking-wide font-mono block">✦ Đăng tệp trực tiếp từ máy tính</span>
              <p className="text-[9px] text-slate-500">Hỗ trợ PDF, Word (.docx), hình ảnh chuyên sâu... Hệ thống tự nhận diện thể loại!</p>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="px-4 py-2 rounded-xl bg-[#800F2F] hover:bg-[#A71E40] text-white text-[10px] font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5">
                <Upload size={12} />
                Chọn File nội bộ...
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.gif,.webp,.txt"
                  onChange={handleLocalFileUpload}
                  className="hidden"
                />
              </label>

              {formUrl && (
                <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-250 px-2.5 py-1.5 rounded-lg max-w-[170px] truncate" title={formUrl}>
                  ✓ Đã chọn ({formUrl.startsWith('data:') ? 'Tệp Cục Bộ' : 'Url Ngoài'})
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Associated Lesson Dropdown Selection */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-[#800F2F]/80 uppercase font-mono mb-1.5">Gắn vào bài học tương ứng</label>
              <select
                value={formLessonId}
                onChange={(e) => setFormLessonId(e.target.value)}
                className="w-full px-4 py-2 text-xs rounded-xl border border-[#FFE1E5] focus:outline-none focus:border-[#800F2F] bg-white text-slate-700"
              >
                {lessons.map(l => (
                  <option key={l.id} value={l.id}>
                    [{l.subject} {l.grade}] {l.title} ({l.chapter.substring(0, 15)}...)
                  </option>
                ))}
              </select>
            </div>

            {/* Content Asset Type selection */}
            <div>
              <label className="block text-[11px] font-bold text-[#800F2F]/80 uppercase font-mono mb-1.5">Thể loại</label>
              <div className="flex gap-1.5 p-1 bg-white border border-[#FFE1E5] rounded-xl">
                {(['video', 'pdf', 'word', 'image'] as const).map((type) => {
                  let str = 'Video';
                  if (type === 'pdf') str = 'PDF';
                  if (type === 'word') str = 'Doc';
                  if (type === 'image') str = 'Ảnh';

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormType(type)}
                      className={`flex-1 text-[10px] py-1.5 rounded-lg font-bold transition-all ${
                        formType === type 
                          ? 'bg-[#800F2F] text-white shadow-sm' 
                          : 'text-slate-400 hover:text-[#800F2F]'
                      }`}
                    >
                      {str}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-[#800F2F] text-white text-xs font-bold hover:bg-[#A71E40] transition-colors shadow-sm cursor-pointer"
            >
              Lưu tài liệu
            </button>
          </div>
        </form>
      )}

      {/* 3. SEARCH & EXPLORER CONTROLS FILTERS */}
      <div id="explorer-controls" className="bg-white p-5 rounded-3xl border border-[#FFE1E5] shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Subject Filter Dropdown */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Lọc môn học</label>
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value as any);
              setSelectedLessonId('Tất cả'); // reset lesson selection on subject change
            }}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:border-[#800F2F] text-slate-700"
          >
            <option value="Tất cả">Tất cả các môn</option>
            <option value="Toán">Toán</option>
            <option value="Hóa">Hóa</option>
            <option value="Sinh">Sinh</option>
            <option value="Lý">Lý</option>
          </select>
        </div>

        {/* Lesson-specific dropdown map */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Cụ thể từng bài học</label>
          <select
            value={selectedLessonId}
            onChange={(e) => setSelectedLessonId(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:border-[#800F2F] text-slate-700 truncate"
          >
            <option value="Tất cả">Tất cả các bài</option>
            {dropdownFilteredLessons.map(l => (
              <option key={l.id} value={l.id}>
                [{l.subject}] {l.title}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input bar */}
        <div>
          <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Tìm kiếm từ khóa</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Nhập tên tài liệu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:border-[#800F2F] text-slate-800"
            />
          </div>
        </div>
      </div>

      {/* 4. DOCUMENTS GALLERY TILES */}
      <div id="documents-list-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAssets.length > 0 ? (
          filteredAssets.map((asset) => {
            const lesson = lessons.find(l => l.id === asset.lessonId);
            
            // Icon assignment based on asset format
            let Icon = FileText;
            let iconColorClass = 'text-sky-600 bg-sky-50';
            let tagSubjectColor = 'bg-[#FFF0F2] text-[#800F2F]';
            
            if (asset.type === 'video') {
              Icon = Video;
              iconColorClass = 'text-rose-600 bg-rose-50';
            } else if (asset.type === 'image') {
              Icon = ImageIcon;
              iconColorClass = 'text-amber-600 bg-amber-50';
            } else if (asset.type === 'word') {
              Icon = FileText;
              iconColorClass = 'text-blue-600 bg-blue-50';
            }

            if (lesson && lesson.subject === 'Hóa') tagSubjectColor = 'bg-amber-50 text-amber-700';
            if (lesson && lesson.subject === 'Sinh') tagSubjectColor = 'bg-emerald-50 text-emerald-700';
            if (lesson && lesson.subject === 'Lý') tagSubjectColor = 'bg-sky-50 text-sky-700';

            return (
              <div 
                key={asset.id} 
                id={`document-tile-${asset.id}`}
                className="bg-white p-5 rounded-3xl border border-slate-100 hover:border-[#FFE1E5] flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group"
              >
                {/* Header layout content info card */}
                <div className="space-y-2.5">
                  <div className="flex justify-between items-start gap-4">
                    <div className={`p-3 rounded-2xl ${iconColorClass} flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    {/* Delete button only showing to Admins */}
                    {isAdmin && (
                      <button
                        id={`delete-asset-btn-${asset.id}`}
                        onClick={() => {
                          if (confirm('Bạn có thực sự muốn xóa tài liệu này?')) {
                            onDeleteAsset(asset.id);
                          }
                        }}
                        title="Xóa tài liệu"
                        className="p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50/60 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug truncate-2-lines group-hover:text-[#800F2F] transition-colors" title={asset.title}>
                      {asset.title}
                    </h3>
                    {lesson && (
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                        <BookOpen size={10} />
                        Bài học: <span className="font-medium underline decoration-dotted max-w-[170px] truncate block">{lesson.title}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer and external link */}
                <div className="flex items-center justify-between border-t border-slate-50 pt-3.5 mt-auto">
                  {lesson && (
                    <span className={`text-[9px] font-extrabold font-mono tracking-wider px-2 py-0.5 rounded-md ${tagSubjectColor}`}>
                      {lesson.subject} LỚP {lesson.grade}
                    </span>
                  )}
                  <a
                    id={`doc-external-link-${asset.id}`}
                    href={asset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-[#800F2F] hover:text-[#A71E40] transition-colors cursor-pointer"
                  >
                    Xem tài liệu
                    <ExternalLink size={12} />
                  </a>
                </div>

              </div>
            );
          })
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-[#FFE1E5] text-center col-span-full max-w-sm mx-auto">
            <Filter className="mx-auto text-slate-200 mb-3" size={32} />
            <h4 className="text-sm font-bold text-slate-800">Không tìm thấy tài liệu</h4>
            <p className="text-xs text-slate-400 mt-1">Chưa có tài liệu nào thuộc bài học hoặc môn này. Bạn có thể tự thêm bằng quyền Admin!</p>
          </div>
        )}
      </div>

    </div>
  );
}
