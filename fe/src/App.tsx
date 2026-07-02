/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import HistoryQuiz from "./components/HistoryQuiz";
import Documents from "./components/Documents";
import MessageWall from "./components/MessageWall";
import {
  Menu,
  X,
  Landmark,
  Compass,
  Calendar,
  HelpCircle,
  Heart,
  Star,
  ChevronUp,
  Share2,
  Facebook,
  Globe,
  Award,
} from "lucide-react";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scrolling to change header style and show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Calculate scroll progress percentage
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }
    };

    // Initialize values on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const shareWebPage = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Hội tụ Sinh viên - Kỷ niệm 50 năm TP.HCM",
          text: "Khám phá Landing Page kỷ niệm 50 năm Thành phố Hồ Chí Minh (1976 - 2026) dành cho sinh viên!",
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      alert("Đã sao chép liên kết chia sẻ vào khay nhớ tạm!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-red-500 selection:text-white">
      {/* HEADER / NAVIGATION */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-3 text-slate-900 border-b border-slate-100"
            : "bg-transparent py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <div
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-full bg-red-600 flex items-center justify-center border-2 border-yellow-400 shadow-md group-hover:scale-105 transition-transform">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-extrabold tracking-tight block text-sm leading-tight md:text-base">
                TP. HỒ CHÍ MINH
              </span>
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-red-500 block leading-none">
                50 Năm Tự Hào
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 font-semibold text-sm">
            <button
              onClick={() => scrollToSection("hero")}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Tổng quan
            </button>
            <button
              onClick={() => scrollToSection("timeline")}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Hành trình
            </button>
            <button
              onClick={() => scrollToSection("xua-nay")}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Xưa & Nay
            </button>
            <button
              onClick={() => scrollToSection("minigame")}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Đấu trường
            </button>
            <button
              onClick={() => scrollToSection("tai-lieu")}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Tài liệu
            </button>
            <button
              onClick={() => scrollToSection("buc-tuong-cam-xuc")}
              className="hover:text-red-500 transition-colors cursor-pointer"
            >
              Cảm xúc
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={shareWebPage}
              className={`p-2 rounded-xl border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                scrolled
                  ? "border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-red-600"
                  : "border-white/20 hover:bg-white/10 text-white"
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-xs font-semibold">Chia sẻ</span>
            </button>
            <button
              onClick={() => scrollToSection("minigame")}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Chơi Game
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl py-6 px-4 space-y-4 flex flex-col font-semibold text-slate-800 animate-fade-in">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-left py-2 border-b border-slate-50 hover:text-red-500 transition-colors cursor-pointer"
            >
              Tổng quan
            </button>
            <button
              onClick={() => scrollToSection("timeline")}
              className="text-left py-2 border-b border-slate-50 hover:text-red-500 transition-colors cursor-pointer"
            >
              Hành trình lịch sử
            </button>
            <button
              onClick={() => scrollToSection("xua-nay")}
              className="text-left py-2 border-b border-slate-50 hover:text-red-500 transition-colors cursor-pointer"
            >
              Hình ảnh Xưa & Nay
            </button>
            <button
              onClick={() => scrollToSection("minigame")}
              className="text-left py-2 border-b border-slate-50 hover:text-red-500 transition-colors cursor-pointer"
            >
              Đấu trường Lịch sử
            </button>
            <button
              onClick={() => scrollToSection("tai-lieu")}
              className="text-left py-2 border-b border-slate-50 hover:text-red-500 transition-colors cursor-pointer"
            >
              Tài liệu Học tập
            </button>
            <button
              onClick={() => scrollToSection("buc-tuong-cam-xuc")}
              className="text-left py-2 border-b border-slate-50 hover:text-red-500 transition-colors cursor-pointer"
            >
              Bức tường Cảm xúc
            </button>

            <div className="flex gap-3 pt-2">
              <button
                onClick={shareWebPage}
                className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Chia sẻ trang</span>
              </button>
              <button
                onClick={() => scrollToSection("minigame")}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 rounded-xl text-xs font-bold text-white text-center"
              >
                Tranh tài ngay
              </button>
            </div>
          </div>
        )}

        {/* Scroll Progress Bar right under header content */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-200/25 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-red-600 transition-all duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* CORE CONTENT SECTIONS */}
      <main>
        {/* HERO BANNER SECTION */}
        <Hero />

        {/* TIMELINE JOURNEY SECTION */}
        <Timeline />

        {/* BEFORE & AFTER SLIDER COMPARE SECTION */}
        <BeforeAfterSlider />

        {/* MINI-GAME QUIZ SECTION */}
        <HistoryQuiz />

        {/* DOCUMENTS SECTION */}
        <Documents />

        {/* EMOTIONS MESSAGE WALL SECTION */}
        <MessageWall />
      </main>

      {/* AUTHENTIC LOCAL HOST ORGANIZERS BAR */}
      <section className="bg-slate-100 border-t border-slate-200/60 py-10 px-4 md:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-6">
            Đơn vị đồng hành thực hiện
          </span>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-blue-600" />
              <span className="text-xs md:text-sm font-bold text-slate-700">
                TRƯỜNG CAO ĐẲNG KỸ THUẬT CÔNG NGHỆ BÀ RỊA VŨNG TÀU
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center border border-yellow-400">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              </div>
              <span className="font-display font-extrabold text-white tracking-tight">
                TP. HỒ CHÍ MINH 50 NĂM
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto md:mx-0">
              Cổng thông tin và trang trải nghiệm kỷ niệm 50 năm ngày thành lập
              Thành phố mang tên Bác kính yêu (02/07/1976 - 02/07/2026). Một dự
              án học tập, giáo dục lịch sử và kết nối tinh thần tình nguyện của
              thế hệ trẻ học sinh, sinh viên toàn thành phố.
            </p>
          </div>

          {/* Quick Navigation links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Danh mục trải nghiệm
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  1. Tổng quan vinh quang
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("timeline")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  2. Trục hành trình 50 năm
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("xua-nay")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  3. Không gian Đối chiếu Xưa & Nay
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("minigame")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  4. Đấu trường tri thức lịch sử
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("tai-lieu")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  5. Thư viện tài liệu sinh viên
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("buc-tuong-cam-xuc")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  6. Bức tường lưu niệm cảm xúc
                </button>
              </li>
            </ul>
          </div>

          {/* Social connections */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-display font-bold text-white text-sm mb-4 uppercase tracking-wider">
              Liên kết kết nối
            </h4>
            <p className="text-xs text-slate-500 mb-4 max-w-sm mx-auto md:mx-0">
              Hãy lan tỏa tinh thần tự hào này đến bạn bè cùng lớp bằng cách
              chia sẻ trang web kỷ niệm này!
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <button
                onClick={shareWebPage}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook Link"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://hoisinhvien.vn"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Website Link"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copy bar */}
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 Thành phố Hồ Chí Minh - Khát vọng Vươn cao.</span>
          <span>
            Thiết kế bởi Hội sinh viên tình nguyện bằng React & Tailwind.
          </span>
        </div>
      </footer>

      {/* FLOAT Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-600/20 hover:shadow-red-600/40 border border-yellow-400/20 hover:-translate-y-1 active:translate-y-0 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
