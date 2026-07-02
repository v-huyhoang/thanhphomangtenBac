import React, { useState } from "react";
import {
  Award,
  Flame,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Camera,
  Building,
  Map,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const CITY_ICONS = [
  {
    id: "reunification",
    name: "Dinh Thống Nhất",
    title: "Chứng nhân lịch sử",
    desc: "Nơi ghi dấu cột mốc lịch sử giải phóng miền Nam thống nhất đất nước.",
    image:
      "https://ik.imagekit.io/tvlk/blog/2025/04/dinh-doc-lap.jpg?tr=q-70,c-at_max,w-1000,h-600",
    badge: "Hào hùng",
    year: "1975",
  },
  {
    id: "postoffice",
    name: "Bưu Điện Trung Tâm",
    title: "Di sản cổ kính",
    desc: "Biểu tượng kiến trúc văn hóa nghệ thuật đặc sắc giữa trung tâm Sài Gòn.",
    image: "https://image.vietgoing.com/editor/image_cub1638606778.jpg",
    badge: "Cổ kính",
    year: "1891",
  },
  {
    id: "landmark",
    name: "Landmark 81",
    title: "Khát vọng vươn tầm",
    desc: "Biểu tượng của sự bứt phá năng động và tương lai số thông minh vượt trội.",
    image: "https://ik.imagekit.io/tvlk/blog/2024/01/landmark-81-cover.jpg",
    badge: "Kỷ nguyên mới",
    year: "2018",
  },
];

export default function Hero() {
  const [activeTab, setActiveTab] = useState(CITY_ICONS[2]); // Default to Landmark 81 as modern symbol

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden py-16 px-4 md:px-8 text-white bg-slate-950"
    >
      {/* Background Image of HCMC Skyline with Rich Deep Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://premedia.vneconomy.vn/files/uploads/2026/06/10/c67125e2a021427485c1ba19d4d90754-96162.jpg"
          alt="Ho Chi Minh City Skyline Twilight"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse"
          style={{ animationDuration: "12s" }}
        />
        {/* Absolute high-contrast color matching gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/95 via-slate-950/90 to-slate-950"></div>
        {/* Subtle grid pattern for modern touch */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        ></div>
      </div>

      {/* Decorative Golden Light Leaks */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-red-500 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400 rounded-full blur-[130px] animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-7xl mx-auto z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Campaign Text and CTAs */}
        <div className="lg:col-span-6 text-left flex flex-col items-start">
          {/* Anniversary Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md border border-red-400/30 px-4 py-2 rounded-full text-red-200 text-xs md:text-sm font-medium mb-6"
          >
            <Calendar
              className="w-4 h-4 text-yellow-400 animate-spin"
              style={{ animationDuration: "10s" }}
            />
            <span className="font-semibold tracking-wide">
              Kỷ niệm 50 năm ngày Thành phố chính thức mang tên Bác
            </span>
          </motion.div>

          {/* Big Bold Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-balance"
          >
            50 Năm Tự Hào <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-200 drop-shadow-sm font-black">
              Thành Phố Mang Tên Bác
            </span>
          </motion.h1>

          {/* Inspiring Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl mb-8 leading-relaxed text-balance"
          >
            Nửa thế kỷ kế thừa hào khí lịch sử, tuổi trẻ học sinh sinh viên
            Thành phố Hồ Chí Minh ngày nay vững vàng khát vọng sáng tạo, tiên
            phong chuyển đổi số và phát triển bền vững, quyết tâm kiến tạo tương
            lai rực rỡ.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => scrollToSection("timeline")}
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold rounded-xl transition-all duration-300 shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-explore"
            >
              <span>Khám phá hành trình</span>
              <ChevronRight className="w-5 h-5 text-slate-950" />
            </button>
            <button
              onClick={() => scrollToSection("minigame")}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-xs hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              id="btn-quiz-cta"
            >
              <span>Đấu trường Lịch sử</span>
              <Award className="w-5 h-5 text-yellow-400" />
            </button>
          </motion.div>

          {/* Mini Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full border-t border-white/10 pt-8"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-yellow-300 font-display">
                02/7/1976
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Chính thức mang tên Bác
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-yellow-300 font-display">
                Over 9Tr
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Dân cư năng động, nghĩa tình
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-yellow-300 font-display">
                Đầu Tàu
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Kinh tế, khoa học hàng đầu
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-yellow-300 font-display">
                Số 1
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Điểm đến sinh viên & xanh
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Interactive City Landmark Showcase */}
        <div className="lg:col-span-6 w-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Visual Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                  Biểu Tượng Đất Thắng
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Hồ Chí Minh City
              </span>
            </div>

            {/* Display Active Photo */}
            <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-5 group shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab.id}
                  src={activeTab.image}
                  alt={activeTab.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </AnimatePresence>

              {/* Overlay Label */}
              <div className="absolute top-3 right-3 bg-red-600 text-white font-bold text-xs px-2.5 py-1 rounded-full uppercase shadow-md">
                {activeTab.badge}
              </div>

              {/* Bottom Info Strip inside Photo */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 to-transparent p-4 pt-10">
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-1.5">
                  <span>{activeTab.name}</span>
                  <span className="text-xs bg-yellow-400 text-slate-950 font-extrabold px-1.5 py-0.5 rounded-sm">
                    Năm {activeTab.year}
                  </span>
                </h3>
                <p className="text-xs text-slate-200 mt-1 line-clamp-1">
                  {activeTab.title}
                </p>
              </div>
            </div>

            {/* Tab Selectors */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {CITY_ICONS.map((icon) => {
                const isActive = activeTab.id === icon.id;
                return (
                  <button
                    key={icon.id}
                    onClick={() => setActiveTab(icon)}
                    className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      isActive
                        ? "bg-yellow-400 text-slate-950 shadow-md scale-[1.03]"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700/80"
                    }`}
                  >
                    {icon.id === "reunification" && (
                      <Building className="w-4 h-4" />
                    )}
                    {icon.id === "postoffice" && <Map className="w-4 h-4" />}
                    {icon.id === "landmark" && <Award className="w-4 h-4" />}
                    <span className="truncate w-full text-center">
                      {icon.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Description Text Box */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed min-h-[64px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab.desc}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modern Wave Divider at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
    </section>
  );
}
