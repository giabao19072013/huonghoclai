import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Flame, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Activity, 
  HeartHandshake,
  Play,
  AlertTriangle,
  ArrowRight,
  Lock,
  Unlock,
  Check,
  X
} from 'lucide-react';

interface GoalUniversityProps {
  onNavigate?: (tab: string) => void;
  isAdmin?: boolean;
}

interface Milestone {
  id: string;
  title: string;
  desc: string;
}

const MILESTONES: Milestone[] = [
  { id: 'class-10-done', title: "Hoàn thành lớp 10", desc: "Một chặng học bồi dưỡng căn bản vững vàng" },
  { id: 'class-11-term-1-done', title: "Hoàn thành học kỳ I lớp 11", desc: "Xâu chuỗi lý thuyết nâng cao bước đầu" },
  { id: 'class-11-done', title: "Hoàn thành lớp 11", desc: "Giai đoạn nước rút về kỹ thuật giải bài thi mẫu" },
  { id: 'test-1-done', title: "Thi thử lần 1", desc: "Cọ xát lực học chuẩn bị cho đấu trường thi khối" },
  { id: 'test-2-done', title: "Thi thử lần 2", desc: "Ổn định tinh thần, rà soát lại kỹ năng phản xạ lý thuyết" },
  { id: 'exam-2028-done', title: "Kỳ thi THPTQG 2028", desc: "Bước đệm then chốt quyết định chiếc áo blouse y khoa" },
];

