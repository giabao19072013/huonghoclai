import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Settings, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Play, 
  FileText, 
  HelpCircle,
  Award,
  ArrowRight,
  BookMarked,
  Timer
} from 'lucide-react';
import { generateQuizQuestions, QuizQuestion } from '../data/quizQuestions';

interface QuizHistoryEntry {
  id: string;
  date: string;
  subject: string;
  grade: string;
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  percentage: number;
}

export default function QuizSimulation() {
  // Config States
  const [selectedSubject, setSelectedSubject] = useState<'Toán' | 'Hóa' | 'Sinh' | 'Lý' | 'Tất cả'>('Tất cả');
  const [selectedGrade, setSelectedGrade] = useState<'11' | '12' | 'Tất cả'>('Tất cả');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);

  // App Phase State: 'config' | 'playing' | 'results'
  const [phase, setPhase] = useState<'config' | 'playing' | 'results'>('config');

  // Interactive Play States
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({}); // maps question ID to option index (0-3)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);

  // Review & History
  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('quiz_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse quiz history', e);
      }
    }
  }, []);

  // Countdown clock loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Out of time
            setIsActive(false);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsRemaining]);

  const handleStartExam = () => {
    // Generate selected test pool
    const generated = generateQuizQuestions(selectedSubject, selectedGrade, questionCount);
    setQuestions(generated);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSecondsRemaining(durationMinutes * 60);
    setStartTime(Date.now());
    setIsActive(true);
    setPhase('playing');
    setShowSubmitConfirm(false);
    setShowExplanation(false);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleAutoSubmit = () => {
    setIsActive(false);
    calculateResults();
  };

  const handleSubmitClick = () => {
    setShowSubmitConfirm(true);
  };

  const calculateResults = () => {
    setIsActive(false);
    const end = Date.now();
    const elapsed = Math.round((end - startTime) / 1000);
    setTimeSpentSeconds(elapsed);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    
    // Save to history list
    const newEntry: QuizHistoryEntry = {
      id: `history-${Date.now()}`,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      subject: selectedSubject,
      grade: selectedGrade,
      score: correctCount,
      totalQuestions: questions.length,
      timeSpent: elapsed,
      percentage: percent
    };

    const updatedHistory = [newEntry, ...history].slice(0, 50); // keep last 50
    setHistory(updatedHistory);
    localStorage.setItem('quiz_history', JSON.stringify(updatedHistory));

    setPhase('results');
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return { title: 'Xuất sắc!', color: 'text-emerald-400', desc: 'Kiến thức của bạn rất vững vàng. Hãy tiếp tục phát huy nhé!' };
    if (percentage >= 75) return { title: 'Giỏi!', color: 'text-teal-400', desc: 'Kết quả rất tốt! Bạn đã nắm chắc phần lớn lý thuyết trọng tâm.' };
    if (percentage >= 50) return { title: 'Khá!', color: 'text-amber-400', desc: 'Kết quả tương đối tốt, nhưng vẫn có những chỗ cần xem lại lý thuyết.' };
    return { title: 'Cần cố gắng!', color: 'text-rose-400', desc: 'Hãy đọc lại nội dung tóm tắt lý thuyết để lấp đầy những lỗ hổng nhé!' };
  };

  const scoreInfo = getScoreMessage(phase === 'results' ? Math.round((questions.filter(q => answers[q.id] === q.correctIndex).length / questions.length) * 100) : 0);

  return (
    <div id="quiz-simulation-container" className="max-w-6xl mx-auto p-4 md:p-6 text-gray-100 min-h-screen">
      {/* HEADER SECTION */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-sans font-semibold tracking-tight text-white flex items-center gap-2">
            <Timer className="w-8 h-8 text-indigo-400" />
            Giả Lập Kiểm Tra
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Đánh giá năng lực tức thì với các đề kiểm tra bám sát chương trình học THPT (Toán, Lý, Hóa, Sinh).
          </p>
        </div>

        {phase === 'playing' && (
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl flex items-center gap-3 border border-slate-700 shadow-lg">
            <Clock className={`w-5 h-5 animate-pulse ${secondsRemaining < 60 ? 'text-rose-400' : 'text-indigo-400'}`} />
            <div>
              <span className="text-xs text-gray-400 block uppercase font-mono tracking-wider">Thời gian còn lại</span>
              <span className={`text-xl font-mono font-bold ${secondsRemaining < 60 ? 'text-rose-400 text-2xl font-black' : 'text-emerald-400'}`}>
                {formatTime(secondsRemaining)}
              </span>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: CONFIGURATION */}
        {phase === 'config' && (
          <motion.div
            key="config-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* SETUP FORM CARD */}
            <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 md:p-8 space-y-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Settings className="w-5 h-5 text-indigo-400" />
                Cấu hình Đề Thi Giả Lập
              </h2>

              {/* SUBJECT SELECTOR */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 block">Chọn Môn Học:</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {(['Tất cả', 'Toán', 'Lý', 'Hóa', 'Sinh'] as const).map((subject) => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border outline-none cursor-pointer flex flex-col items-center gap-1.5 ${
                        selectedSubject === subject
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/10'
                          : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-semibold text-base">{subject}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* GRADE SELECTOR */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 block">Chọn Lớp học (Khối):</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Tất cả', '11', '12'] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGrade(g)}
                        className={`py-2.5 rounded-xl text-sm font-medium transition-all border outline-none cursor-pointer ${
                          selectedGrade === g
                            ? 'bg-indigo-600/20 border-indigo-500 text-white'
                            : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        {g === 'Tất cả' ? 'Tổng hợp' : `Lớp ${g}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* QUESTION COUNT CONFIG */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-300 flex justify-between">
                    <span>Số lượng câu hỏi:</span>
                    <span className="text-indigo-400 font-mono font-bold">{questionCount} câu</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number(e.target.value))}
                      className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={questionCount}
                      onChange={(e) => {
                        let val = Math.max(1, Math.min(100, Number(e.target.value)));
                        setQuestionCount(val);
                      }}
                      className="w-16 bg-slate-800/60 border border-slate-700 rounded-xl px-2 py-1 text-center font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* DURATION CONFIG */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 flex justify-between">
                  <span>Thời gian làm bài:</span>
                  <span className="text-indigo-400 font-mono font-bold">{durationMinutes} phút</span>
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={10}
                    max={120}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <input
                    type="number"
                    min={10}
                    max={120}
                    value={durationMinutes}
                    onChange={(e) => {
                      let val = Math.max(10, Math.min(120, Number(e.target.value)));
                      setDurationMinutes(val);
                    }}
                    className="w-16 bg-slate-800/60 border border-slate-700 rounded-xl px-2 py-1 text-center font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* HELPFUL NOTE */}
              <div className="bg-slate-800/30 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs text-gray-400 leading-relaxed">
                  Hệ thống sẽ lấy ngẫu nhiên các câu hỏi từ ngân hàng đề thi chuẩn bám sát theo cấu trúc bộ môn và lớp bạn chọn. Nếu bạn yêu cầu số câu lớn hơn giới hạn của ngân hàng, hệ thống sẽ sử dụng thuật toán biến thể câu hỏi thông minh giúp đảm bảo đề thi đầy đủ, phong phú và không trùng lặp tuyệt đối.
                </div>
              </div>

              {/* START BUTTON */}
              <button
                onClick={handleStartExam}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-2xl transition duration-200 outline-none active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer"
              >
                <Play className="w-5 h-5 fill-current" />
                Bắt đầu làm bài thi
              </button>
            </div>

            {/* SIDEBAR - HISTORY AND HIGH LEVELS */}
            <div className="space-y-6">
              {/* LATEST RESULTS BANNER */}
              <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 space-y-4">
                <h3 className="text-md font-semibold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Thành quả học tập gần đây
                </h3>

                {history.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 text-sm">
                    <BookMarked className="w-8 h-8 mx-auto text-slate-700 mb-2" />
                    Chưa có bài thi nào được thực hiện. Lịch sử của bạn sẽ hiển thị ở đây!
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                    {history.map((entry) => (
                      <div 
                        key={entry.id} 
                        className="bg-slate-800/30 hover:bg-slate-800/50 transition-all border border-slate-800/60 rounded-xl p-3 flex flex-col justify-between gap-2"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-semibold text-sm text-slate-200 block">
                              Môn: {entry.subject} {entry.grade !== 'Tất cả' ? `- Khối ${entry.grade}` : ''}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 block">{entry.date}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-mono font-bold bg-slate-900 ${
                            entry.percentage >= 80 ? 'text-emerald-400' :
                            entry.percentage >= 50 ? 'text-amber-400' :
                            'text-rose-400'
                          }`}>
                            {entry.score}/{entry.totalQuestions} ({entry.percentage}%)
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                          <span>Số câu hỏi: {entry.totalQuestions}</span>
                          <span>TG làm bài: {Math.floor(entry.timeSpent / 60)}p {entry.timeSpent % 60}s</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: ACTIVE GAME / TESTING */}
        {phase === 'playing' && questions.length > 0 && (
          <motion.div
            key="playing-phase"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          >
            {/* MAIN TEST CONTAINER */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 md:p-8 relative">
                {/* Subject badge */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="bg-indigo-600/35 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                      Môn học: {questions[currentQuestionIndex].subject}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-md">
                      Khối: {questions[currentQuestionIndex].grade}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-gray-400 font-bold">
                    Câu hỏi {currentQuestionIndex + 1} / {questions.length}
                  </span>
                </div>

                {/* QUESTION PANEL */}
                <div className="space-y-6">
                  <h3 className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed font-sans">
                    {questions[currentQuestionIndex].question}
                  </h3>

                  {/* OPTION RADIOS */}
                  <div className="space-y-3">
                    {questions[currentQuestionIndex].options.map((option, idx) => {
                      const ansLetters = ['A', 'B', 'C', 'D'];
                      const isSelected = answers[questions[currentQuestionIndex].id] === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(questions[currentQuestionIndex].id, idx)}
                          className={`w-full py-3.5 px-5 rounded-xl border text-left text-sm md:text-base font-medium transition-all duration-150 flex items-center gap-4 cursor-pointer outline-none ${
                            isSelected
                              ? 'bg-indigo-600/20 border-indigo-500 text-white'
                              : 'bg-slate-800/30 border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white'
                          }`}
                        >
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold font-mono transition-colors text-sm border ${
                            isSelected
                              ? 'bg-indigo-500 border-indigo-400 text-white'
                              : 'bg-slate-900 border-slate-700 text-slate-400'
                          }`}>
                            {ansLetters[idx]}
                          </span>
                          <span className="flex-1 leading-relaxed">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* NEXT/PREV NAVIGATION BUTTONS */}
                <div className="flex justify-between items-center border-t border-slate-800 pt-6 mt-8">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                    className="py-2.5 px-4 rounded-xl border border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-white transition duration-200 text-sm flex items-center gap-2 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Câu Trước
                  </button>

                  <div className="text-xs text-gray-500">
                    Đã hoàn thành <span className="text-amber-500 font-bold">{Object.keys(answers).length}</span> trên <span className="text-light-100 font-bold">{questions.length}</span> câu hỏi
                  </div>

                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={handleSubmitClick}
                      className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition duration-200 text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      Nộp Bài
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition duration-200 text-sm flex items-center gap-2 cursor-pointer"
                    >
                      Câu Kế Tiếp
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* SIDEBAR - RESPONSE SHEET GRID */}
            <div className="space-y-4">
              <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-indigo-950 pb-3">
                  <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    Phiếu Trả Lời
                  </h3>
                  <button
                    onClick={handleSubmitClick}
                    className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-900 px-2 py-1 rounded hover:bg-emerald-900/40 transition cursor-pointer"
                  >
                    Nộp Bài
                  </button>
                </div>

                {/* GRID OF QUESTIONS BUBBLES */}
                <div className="grid grid-cols-5 xs:grid-cols-6 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = currentQuestionIndex === idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`py-2 text-xs font-bold font-mono rounded-lg border transition-all text-center cursor-pointer outline-none flex items-center justify-center ${
                          isCurrent
                            ? 'bg-indigo-600 border-indigo-400 text-white ring-2 ring-indigo-400/20'
                            : isAnswered
                            ? 'bg-emerald-950/50 border-emerald-800 text-emerald-400'
                            : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* LEGEND */}
                <div className="border-t border-slate-800/80 pt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-indigo-600 border border-indigo-400 rounded"></div>
                    <span>Đang xem</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-emerald-950/50 border border-emerald-800 rounded"></div>
                    <span>Đã trả lời</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-slate-800/40 border border-slate-800 rounded"></div>
                    <span>Chưa làm</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: RESULTS & EXPLANATION REVIEW */}
        {phase === 'results' && questions.length > 0 && (
          <motion.div
            key="results-phase"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* CORE METRICS SCORECARD */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/80 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden">
              {/* Radial Score graphic */}
              <div className="relative shrink-0 flex items-center justify-center w-40 h-40">
                <svg className="w-full h-full transform -rotate-95" viewBox="0 0 100 100">
                  <circle
                    className="text-slate-800"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-indigo-500 transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={2 * Math.PI * 40 * (1 - (questions.filter(q => answers[q.id] === q.correctIndex).length / questions.length))}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-4xl font-black font-mono tracking-tighter text-white">
                    {Math.round((questions.filter(q => answers[q.id] === q.correctIndex).length / questions.length) * 100)}%
                  </span>
                  <span className="text-xs text-slate-400 block mt-0.5">Mục tiêu hoàn hảo</span>
                </div>
              </div>

              {/* Text performance feedback */}
              <div className="flex-1 space-y-3 text-center md:text-left">
                <span className="text-slate-400 font-semibold font-sans tracking-wide uppercase text-xs block">
                  Kết quả kiểm tra của bạn
                </span>
                <h2 className={`text-4xl font-extrabold tracking-tight ${scoreInfo.color}`}>
                  {scoreInfo.title}
                </h2>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-lg">
                  {scoreInfo.desc}
                </p>

                {/* Score meta details */}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 text-xs font-mono text-slate-400">
                  <span className="bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-800/60 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Đúng: {questions.filter(q => answers[q.id] === q.correctIndex).length}/{questions.length} câu
                  </span>
                  <span className="bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-800/60 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    Sai: {questions.length - questions.filter(q => answers[q.id] === q.correctIndex).length} câu
                  </span>
                  <span className="bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-800/60 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    Thời gian: {formatTime(timeSpentSeconds)}
                  </span>
                </div>
              </div>

              {/* ACTION CTAs */}
              <div className="flex flex-col gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-slate-800/80 pt-6 md:pt-0 md:pl-8">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className={`py-3 px-5 rounded-xl border text-sm font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                    showExplanation
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-800/50 border-slate-800 text-amber-300 hover:border-slate-700'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  {showExplanation ? 'Ẩn Giải Thích Chi Tiết' : 'Xem Giải Thích Chi Tiết'}
                </button>

                <button
                  onClick={() => {
                    setPhase('config');
                    setAnswers({});
                  }}
                  className="py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  Thi Lại Đề Mới
                </button>
              </div>
            </div>

            {/* DETAILED ANSWER-BY-ANSWER REVIEW LIST */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                  Bảng Sửa Bài Học Tập
                </h3>

                <div className="space-y-4">
                  {questions.map((q, qIdx) => {
                    const studentAns = answers[q.id];
                    const isCorrect = studentAns === q.correctIndex;
                    const ansLetters = ['A', 'B', 'C', 'D'];

                    return (
                      <div
                        key={q.id}
                        className={`p-5 md:p-6 rounded-2xl border transition-all ${
                          isCorrect
                            ? 'bg-emerald-950/15 border-emerald-900/40'
                            : studentAns === undefined
                            ? 'bg-amber-950/15 border-amber-900/30'
                            : 'bg-rose-950/15 border-rose-900/30'
                        }`}
                      >
                        {/* Upper badge metadata */}
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                            Câu hỏi {qIdx + 1} • {q.subject} {q.grade !== 'Tất cả' ? `Học kỳ ${q.grade}` : ''}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            isCorrect 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' 
                              : studentAns === undefined
                              ? 'bg-amber-950 text-amber-400 border border-amber-900'
                              : 'bg-rose-950 text-rose-400 border border-rose-900'
                          }`}>
                            {isCorrect ? 'CHÍNH XÁC' : studentAns === undefined ? 'CHƯA TRẢ LỜI' : 'CHƯA ĐÚNG'}
                          </span>
                        </div>

                        {/* Question text */}
                        <p className="text-md font-medium text-slate-200 leading-relaxed mb-4">
                          {q.question}
                        </p>

                        {/* List options list with dynamic coloration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-4">
                          {q.options.map((opt, oIdx) => {
                            const isUserSelected = studentAns === oIdx;
                            const isCorrectOpt = q.correctIndex === oIdx;

                            let optStyle = 'bg-slate-900/40 border-slate-800 text-slate-400';
                            if (isCorrectOpt) {
                              optStyle = 'bg-emerald-950/65 border-emerald-700 text-emerald-200 font-semibold';
                            } else if (isUserSelected && !isCorrectOpt) {
                              optStyle = 'bg-rose-950/50 border-rose-800 text-rose-200 font-medium';
                            }

                            return (
                              <div
                                key={oIdx}
                                className={`p-3 rounded-xl border text-sm flex items-start gap-3 ${optStyle}`}
                              >
                                <span className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-xs border shrink-0 ${
                                  isCorrectOpt
                                    ? 'bg-emerald-800 border-emerald-500 text-white'
                                    : isUserSelected
                                    ? 'bg-rose-800 border-rose-500 text-white'
                                    : 'bg-slate-800 border-slate-700 text-slate-400'
                                }`}>
                                  {ansLetters[oIdx]}
                                </span>
                                <span className="leading-relaxed">{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation block */}
                        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-1.5">
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest block">
                            Lời giải chi tiết:
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONFIRM SUBMIT MODAL */}
      <AnimatePresence>
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center gap-3 text-amber-400 border-b border-slate-800 pb-3">
                <AlertCircle className="w-6 h-6 animate-bounce" />
                <h3 className="text-lg font-bold text-white">Xác nhận nộp bài?</h3>
              </div>

              <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
                <p>Bạn đã hoàn thành <span className="text-emerald-400 font-bold font-mono text-base">{Object.keys(answers).length}</span> trên tổng số <span className="text-indigo-400 font-bold font-mono text-base">{questions.length}</span> câu hỏi.</p>
                {Object.keys(answers).length < questions.length && (
                  <p className="text-rose-400 font-medium">Lưu ý: Bạn còn {questions.length - Object.keys(answers).length} câu hỏi chưa trả lời. Bạn có chắc chắn muốn nộp bài ngay?</p>
                )}
                <p>Sau khi nộp, hệ thống sẽ tự động tổng hợp kết quả, chấm điểm và lưu vào lịch sử học tập của bạn.</p>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-800 hover:bg-slate-800/40 text-slate-400 hover:text-white transition cursor-pointer text-sm font-semibold"
                >
                  Tiếp tục làm bài
                </button>
                <button
                  onClick={calculateResults}
                  className="py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition cursor-pointer text-sm shadow-md shadow-emerald-500/10"
                >
                  Nộp ngay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
