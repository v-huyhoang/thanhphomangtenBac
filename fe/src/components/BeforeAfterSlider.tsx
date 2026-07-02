import React, { useState, useRef, useEffect } from "react";
import { ChevronsLeftRight, Eye, Sparkles, HelpCircle } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const setPresetPosition = (pos: number) => {
    setSliderPosition(pos);
  };

  return (
    <section
      id="xua-nay"
      className="py-20 bg-white px-4 md:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold tracking-wider text-red-600 uppercase">
            Góc Nhìn Di Sản
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Thành Phố Xưa & Nay
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Kéo tay cầm ở giữa hoặc click các phím điều khiển bên dưới để đối
            chiếu nét hoài cổ rêu phong và vẻ năng động, phồn hoa của thành phố
            qua thời gian.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div className="relative bg-slate-100 rounded-3xl p-3 shadow-xl border border-slate-100">
          <div
            ref={containerRef}
            className="relative h-[320px] sm:h-[450px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onTouchStart={() => setIsDragging(true)}
          >
            {/* Background Image: MODERN ("Nay") - Full width */}
            <div className="absolute inset-0">
              <img
                src="https://lh6.googleusercontent.com/pLteP5yQNDY6tiTX3lz6sLF9-CNzmZF3yTa5Fw-E48jAEQHQp9IbOkwBwnhYFZrBVMg4kUYNwANEHborqK1Ip65sgVLwGZYl1fCdcvBUoKueLGJ0hcHS_-pcNP3Gt729U_uwec5e"
                alt="TP.HCM Ngày Nay"
                className="w-full h-full object-cover pointer-events-none animate-fade-in"
                referrerPolicy="no-referrer"
              />
              {/* Badge label bottom right */}
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-yellow-300 flex items-center gap-1.5 border border-yellow-400/20 z-10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TP.HCM HIỆN ĐẠI (NAY)</span>
              </div>
            </div>

            {/* Foreground Image: CLASSIC ("Xưa") - Dynamic width container */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden z-10 transition-all duration-75"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Force image to remain at full width of parent containerRef to prevent stretching */}
              <div
                className="absolute inset-y-0 left-0 w-[800px] sm:w-[900px] md:w-[1000px]"
                style={{
                  width: containerRef.current?.getBoundingClientRect().width,
                }}
              >
                <img
                  src="https://uploads.nguoidothi.net.vn/content/267ab78a-ede6-43ad-be24-ee42a1697011.jpg"
                  alt="Sài Gòn Xưa"
                  className="w-full h-full object-cover grayscale sepia contrast-120 brightness-95 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                {/* Badge label bottom left */}
                <div className="absolute bottom-4 left-4 bg-red-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-red-100 flex items-center gap-1.5 border border-red-500/20 z-10">
                  <Eye className="w-3.5 h-3.5" />
                  <span>SÀI GÒN HOÀI CỔ (XƯA)</span>
                </div>
              </div>
            </div>

            {/* Sliding Divider Bar */}
            <div
              className="absolute inset-y-0 z-20 w-1 bg-white hover:bg-yellow-300 cursor-ew-resize transition-colors"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-800 border-2 border-red-600 shadow-xl flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-colors">
                <ChevronsLeftRight className="w-5 h-5" />
              </div>
            </div>

            {/* Active overlay helper */}
            {isDragging && (
              <div className="absolute inset-0 bg-transparent z-30 pointer-events-none"></div>
            )}
          </div>
        </div>

        {/* Quick controls and guides */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span>Mẹo: Giữ và kéo nút tròn màu trắng ở giữa sang hai bên</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setPresetPosition(100)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sliderPosition === 100
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Chỉ xem Xưa
            </button>
            <button
              onClick={() => setPresetPosition(50)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sliderPosition === 50
                  ? "bg-slate-800 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Cân bằng (50/50)
            </button>
            <button
              onClick={() => setPresetPosition(0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                sliderPosition === 0
                  ? "bg-amber-500 text-slate-950 shadow-xs"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              Chỉ xem Nay
            </button>
          </div>
        </div>

        {/* Informative Bento card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 bg-linear-to-r from-red-50 to-amber-50 rounded-2xl p-6 border border-red-100">
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              Sài Gòn - Hòn Ngọc Viễn Đông
            </h4>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Thời kỳ trước, thành phố mang kiến trúc cổ kính giao thoa Đông Tây
              với những mái ngói rêu phong, xe lôi tự chế, tiếng chuông nhà thờ
              thanh bình và những tà áo dài thướt tha trên đường phố.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Đô Thị Đột Phá - Tương Lai Số
            </h4>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              Hôm nay, một TP.HCM năng động, sáng bừng rực rỡ với các tòa nhà
              chọc trời, hệ thống công viên cây xanh, giao thông ngầm hiện đại,
              đón đầu các dòng chảy tri thức toàn cầu của thời đại mới.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
