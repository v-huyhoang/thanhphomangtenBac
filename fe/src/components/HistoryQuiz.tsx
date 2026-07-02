import React, { useState, useEffect, useRef } from "react";
import { LeaderboardEntry, QuizQuestion } from "../types";
import {
  Trophy,
  Timer,
  Award,
  RotateCcw,
  Play,
  CheckCircle2,
  XCircle,
  ChevronRight,
  UserPlus,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function HistoryQuiz() {
  // Game States
  const [userName, setUserName] = useState("");
  const [userSchool, setUserSchool] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch Leaderboard on mount
  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setLeaderboard(data))
      .catch((err) => console.error("Error loading leaderboard:", err));
  }, []);

  // Fetch quiz questions
  const loadQuestions = () => {
    setQuestionsLoading(true);
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data) => {
        setQuizQuestions(data);
        setQuestionsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading quiz questions:", err);
        setQuestionsLoading(false);
      });
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // Web Audio Synth for game sounds
  const playSound = (type: "correct" | "incorrect" | "click" | "win") => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "incorrect") {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(147, ctx.currentTime + 0.15); // D3
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === "click") {
        osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "win") {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      // Audio block or not supported
    }
  };

  // Timer Countdown Effect
  useEffect(() => {
    if (!isRegistered || isGameOver || isAnswered || quizQuestions.length === 0) return;

    setTimeLeft(15);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Time runout behaves as incorrect
          handleAnswerSelect(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRegistered, currentQuestionIndex, isGameOver, isAnswered, quizQuestions]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    playSound("click");
    setIsRegistered(true);
    setStartTime(Date.now());
  };

  const handleAnswerSelect = (index: number) => {
    if (isAnswered || quizQuestions.length === 0) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswerIndex(index);
    setIsAnswered(true);

    const question = quizQuestions[currentQuestionIndex];
    if (question && index === question.correctAnswerIndex) {
      setScore((prev) => prev + 10);
      playSound("correct");
    } else {
      playSound("incorrect");
    }
  };

  const handleNextQuestion = () => {
    playSound("click");
    setSelectedAnswerIndex(null);
    setIsAnswered(false);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    playSound("win");

    const timeInSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : 15;

    fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
        school: userSchool,
        score: score,
        time_in_seconds: timeInSeconds,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit score");
        return res.json();
      })
      .then((data) => {
        setLeaderboard(data);
      })
      .catch((err) => console.error("Error submitting score:", err));
  };

  const handleReset = () => {
    playSound("click");
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(15);
    setIsGameOver(false);
    loadQuestions();
  };

  const handleFullReset = () => {
    playSound("click");
    setIsRegistered(false);
    setUserName("");
    setUserSchool("");
    handleReset();
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <section
      id="minigame"
      className="py-20 bg-slate-900 text-slate-100 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 px-3.5 py-1.5 rounded-full text-red-400 text-xs font-bold uppercase mb-3">
            <Trophy className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
            <span>Sinh Viên Tranh Tài</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Đấu Trường Lịch Sử
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Kiểm tra tri thức lịch sử về chặng đường 50 năm phát triển của Thành
            phố Hồ Chí Minh. Ghi danh bảng xếp hạng sinh viên ưu tú ngay hôm
            nay!
          </p>

          {/* Sound Toggler */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Âm thanh: ĐANG BẬT</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span>Âm thanh: ĐANG TẮT</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL: Interactive Arena (8 cols) */}
          <div className="lg:col-span-8 bg-slate-800/60 backdrop-blur-md rounded-3xl border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* STAGE 1: Username Register */}
            {!isRegistered && (
              <div className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                  <UserPlus className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Đăng Ký Tham Chiến
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
                  Hãy nhập tên và tên trường đại học của bạn để bắt đầu làm bài
                  trắc nghiệm lịch sử và ghi danh vào Bảng xếp hạng.
                </p>

                <form
                  onSubmit={handleRegister}
                  className="max-w-md mx-auto space-y-4"
                >
                  <div>
                    <label className="block text-left text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Họ và Tên
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Minh Thư"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                      Trường Đại học (Không bắt buộc)
                    </label>
                    <input
                      type="text"
                      placeholder="Ví dụ: ĐH Bách Khoa"
                      value={userSchool}
                      onChange={(e) => setUserSchool(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-white placeholder-slate-500 text-sm outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>Bắt đầu đấu trường</span>
                  </button>
                </form>
              </div>
            )}

            {/* STAGE 2: Active Quiz */}
            {isRegistered && !isGameOver && (
              questionsLoading ? (
                <div className="p-12 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
                  <p className="text-slate-400 mt-4 text-sm">Đang tải câu hỏi học thuật...</p>
                </div>
              ) : !currentQuestion ? (
                <div className="p-12 text-center">
                  <p className="text-red-400 font-bold text-sm">Không thể tải đề thi</p>
                  <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    Thử lại
                  </button>
                </div>
              ) : (
                <div className="p-6 md:p-8">
                  {/* Header info bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/50 pb-4 mb-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white leading-none truncate">
                          {userName}
                        </h4>
                        <span className="text-xs text-slate-500 truncate block mt-1">
                          {userSchool || "Thí sinh tự do"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                      {/* Score display */}
                      <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-semibold text-slate-400">
                          Điểm:
                        </span>
                        <span className="text-sm font-bold text-yellow-400 font-mono">
                          {score}
                        </span>
                      </div>

                      {/* Timer Circle */}
                      <div
                        className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-colors ${
                          timeLeft <= 5
                            ? "bg-red-500/10 border-red-500/50 text-red-400 animate-pulse"
                            : "bg-slate-900 border-slate-700 text-slate-300"
                        }`}
                      >
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-bold font-mono">
                          {timeLeft}s
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="w-full bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="mb-6">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                      Câu hỏi {currentQuestionIndex + 1} trên{" "}
                      {quizQuestions.length}
                    </span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-white mt-2 leading-relaxed">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  {/* Answer Options Grid */}
                  <div className="grid grid-cols-1 gap-3.5 mb-6">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedAnswerIndex === idx;
                      const isCorrect =
                        idx === currentQuestion.correctAnswerIndex;
                      const isWrong = isSelected && !isCorrect;

                      let buttonClass =
                        "bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-300";
                      let icon = null;

                      if (isAnswered) {
                        if (isCorrect) {
                          buttonClass =
                            "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium";
                          icon = (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          );
                        } else if (isWrong) {
                          buttonClass =
                            "bg-red-500/10 border-red-500 text-red-400 font-medium";
                          icon = (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          );
                        } else {
                          buttonClass =
                            "bg-slate-900/30 border-slate-800 text-slate-600 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(idx)}
                          disabled={isAnswered}
                          className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-200 flex items-center justify-between gap-3 ${
                            !isAnswered
                              ? "active:scale-[0.99] cursor-pointer"
                              : "cursor-default"
                          } ${buttonClass}`}
                        >
                          <span>{option}</span>
                          {icon}
                        </button>
                      );
                    })}
                  </div>

                  {/* Question Timeout Alert */}
                  {isAnswered && selectedAnswerIndex === -1 && (
                    <div className="bg-red-500/10 border border-red-500/30 p-3.5 rounded-xl text-xs text-red-400 font-medium mb-6 flex items-center gap-2">
                      <Timer className="w-4 h-4 shrink-0" />
                      <span>
                        Hết thời gian! Bạn đã không kịp trả lời câu hỏi này.
                      </span>
                    </div>
                  )}

                  {/* Explanation Area */}
                  {isAnswered && (
                    <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-5 mb-6 animate-fade-in">
                      <h5 className="font-semibold text-sm text-yellow-400 mb-1">
                        Góc Kiến Thức Lịch Sử:
                      </h5>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  {/* Next button */}
                  {isAnswered && (
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={handleNextQuestion}
                        className="w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-md shadow-red-600/10 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>
                          {currentQuestionIndex === quizQuestions.length - 1
                            ? "Xem Kết Quả"
                            : "Câu Tiếp Theo"}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )
            )}

            {/* STAGE 3: GameOver Screen */}
            {isRegistered && isGameOver && (
              <div className="p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-400/20">
                  <Trophy className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
                <h3 className="font-display text-3xl font-extrabold text-white mb-2">
                  Chúc Mừng Bạn!
                </h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                  Bạn đã hoàn thành xuất sắc Đấu trường Lịch sử 50 năm Thành phố
                  Hồ Chí Minh!
                </p>

                {/* Final Score Board */}
                <div className="max-w-xs mx-auto bg-slate-900 border border-slate-700 rounded-2xl p-6 mb-8">
                  <div className="text-xs uppercase text-slate-500 tracking-widest font-bold">
                    Điểm số đạt được
                  </div>
                  <div className="text-5xl font-extrabold text-yellow-400 my-2 font-display">
                    {score}
                  </div>
                  <div className="text-xs text-slate-400">
                    Trả lời đúng {score / 10} / {quizQuestions.length} câu hỏi
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm Lại Đợt Này</span>
                  </button>
                  <button
                    onClick={handleFullReset}
                    className="px-6 py-3.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ghi Danh Tên Mới</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Dynamic Leaderboard (4 cols) */}
          <div className="lg:col-span-4 bg-slate-800/40 border border-slate-700/40 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-700/50 pb-4">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <h3 className="font-display font-bold text-white text-base">
                Bảng Vàng Đấu Trường
              </h3>
            </div>

            <div className="space-y-2.5">
              {leaderboard.map((entry, index) => {
                let rankStyle = "bg-slate-700/50 text-slate-400";
                if (index === 0)
                  rankStyle = "bg-yellow-400 text-red-950 font-bold";
                else if (index === 1)
                  rankStyle = "bg-slate-300 text-slate-900 font-bold";
                else if (index === 2)
                  rankStyle = "bg-amber-600 text-amber-50 font-bold";

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                      entry.isUser
                        ? "bg-red-600/10 border-red-500/50 shadow-md shadow-red-500/5 animate-pulse"
                        : "bg-slate-900/40 border-slate-700/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank circle badge */}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${rankStyle}`}
                      >
                        {index + 1}
                      </div>

                      {/* Name & details */}
                      <div>
                        <span
                          className={`text-xs font-bold block ${entry.isUser ? "text-yellow-400" : "text-white"}`}
                        >
                          {entry.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          Hội tụ: {entry.date}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-yellow-400 font-mono">
                        {entry.score}đ
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/40 text-[11px] text-slate-400 leading-relaxed">
              * Điểm số tính bằng 10 điểm cho mỗi câu trả lời đúng. Thời gian
              trả lời giới hạn 15 giây mỗi câu. Bảng vàng được cập nhật trực tuyến thời gian thực từ cơ sở dữ liệu.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