export default function GoalUniversity({ onNavigate, isAdmin = false }: GoalUniversityProps) {
  const [history, setHistory] = React.useState<any[]>([]);
  
  // Local state for checking if the timeline is unlocked via local passcode "2028"
  const [localUnlocked, setLocalUnlocked] = React.useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = React.useState(false);
  const [passcodeInput, setPasscodeInput] = React.useState('');
  const [passcodeError, setPasscodeError] = React.useState(false);
  const [targetMilestoneId, setTargetMilestoneId] = React.useState<string | null>(null);

  // Milestone check state
  const [milestoneStates, setMilestoneStates] = React.useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('huong_milestones');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse milestones from storage', e);
      }
    }
    return {
      'class-10-done': true,
      'class-11-term-1-done': true,
      'class-11-done': false,
      'test-1-done': false,
      'test-2-done': false,
      'exam-2028-done': false
    };
  });

  const isUnlockedGlobally = isAdmin || localUnlocked || localStorage.getItem('HUONG_ADMIN_LOGGED_IN') === 'true';

  React.useEffect(() => {
    const saved = localStorage.getItem('quiz_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load quiz history', e);
      }
    }
  }, []);

  // Helper to extract the latest score on a 10-point scale for a subject
  const getSubjectLatestScore = (subjectName: string): number | null => {
    const entries = history.filter(h => h.subject === subjectName);
    if (entries.length === 0) return null;
    
    // The history entries are saved newer-first, so index 0 is latest
    const latest = entries[0];
    const score10 = (latest.score / latest.totalQuestions) * 10;
    return Math.round(score10 * 10) / 10; // round to 1 decimal place, e.g. 7.2
  };

  const mathScore = getSubjectLatestScore('Toán');
  const physicsScore = getSubjectLatestScore('Lý');
  const chemistryScore = getSubjectLatestScore('Hóa');
  const biologyScore = getSubjectLatestScore('Sinh');

  // Check if student has taken tests for all 4 required subjects
  const hasAllScores = mathScore !== null && physicsScore !== null && chemistryScore !== null && biologyScore !== null;

  // Combination calculation: B00 (Toán - Hóa - Sinh)
  const combinationLabel = "B00 (Toán - Hóa - Sinh)";
  const totalFormulaScore = hasAllScores && mathScore !== null && chemistryScore !== null && biologyScore !== null
    ? Math.round((mathScore + chemistryScore + biologyScore) * 10) / 10
    : null;

  const targetScore = 25.0;
  const progressPercent = totalFormulaScore !== null 
    ? Math.min(100, Math.round((totalFormulaScore / targetScore) * 100))
    : null;

  const pointGap = totalFormulaScore !== null 
    ? Math.max(0, Math.round((targetScore - totalFormulaScore) * 10) / 10) 
    : null;

  // Average score increase needed per subject for the 3 combo subjects
  const neededIncreasePerSubject = pointGap !== null 
    ? Math.round((pointGap / 3) * 100) / 100 
    : null;

  // Toggle single milestone state and persist
  const toggleMilestone = (id: string) => {
    const updated = {
      ...milestoneStates,
      [id]: !milestoneStates[id]
    };
    setMilestoneStates(updated);
    localStorage.setItem('huong_milestones', JSON.stringify(updated));
  };

  // Triggered when user attempts to check/uncheck a milestone
  const handleMilestoneClick = (id: string) => {
    if (isUnlockedGlobally) {
      // Direct toggle if already authorized
      toggleMilestone(id);
    } else {
      // Prompt for passcode modal
      setTargetMilestoneId(id);
      setIsPasscodeModalOpen(true);
      setPasscodeError(false);
      setPasscodeInput('');
    }
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === '2028') {
      setLocalUnlocked(true);
      setIsPasscodeModalOpen(false);
      setPasscodeError(false);
      if (targetMilestoneId) {
        toggleMilestone(targetMilestoneId);
        setTargetMilestoneId(null);
      }
    } else {
      setPasscodeError(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      id="goal-university-view" 
      className="space-y-6 text-slate-800 font-sans pb-12"
    >
      {/* HEADER SECTION */}
      <div id="goal-header" className="bg-white p-6 rounded-3xl border border-[#FFE1E5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="font-serif text-xl font-black text-[#800F2F] flex items-center gap-2">
            <span>🎯 Đích đến của Hương</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Mỗi bài học hôm nay là một bước tiến gần hơn đến chiếc áo blouse trắng.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#FFF0F2] text-[#800F2F] border border-[#FFE1E5] self-start sm:self-auto">
          <Sparkles size={14} className="text-[#800F2F] animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#800F2F]">Hành trình 2028</span>
        </div>
      </div>

      {hasAllScores ? (
        /* ==================== SCREEN A: FULLY DETAILED DASHBOARD with real scores ==================== */
        <>
          {/* TWO COLUMN GRID FOR HERO AND PROGRESS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* SECTION 1 - MỤC TIÊU HIỆN TẠI (Left Column - 7/12) */}
            <div className="lg:col-span-7 flex flex-col">
              <motion.div 
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex-1 bg-gradient-to-br from-[#800F2F] to-[#A71E40] text-white p-6 rounded-3xl shadow-md border border-[#800F2F]/20 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-xl text-[10px] font-mono tracking-wider backdrop-blur-sm uppercase">
                      Mục tiêu hiện tại
                    </span>
                    <h3 className="font-serif font-black text-lg md:text-xl flex items-center gap-2 mt-2">
                      <GraduationCap size={22} className="text-rose-200" />
                      Đại học Y khoa Phạm Ngọc Thạch
                    </h3>
                    <p className="text-xs text-rose-100 flex items-center gap-1.5 mt-1.5">
                      <span className="font-medium text-rose-200">Ngành:</span> Y khoa
                    </p>
                  </div>

                  <div className="text-right whitespace-nowrap bg-white/10 px-3.5 py-2.5 rounded-2xl border border-white/5 backdrop-blur-sm shadow-sm flex flex-col items-end">
                    <div className="flex items-center gap-1 text-[10px] font-mono font-black text-rose-200 uppercase tracking-wider">
                      <Flame size={12} className="text-amber-300 animate-pulse" />
                      THPTQG 2028
                    </div>
                    <div className="text-xl font-black font-serif text-white tracking-tight mt-0.5">
                      734 ngày
                    </div>
                    <div className="text-[9px] text-rose-200 font-mono">còn lại</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-8 pt-4 border-t border-white/10">
                  <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                    <div className="text-[9px] font-mono text-rose-200 uppercase tracking-wider">Mục tiêu</div>
                    <div className="text-sm font-black font-serif mt-0.5">{targetScore} điểm</div>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                    <div className="text-[9px] font-mono text-rose-200 uppercase tracking-wider">Ước mơ</div>
                    <div className="text-sm font-black font-serif mt-0.5">Bác sĩ</div>
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-2xl border border-white/5">
                    <div className="text-[9px] font-mono text-rose-200 uppercase tracking-wider">Chuyên đề</div>
                    <div className="text-sm font-black font-serif mt-0.5 truncate" title="Khúc xạ">Khúc xạ</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* SECTION 2 - TIẾN ĐỘ ĐẾN MỤC TIÊU (Right Column - 5/12) */}
            <div className="lg:col-span-5 flex flex-col">
              <motion.div 
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="flex-1 bg-white p-6 rounded-3xl border border-[#FFE1E5] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-black text-[#800F2F] tracking-widest uppercase bg-[#FFF0F2] px-2.5 py-1 rounded-lg border border-[#FFE1E5]">
                      Tiến độ đến mục tiêu
                    </span>
                    <span className="text-xs text-[#800F2F] font-bold">{progressPercent}%</span>
                  </div>
                  
                  <div className="text-center py-3">
                    <span className="font-serif text-3xl font-black text-[#800F2F] tracking-tight">{progressPercent}%</span>
                    <p className="text-xs font-mono font-bold text-slate-500 uppercase mt-0.5">Đang trên hành trình</p>
                  </div>

                  {/* Progress bar scale */}
                  <div className="w-full h-4 bg-rose-50 rounded-full overflow-hidden border border-[#FFE1E5] mt-4 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#800F2F] to-[#E63946] rounded-full"
                    />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-rose-50 text-center">
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Bạn còn thiếu khoảng <span className="font-bold text-[#800F2F]">{pointGap} điểm</span> để chạm mốc {targetScore} điểm.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

          {/* SECOND GRID BLOCK FOR SCORE STATS AND CALCULATION GAP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* SECTION 3 - KẾT QUẢ HIỆN TẠI */}
            <motion.div 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="bg-white p-6 rounded-3xl border border-[#FFE1E5] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b border-rose-50">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#800F2F]" />
                    <h4 className="font-serif font-black text-sm text-[#800F2F]">Kết quả hiện tại</h4>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold ${
                    (totalFormulaScore ?? 0) >= targetScore ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      (totalFormulaScore ?? 0) >= targetScore ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                    {(totalFormulaScore ?? 0) >= targetScore ? 'Đã đạt mục tiêu' : 'Đang phấn đấu'}
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 mt-2 italic leading-relaxed">
                  (Điểm số thực tế được lấy trực tiếp từ lịch sử các bài kiểm tra giả lập gần nhất của Hương)
                </p>

                <div className="grid grid-cols-2 gap-3.5 mt-4">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Toán</span>
                    <span className="text-xs font-extrabold text-[#800F2F] font-mono">{mathScore}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Lý</span>
                    <span className="text-xs font-extrabold text-[#800F2F] font-mono">{physicsScore}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Hóa</span>
                    <span className="text-xs font-extrabold text-[#800F2F] font-mono">{chemistryScore}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Sinh</span>
                    <span className="text-xs font-extrabold text-[#800F2F] font-mono">{biologyScore}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-50 flex flex-col gap-1.5 bg-rose-50/20 -mx-6 -mb-6 p-4 rounded-b-3xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Tổ hợp tính điểm</span>
                  <span className="text-[10px] font-bold text-[#800F2F] font-mono">{combinationLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase font-black">Điểm tổ hợp hiện tại</span>
                  <span className="font-serif font-black text-base text-[#800F2F]">{totalFormulaScore} / 30</span>
                </div>
              </div>
            </motion.div>

            {/* SECTION 5 - KHOẢNG CÁCH ĐẾN MỤC TIÊU */}
            <motion.div 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="bg-white p-6 rounded-3xl border border-[#FFE1E5] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="pb-3.5 border-b border-rose-50 flex items-center gap-2">
                  <Award size={16} className="text-[#800F2F]" />
                  <h4 className="font-serif font-black text-sm text-[#800F2F]">Khoảng cách đến mục tiêu</h4>
                </div>

                <div className="space-y-3 mt-5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-400">Điểm mục tiêu</span>
                    <span className="font-serif font-black text-[#800F2F]">{targetScore} điểm</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-400">Điểm hiện tại</span>
                    <span className="font-serif font-black text-amber-600">{totalFormulaScore} điểm</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2 border-t border-dashed border-slate-200">
                    <span className="font-bold text-slate-600">Còn cách mục tiêu</span>
                    <span className="font-serif font-black text-red-600 text-sm bg-red-50 px-2 py-0.5 rounded-lg border border-red-100">
                      {pointGap} điểm
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-50">
                <div className="bg-[#FFF0F2] p-3 rounded-2xl border border-[#FFE1E5] flex items-start gap-2.5">
                  <Sparkles size={14} className="text-[#800F2F] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#800F2F] font-medium leading-relaxed">
                    {pointGap !== null && pointGap > 0 ? (
                      <>
                        Nếu mỗi môn tích lũy thêm trung bình <span className="font-black">{neededIncreasePerSubject} điểm</span>, Hương sẽ đạt mục tiêu {targetScore} điểm.
                      </>
                    ) : (
                      <>
                        Chúc mừng Hương đã hoàn thành xuất sắc mục tiêu điểm số tổ hợp {targetScore} điểm cho Đại học Phạm Ngọc Thạch!
                      </>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* SECTION 6 - NGÔI TRƯỜNG MỤC TIÊU */}
            <motion.div 
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="bg-white p-6 rounded-3xl border border-[#FFE1E5] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="pb-3.5 border-b border-rose-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#800F2F]" />
                    <h4 className="font-serif font-black text-sm text-[#800F2F]">Ngôi trường mục tiêu</h4>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[9px] font-mono font-bold ${
                    (totalFormulaScore ?? 0) >= targetScore ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      (totalFormulaScore ?? 0) >= targetScore ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                    {(totalFormulaScore ?? 0) >= targetScore ? 'Đã đạt' : 'Đang phấn đấu'}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5">
                  <h5 className="font-serif font-black text-xs md:text-sm text-[#800F2F]">
                    Đại học Y khoa Phạm Ngọc Thạch
                  </h5>
                  <div className="text-[10px] space-y-1 text-slate-500">
                    <p><span className="font-semibold text-slate-400">Ngành học:</span> Y khoa</p>
                    <p><span className="font-semibold text-slate-400">Điểm mục tiêu:</span> {targetScore} điểm ({combinationLabel})</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-rose-50">
                <p className="text-[11px] italic text-slate-400 leading-relaxed text-center">
                  "Không phải ngày nào cũng hoàn hảo, nhưng mỗi ngày học tập đều đưa bạn gần hơn đến mục tiêu."
                </p>
              </div>
            </motion.div>

          </div>
        </>
      ) : (
        /* ==================== SCREEN B: LOCKED STATE WITH ACTUAL TEST REQUIREMENTS ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* TARGET INFO STATIC CARD (Left Column - 5/12) */}
          <div className="lg:col-span-4 flex flex-col">
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex-1 bg-gradient-to-br from-[#800F2F] to-[#A71E40] text-white p-6 rounded-3xl shadow-md border border-[#800F2F]/20 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 bg-white/10 text-white rounded-xl text-[10px] font-mono tracking-wider backdrop-blur-sm uppercase">
                  Mục tiêu mơ ước
                </span>
                <div>
                  <h3 className="font-serif font-black text-base md:text-lg flex items-center gap-2">
                    <GraduationCap size={20} className="text-rose-200 shrink-0" />
                    ĐH Y khoa Phạm Ngọc Thạch
                  </h3>
                  <p className="text-[11px] text-rose-100 flex items-center gap-1.5 mt-2">
                    <span className="font-medium text-rose-200">Khoa học:</span> Y khoa (Bác sĩ tương lai)
                  </p>
                  <p className="text-[11px] text-rose-100 flex items-center gap-1.5 mt-0.5">
                    <span className="font-medium text-rose-200">Điểm tối thiểu:</span> 25.0 điểm
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-mono text-rose-200 uppercase tracking-wider">Kỳ thi THPTQG 2028</div>
                  <div className="text-lg font-black font-serif mt-0.5">734 ngày còn lại</div>
                </div>
                <Flame size={24} className="text-amber-400 animate-pulse shrink-0" />
              </div>
            </motion.div>
          </div>

          {/* DYNAMIC WARNING BLOCK REPLACING FAKE SCORES (Right Column - 8/12) */}
          <div className="lg:col-span-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-dashed border-[#FFE1E5] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
                    <AlertTriangle size={24} className="animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-sm md:text-base text-[#800F2F]">
                      Chưa đủ dữ liệu kết quả kiểm tra
                    </h3>
                    <p className="text-[10px] font-mono tracking-wider text-amber-700 uppercase mt-0.5">
                      Đang thiếu điểm số thực tế
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                  Hệ thống <span className="font-bold text-[#800F2F]">không đồng ý sử dụng điểm số ảo</span> để vẽ đồ thị tiến trình học tập. 
                  Hương cần thực hiện ít nhất <span className="font-black text-[#800F2F]">1 bài thi kiểm tra giả lập</span> cho mỗi môn học trong danh sách bên dưới để mở khóa tiến độ thật:
                </p>

                {/* Score list with test status indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  <div className={`p-3 rounded-2xl border flex flex-col justify-between gap-1 transition-all ${
                    mathScore !== null ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/20 border-rose-100'
                  }`}>
                    <span className="text-[10px] font-bold text-slate-500">Môn Toán</span>
                    {mathScore !== null ? (
                      <span className="text-xs font-black text-emerald-700 font-mono">Đã thi: {mathScore}đ</span>
                    ) : (
                      <span className="text-[10px] font-medium text-red-600 font-mono flex items-center gap-1">⚠️ Chưa thi</span>
                    )}
                  </div>

                  <div className={`p-3 rounded-2xl border flex flex-col justify-between gap-1 transition-all ${
                    physicsScore !== null ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/20 border-rose-100'
                  }`}>
                    <span className="text-[10px] font-bold text-slate-500">Môn Lý</span>
                    {physicsScore !== null ? (
                      <span className="text-xs font-black text-emerald-700 font-mono">Đã thi: {physicsScore}đ</span>
                    ) : (
                      <span className="text-[10px] font-medium text-red-600 font-mono flex items-center gap-1">⚠️ Chưa thi</span>
                    )}
                  </div>

                  <div className={`p-3 rounded-2xl border flex flex-col justify-between gap-1 transition-all ${
                    chemistryScore !== null ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/20 border-rose-100'
                  }`}>
                    <span className="text-[10px] font-bold text-slate-500">Môn Hóa</span>
                    {chemistryScore !== null ? (
                      <span className="text-xs font-black text-emerald-700 font-mono">Đã thi: {chemistryScore}đ</span>
                    ) : (
                      <span className="text-[10px] font-medium text-red-600 font-mono flex items-center gap-1">⚠️ Chưa thi</span>
                    )}
                  </div>

                  <div className={`p-3 rounded-2xl border flex flex-col justify-between gap-1 transition-all ${
                    biologyScore !== null ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/20 border-rose-100'
                  }`}>
                    <span className="text-[10px] font-bold text-slate-500">Môn Sinh</span>
                    {biologyScore !== null ? (
                      <span className="text-xs font-black text-emerald-700 font-mono">Đã thi: {biologyScore}đ</span>
                    ) : (
                      <span className="text-[10px] font-medium text-red-600 font-mono flex items-center gap-1">⚠️ Chưa thi</span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
                  <span className="font-bold text-slate-700 block mb-1">💡 Hướng dẫn làm bài thi:</span>
                  Chuyển sang mục <span className="font-bold text-[#800F2F]">"Giả lập kiểm tra"</span> ở thanh bên Sidebar, chọn môn học tương ứng và tiến hành làm bài kiểm tra thi thử.
                </div>
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('quiz')}
                  className="mt-6 w-full sm:w-auto self-start px-5 py-3 rounded-2xl bg-[#800F2F] hover:bg-[#A71E40] text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-[#800f2f]/10"
                >
                  <Play size={13} className="fill-current" />
                  Bắt đầu bài kiểm tra ngay
                  <ArrowRight size={13} />
                </button>
              )}
            </motion.div>
          </div>

        </div>
      )}

      {/* SECTION 4 - CÁC MỐC QUAN TRỌNG (Vertical Timeline with manual tick & verification) */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        id="milestone-timeline-section"
        className="bg-white p-6 rounded-3xl border border-[#FFE1E5] shadow-sm relative overflow-hidden"
      >
        <div className="pb-4 border-b border-rose-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-[#800F2F]" />
            <h4 className="font-serif font-black text-sm text-[#800F2F]">Các mốc quan trọng</h4>
            <div className="text-[10px] text-slate-400 font-medium">
              (Hương tự tick ghi nhận tiến độ)
            </div>
          </div>

          {/* Locked/Unlocked session status pills */}
          <div className="flex items-center gap-2">
            {isUnlockedGlobally ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold">
                <Unlock size={11} className="text-emerald-600" />
                Đã mở khóa sửa đổi
                <button 
                  onClick={() => {
                    setLocalUnlocked(false);
                    localStorage.removeItem('HUONG_ADMIN_LOGGED_IN');
                    // Lock global state back as requested
                    window.location.reload();
                  }}
                  title="Nhấn để khóa lại"
                  className="ml-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={10} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setTargetMilestoneId(null);
                  setIsPasscodeModalOpen(true);
                  setPasscodeInput('');
                  setPasscodeError(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#800F2F] border border-[#FFE1E5] text-[10px] font-bold hover:bg-[#FFF0F2] transition-all cursor-pointer"
              >
                <Lock size={11} className="text-[#800F2F]" />
                Cần passcode để tích mốc
              </button>
            )}
          </div>
        </div>

        {/* Timeline body structure */}
        <div className="mt-6 pl-2 relative">
          {/* Vertical guideline line */}
          <div className="absolute left-[20px] top-3 bottom-3 w-0.5 bg-rose-100/70" />

          <div className="space-y-6 relative">
            {MILESTONES.map((milestone, idx) => {
              const isChecked = !!milestoneStates[milestone.id];
              return (
                <div 
                  key={milestone.id} 
                  id={`milestone-item-${milestone.id}`}
                  className="flex items-start gap-4 group hover:bg-slate-50/55 p-1 rounded-2xl transition-all"
                >
                  {/* Tick circle interface button */}
                  <button
                    onClick={() => handleMilestoneClick(milestone.id)}
                    className="z-10 bg-white rounded-full p-0.5 transition-transform hover:scale-110 cursor-pointer"
                    aria-label={`Toggle ${milestone.title}`}
                  >
                    {isChecked ? (
                      <CheckCircle2 size={24} className="text-emerald-700 fill-emerald-50 bg-white" />
                    ) : (
                      <div className="w-[24px] h-[24px] rounded-full border-2 border-slate-300 hover:border-[#800F2F] bg-white flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-[#800F2F]/30 transition-colors" />
                      </div>
                    )}
                  </button>

                  <div 
                    onClick={() => handleMilestoneClick(milestone.id)}
                    className="cursor-pointer select-none flex-1 space-y-0.5"
                  >
                    <h5 className={`text-[12px] font-bold transition-all ${
                      isChecked ? 'text-slate-800 line-through decoration-slate-400 font-extrabold' : 'text-slate-700'
                    }`}>
                      {milestone.title}
                    </h5>
                    <p className={`text-[10px] font-mono transition-all ${
                      isChecked ? 'text-slate-400 font-medium' : 'text-slate-500'
                    }`}>
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* SECTION 7 - CÂN TRUYỀN ĐỘNG LỰC (Motivational card) */}
      <motion.div 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        className="bg-[#FFF8F9] p-6 rounded-3xl border border-[#FFE1E5] shadow-sm relative overflow-hidden"
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-100/40 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-2 mb-3.5">
          <HeartHandshake className="text-[#800F2F]" size={18} />
          <h4 className="font-serif font-black text-sm text-[#800F2F]">✨ Góc động lực</h4>
        </div>

        <blockquote className="space-y-2">
          <p className="font-serif text-base font-black text-[#800F2F] tracking-wide relative z-10 italic">
            "734 ngày nữa.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed relative z-10 font-medium">
            Mỗi bài tập hoàn thành hôm nay đều là một bước gần hơn đến chiếc áo blouse trắng mà Hương hằng mong ước."
          </p>
        </blockquote>
      </motion.div>

      {/* MODAL OVERLAY PIN PROMPT DIALOG */}
      <AnimatePresence>
        {isPasscodeModalOpen && (
          <div id="passcode-verification-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPasscodeModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              id="passcode-card"
              className="bg-white rounded-3xl border border-[#FFE1E5] shadow-xl p-6 w-full max-w-sm z-10 relative space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-[#FFF0F2]">
                <h3 className="font-serif font-black text-sm text-[#800F2F] flex items-center gap-2">
                  <Lock size={15} />
                  Xác thực quyền tiếp cận
                </h3>
                <button 
                  onClick={() => setIsPasscodeModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Vui lòng nhập mã passcode học tập để ghi nhận hoặc chỉnh sửa các cột mốc quan trọng của Hương.
              </p>

              <form onSubmit={handlePasscodeSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="passcode-input" className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase">
                    Mã Passcode (Mã PIN):
                  </label>
                  <input 
                    type="password"
                    id="passcode-input"
                    maxLength={10}
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      setPasscodeError(false);
                    }}
                    placeholder="••••"
                    className={`w-full px-4 py-2.5 rounded-xl border font-mono text-center tracking-widest text-lg bg-slate-50 focus:outline-none focus:bg-white text-slate-800 ${
                      passcodeError ? 'border-red-500 focus:border-red-500 bg-red-50/20' : 'border-slate-200 focus:border-[#800F2F]'
                    }`}
                    autoFocus
                  />
                  {passcodeError && (
                    <p className="text-[10px] font-bold text-red-500 mt-1">
                      ⚠️ Mã passcode không đúng. Vui lòng thử lại.
                    </p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPasscodeModalOpen(false)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-[#800F2F] hover:bg-[#A71E40] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-[#800f2f]/15"
                  >
                    <Check size={13} />
                    Xác nhận
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
