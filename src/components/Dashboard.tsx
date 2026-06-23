import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Map, 
  Calendar as CalendarIcon, 
  ClipboardList, 
  GraduationCap,
  Sparkles,
  BookOpen,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Heart,
  Stethoscope
} from 'lucide-react';
import { Lesson } from '../data/defaultLessons';
import { LessonProgress, StudySchedule } from '../types';

interface MedTerm {
  term: string;
  pronunciation?: string;
  vietnamese: string;
  etymology?: string;
  description: string;
  clinical: string;
  funFact?: string;
}

const MEDICAL_TERMS: MedTerm[] = [
  {
    term: "Cornea",
    pronunciation: "/ˈkɔːr.ni.ə/",
    vietnamese: "Giác mạc",
    etymology: "Từ tiếng La-tinh cổ 'cornua' (sừng), mô tả lớp màng trong suốt dai như sừng.",
    description: "Lớp màng ngoài cùng cực kỳ trong suốt bảo vệ mắt, chịu trách nhiệm hội tụ phần lớn ánh sáng đi vào mắt.",
    clinical: "Trong nhãn khoa, ghép giác mạc (keratoplasty) có thể giúp phục hồi thị lực cho những người có giác mạc bị tổn thương hoặc sẹo.",
    funFact: "Giác mạc là một trong số rất hiếm các mô trên cơ thể người không hề có mạch máu. Nó nhận oxy trực tiếp từ không khí bên ngoài hòa tan vào nước mắt!"
  },
  {
    term: "Myopia",
    pronunciation: "/maɪˈoʊ.pi.ə/",
    vietnamese: "Tật cận thị",
    etymology: "Từ tiếng Hy Lạp 'myein' (nhắm mắt) + 'ops' (mắt), do người cận thị hay nheo mắt để nhìn rõ.",
    description: "Trạng thái trục nhãn cầu quá dài hoặc giác mạc quá cong, khiến hình ảnh hội tụ ở phía trước võng mạc thay vì trên võng mạc.",
    clinical: "Được khắc phục bằng cách đeo thấu kính phân kỳ (kính lõm) hoặc phẫu thuật khúc xạ bằng laser (LASIK/ReLEx SMILE) để làm mỏng giác mạc.",
    funFact: "Hương đang học chuyên đề khúc xạ vật lý, đây chính là sự giao thoa hoàn hảo giữa Vật lý lớp 11 và Y học nhãn khoa đấy!"
  },
  {
    term: "Erythrocyte",
    pronunciation: "/ɪˈrɪθ.rə.saɪt/",
    vietnamese: "Tế bào hồng cầu",
    etymology: "Từ tiếng Hy Lạp 'erythros' (đỏ) + 'kytos' (tế bào rỗng).",
    description: "Tế bào máu phổ biến nhất, đảm nhận vai trò vận chuyển oxy từ phổi đến các mô và đưa CO2 từ các mô về phổi để thải ra ngoài.",
    clinical: "Xét nghiệm tổng phân tích tế bào máu (CBC) dùng để đánh giá số lượng hồng cầu, giúp chẩn đoán tình trạng thiếu máu (anemia) hoặc đa hồng cầu.",
    funFact: "Tế bào hồng cầu trưởng thành của người không có nhân và không có ty thể, giúp dành tối đa không gian để chứa phân tử Hemoglobin vận chuyển oxy!"
  },
  {
    term: "Neuron",
    pronunciation: "/ˈnʊr.ɑːn/",
    vietnamese: "Tế bào thần kinh (Nơ-ron)",
    etymology: "Từ tiếng Hy Lạp nhầm chỉ dòng dây hoặc sợi thần kinh.",
    description: "Đơn vị cấu trúc và chức năng cơ bản của hệ thần kinh, có khả năng cảm ứng và dẫn truyền xung điện sinh học để xử lý và truyền tải thông tin.",
    clinical: "Sự tổn thương của lớp vỏ myelin bảo vệ nơ-ron dẫn đến các bệnh xơ cứng rải rác (Multiple Sclerosis - MS) gây rối loạn vận động.",
    funFact: "Xung thần kinh có thể di chuyển với vận tốc lên tới hơn 400 km/h - nhanh hơn cả tốc độ của một chiếc siêu xe đua F1!"
  },
  {
    term: "Tachycardia",
    pronunciation: "/ˌtæk.ɪˈkɑːr.di.ə/",
    vietnamese: "Chứng nhịp tim nhanh",
    etymology: "Từ tiếng Hy Lạp 'tachys' (nhanh) + 'kardia' (tim).",
    description: "Trạng thái nhịp tim lúc nghỉ ngơi vượt quá giới hạn bình thường (thường là trên 100 nhịp mỗi phút ở người lớn).",
    clinical: "Bác sĩ lâm sàng thường dùng điện tâm đồ (ECG) để bắt được sóng điện tim, từ đó kê đơn thuốc chẹn beta (beta-blockers) hoặc điều trị cắt đốt điện.",
    funFact: "Nhịp tim của chúng ta tăng lên tự nhiên khi tập thể dục hoặc khi hồi hộp do hormone adrenaline giải phóng từ tuyến thượng thận."
  },
  {
    term: "Hippocampus",
    pronunciation: "/ˌhɪp.əˈkæm.pəs/",
    vietnamese: "Hồi hải mã",
    etymology: "Mượn từ sinh vật biển Hải mã (Cá ngựa) vì cấu trúc não này có hình dáng uốn cong rất giống chú cá ngựa.",
    description: "Một phần của não bộ thuộc hệ viền (limbic system), đóng vai trò cốt lõi trong việc củng cố ký ức ngắn hạn thành ký ức dài hạn và định hướng không gian.",
    clinical: "Hồi hải mã là một vùng não cực kỳ đặc biệt có thể sinh ra tế bào thần kinh mới suốt đời (neurogenesis) nhờ việc liên tục rèn luyện trí tuệ.",
    funFact: "Học tập tích cực, ngủ đủ giấc và tập thể dục nhịp điệu đều kích thích sản sinh nơ-ron mới ở hồi hải mã, giúp nâng cao năng lực ôn thi vượt bậc!"
  },
  {
    term: "Alveoli",
    pronunciation: "/ælˈviː.ə.laɪ/",
    vietnamese: "Phế nang phổi",
    etymology: "Tiếng La-tinh 'alveolus' nghĩa là khoang nhỏ, hốc nhỏ.",
    description: "Các túi khí siêu nhỏ nằm ở tận cùng của đường dẫn khí trong phổi, nơi xảy ra quá trình trao đổi khí oxy và carbon dioxide với mao mạch.",
    clinical: "Trong bệnh viêm phổi, các phế nang bị chứa đầy dịch mủ, cản trở sự khuếch tán oxy và cần hỗ trợ thở hoặc điều trị kháng sinh cấp tính.",
    funFact: "Nếu trải phẳng toàn bộ khoảng 300 triệu phế nang của phổi hai bên, diện tích bề mặt trao đổi khí rộng bằng cả một sân quần vợt!"
  },
  {
    term: "Hemoglobin",
    pronunciation: "/ˈhiː.məˌɡloʊ.bɪn/",
    vietnamese: "Huyết sắc tố",
    etymology: "Ghép giữa 'hemo-' (chứa sắt từ tiếng Hy Lạp 'haima' - máu) và 'globin' (protein dạng cầu).",
    description: "Protein giàu sắt có trong hồng cầu, giúp liên kết lỏng lẻo với oxy để đưa dưỡng khí đi nuôi toàn bộ tế bào cơ thể.",
    clinical: "Xác định nồng độ Hemoglobin trong máu giúp bác sĩ lâm sàng đánh giá độ nặng của chứng thiếu máu mạn tính hoặc chảy máu cấp.",
    funFact: "Mỗi tế bào hồng cầu chứa khoảng 270 triệu phân tử Hemoglobin. Sắt trong huyết sắc tố chính là lý do khiến máu của chúng ta có màu đỏ bầm!"
  },
  {
    term: "Stethoscope",
    pronunciation: "/ˈsteθ.ə.skoʊp/",
    vietnamese: "Ống nghe y khoa",
    etymology: "Từ tiếng Hy Lạp 'stethos' (ngực) + 'skopein' (nhìn/quan sát).",
    description: "Thiết bị cách âm thính chẩn dùng lắng nghe âm thanh nội tạng như tiếng tim đập, rì rào phế nang hay nhu động ruột.",
    clinical: "Được phát minh vào năm 1816 bởi René Laennec nhằm nghe tim gián tiếp lịch sự, ống nghe nay là biểu tượng linh thiêng của bác sĩ lâm sàng.",
    funFact: "Chiếc ống nghe thu phát âm thanh bằng màng rung (diaphragm) cho tần số cao và chuông (bell) cho tần số thấp, giúp nghe cực rõ các bệnh lý van tim!"
  },
  {
    term: "Antibiotic",
    pronunciation: "/ˌæn.t̬i.baɪˈɑː.t̬ɪk/",
    vietnamese: "Thuốc kháng sinh",
    etymology: "Ghép từ 'anti-' (chống lại) + 'bios' (sự sống) trong tiếng Hy Lạp cổ.",
    description: "Hợp chất hóa học có khả năng tiêu diệt hoặc ức chế sự nhân lên của vi khuẩn trong cơ thể động vật/người.",
    clinical: "Lạm dụng kháng sinh gây tăng tốc đột biến đề kháng kháng sinh toàn cầu. Bác sĩ luôn chỉ định kháng sinh đúng liều, đúng phổ tác dụng.",
    funFact: "Alexander Fleming phát hiện ra Penicillin (kháng sinh đầu tiên) hoàn toàn tình cờ vào năm 1928 khi một đĩa nuôi cấy vi khuẩn bị mọc nấm mốc xanh!"
  },
  {
    term: "Anesthesia",
    pronunciation: "/ˌæn.əsˈθiː.ʒə/",
    vietnamese: "Sự vô cảm / Gây mê / Gây tê",
    etymology: "Từ tiếng Hy Lạp 'an-' (không có) + 'aisthesis' (cảm giác).",
    description: "Trạng thái mất cảm giác đau đớn tạm thời được kiểm soát y khoa, phục vụ cho các thủ thuật phẫu thuật ngoại khoa xâm lấn.",
    clinical: "Bác sĩ gây mê hồi sức (Anesthesiologist) là người canh giữ sinh mạng bệnh nhân bằng cách phối hợp thuốc gây ngủ, giảm đau và giãn cơ suốt cuộc mổ.",
    funFact: "Trước thế kỷ 19, người ta phải dùng rượu nặng, thuốc phiện, hoặc thậm chí gõ bất tỉnh nhân sự bệnh nhân trước khi thực hiện phẫu thuật cắt chi!"
  }
];

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

  // Daily Med-Terminology state initialized by current day of the month % array size
  const [currentWordIndex, setCurrentWordIndex] = useState(() => {
    const day = new Date().getDate();
    return day % MEDICAL_TERMS.length;
  });


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

      {/* 3. DAILY MEDICAL TERMINOLOGY */}
      <div 
        id="medical-terminology-corner"
        className="bg-white rounded-3xl p-6 border border-[#FFE1E5] shadow-sm relative overflow-hidden"
      >
        {/* Card Header with medical cross pulse */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FFF0F2] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-gradient-to-br from-[#800F2F] to-[#C9184A] text-white shadow-sm shadow-[#800f2f]/15 relative">
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFE1E5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-100"></span>
              </span>
              <Stethoscope size={18} />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-[#800F2F] flex items-center gap-1.5">
                Góc Từ Vựng Y Khoa Mỗi Ngày
                <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded-lg font-mono">🩺 Med-Term</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Mỗi ngày một thuật ngữ để nuôi dưỡng đam mê khoác áo blouse trắng</p>
            </div>
          </div>

          {/* Interactive Navigation controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono font-bold text-slate-400 mr-1">
              {currentWordIndex + 1} / {MEDICAL_TERMS.length}
            </span>
            <button
              onClick={() => setCurrentWordIndex(prev => (prev - 1 + MEDICAL_TERMS.length) % MEDICAL_TERMS.length)}
              className="p-1.5 rounded-xl border border-slate-200 hover:border-[#800F2F] text-slate-500 hover:text-[#800F2F] hover:bg-slate-50 transition-all cursor-pointer"
              title="Từ trước"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => {
                let nextIdx;
                do {
                  nextIdx = Math.floor(Math.random() * MEDICAL_TERMS.length);
                } while (nextIdx === currentWordIndex && MEDICAL_TERMS.length > 1);
                setCurrentWordIndex(nextIdx);
              }}
              className="p-1.5 rounded-xl border border-slate-200 hover:border-[#800F2F] text-slate-500 hover:text-[#800F2F] hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold font-mono"
              title="Từ ngẫu nhiên"
            >
              <Shuffle size={13} />
              <span>Ngẫu nhiên</span>
            </button>
            <button
              onClick={() => setCurrentWordIndex(prev => (prev + 1) % MEDICAL_TERMS.length)}
              className="p-1.5 rounded-xl border border-slate-200 hover:border-[#800F2F] text-slate-500 hover:text-[#800F2F] hover:bg-slate-50 transition-all cursor-pointer"
              title="Từ tiếp theo"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Terminology content display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Huge Pronunciation & Word details (5/12) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#FFF0F2] via-[#FFF9FA] to-white p-5 rounded-2xl border border-[#FFE1E5]/60 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 bg-[#800F2F]/5 text-[#800F2F] rounded-lg text-[9px] font-mono tracking-wider uppercase font-black">
                Thuật ngữ chuyên ngành
              </span>
              
              <div className="space-y-1">
                <h4 className="font-serif font-black text-[#800F2F] text-2xl md:text-3xl tracking-tight">
                  {MEDICAL_TERMS[currentWordIndex].term}
                </h4>
                {MEDICAL_TERMS[currentWordIndex].pronunciation && (
                  <p className="text-xs font-mono text-slate-400 font-medium">
                    {MEDICAL_TERMS[currentWordIndex].pronunciation}
                  </p>
                )}
              </div>

              {/* Translation Badge */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#800F2F] text-white rounded-xl text-xs font-bold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse"></span>
                  Nghĩa: {MEDICAL_TERMS[currentWordIndex].vietnamese}
                </span>
              </div>
            </div>

            {/* Etymology box */}
            {MEDICAL_TERMS[currentWordIndex].etymology && (
              <div className="pt-3 border-t border-rose-100/50 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
                <BookOpen size={13} className="text-[#800F2F] shrink-0 mt-0.5" />
                <p>
                  <span className="font-bold text-slate-700">Nguồn gốc từ: </span> 
                  {MEDICAL_TERMS[currentWordIndex].etymology}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Definition, Clinical, Fun Fact (7/12) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            
            {/* Definition */}
            <div className="space-y-1.5">
              <h5 className="text-xs font-mono tracking-widest font-black text-[#800F2F] uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#800F2F] rounded-full text-xs"></span>
                Định nghĩa sinh lý / giải phẫu
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {MEDICAL_TERMS[currentWordIndex].description}
              </p>
            </div>

            {/* Clinical application */}
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
              <div className="p-2 bg-white rounded-xl text-amber-600 border border-amber-50 shadow-sm shrink-0">
                <Heart size={15} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider font-extrabold text-slate-500 uppercase block">Ứng dụng lâm sàng thực tế:</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {MEDICAL_TERMS[currentWordIndex].clinical}
                </p>
              </div>
            </div>

            {/* Factoid highlight */}
            {MEDICAL_TERMS[currentWordIndex].funFact && (
              <div className="p-3.5 bg-emerald-50/40 border border-emerald-100/70 rounded-2xl flex items-start gap-2.5">
                <Lightbulb size={15} className="text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  <span className="font-extrabold">Có thể Hương chưa biết? </span> 
                  {MEDICAL_TERMS[currentWordIndex].funFact}
                </p>
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
