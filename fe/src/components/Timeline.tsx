import React, { useState, useEffect } from "react";
import { TimelineEvent } from "../types";
import {
  ChevronDown,
  ChevronUp,
  Landmark,
  Milestone,
  Sparkles,
  TrendingUp,
  Cpu,
  ExternalLink,
} from "lucide-react";

export default function Timeline() {
  const [timelineData, setTimelineData] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/timeline")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch timeline");
        return res.json();
      })
      .then((data) => {
        setTimelineData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading timeline:", err);
        setLoading(false);
      });
  }, []);

  const getIcon = (year: string) => {
    switch (year) {
      case "1911":
        return <Milestone className="w-5 h-5 text-indigo-600" />;
      case "1945":
        return <Sparkles className="w-5 h-5 text-orange-600" />;
      case "1975":
        return <Landmark className="w-5 h-5 text-red-600" />;
      case "1976":
        return <Landmark className="w-5 h-5 text-rose-600" />;
      case "1986":
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case "1998":
        return <Milestone className="w-5 h-5 text-emerald-600" />;
      case "2011":
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "2015":
        return <Sparkles className="w-5 h-5 text-violet-600" />;
      case "2021":
        return <Cpu className="w-5 h-5 text-cyan-600" />;
      case "2026":
        return <Cpu className="w-5 h-5 text-fuchsia-600" />;
      default:
        return <Milestone className="w-5 h-5 text-slate-600" />;
    }
  };

  const getBorderColor = (year: string) => {
    switch (year) {
      case "1911":
        return "border-indigo-500 hover:bg-indigo-50/20";
      case "1945":
        return "border-orange-500 hover:bg-orange-50/20";
      case "1975":
        return "border-red-500 hover:bg-red-50/20";
      case "1976":
        return "border-rose-500 hover:bg-rose-50/20";
      case "1986":
        return "border-amber-500 hover:bg-amber-50/20";
      case "1998":
        return "border-emerald-500 hover:bg-emerald-50/20";
      case "2011":
        return "border-blue-500 hover:bg-blue-50/20";
      case "2015":
        return "border-violet-500 hover:bg-violet-50/20";
      case "2021":
        return "border-cyan-500 hover:bg-cyan-50/20";
      case "2026":
        return "border-fuchsia-500 hover:bg-fuchsia-50/20";
      default:
        return "border-slate-500";
    }
  };

  const getBadgeStyle = (year: string) => {
    switch (year) {
      case "1911":
        return "bg-indigo-100 text-indigo-800";
      case "1945":
        return "bg-orange-100 text-orange-800";
      case "1975":
        return "bg-red-100 text-red-800";
      case "1976":
        return "bg-rose-100 text-rose-800";
      case "1986":
        return "bg-amber-100 text-amber-800";
      case "1998":
        return "bg-emerald-100 text-emerald-800";
      case "2011":
        return "bg-blue-100 text-blue-800";
      case "2015":
        return "bg-violet-100 text-violet-800";
      case "2021":
        return "bg-cyan-100 text-cyan-800";
      case "2026":
        return "bg-fuchsia-100 text-fuchsia-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="timeline" className="py-20 bg-slate-50 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-wider text-red-600 uppercase">
            Hành trình nửa thế kỷ
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Cột Mốc Phát Triển Rực Rỡ
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Nhìn lại chặng đường 50 năm hào hùng kiến tạo và đổi mới toàn diện
            của Thành phố Hồ Chí Minh, từ thời khắc đổi tên vinh dự đến tương
            lai đô thị số thông minh. Nhấp vào các cột mốc để tìm hiểu thêm chi
            tiết.
          </p>
        </div>

        {/* Timeline Line Container */}
        <div className="relative">
          {/* Central Vertical Line (Visible on Desktop centered, on Mobile aligned to left) */}
          <div className="absolute left-6 md:left-1/2 top-2 bottom-2 w-1 bg-gradient-to-b from-red-500 via-amber-400 to-violet-500 -translate-x-1/2 rounded-full"></div>

          {/* Timeline Items */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 mt-4 text-sm font-medium">
                Đang tải chặng đường lịch sử...
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {timelineData.map((item, index) => {
                const isEven = index % 2 === 0;
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                    id={`timeline-item-${item.id}`}
                  >
                    {/* Circle Pin Marker */}
                    <div className="absolute left-6 md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-slate-200 flex items-center justify-center -translate-x-1/2 z-10 shadow-md">
                      {getIcon(item.year)}
                    </div>

                    {/* Content Card (Left or Right aligned depending on odd/even) */}
                    <div
                      className={`w-[calc(100%-3rem)] md:w-[45%] ml-12 md:ml-0 transition-all duration-300 ${
                        isEven ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <div
                        onClick={() => toggleExpand(item.id)}
                        className={`cursor-pointer p-6 bg-white rounded-2xl border-l-4 ${getBorderColor(
                          item.year,
                        )} shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                      >
                        <div className="flex justify-between items-start mb-3 gap-2">
                          <span className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 leading-none">
                            {item.year}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getBadgeStyle(item.year)}`}
                          >
                            {item.badge}
                          </span>
                        </div>

                        <h3 className="font-display text-lg font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {/* Expandable Section */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded
                              ? "max-h-[32rem] opacity-100"
                              : "max-h-0 opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="pt-4 border-t border-slate-100 mt-4 text-slate-600 text-xs md:text-sm leading-relaxed space-y-4 bg-slate-50 p-4 rounded-lg">
                            {item.image && (
                              <div className="overflow-hidden rounded-xl h-40 md:h-48 w-full shadow-sm relative group">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                              </div>
                            )}

                            <p className="font-light text-slate-700">
                              {item.details}
                            </p>

                            {item.link && (
                              <div className="pt-1.5 pb-0.5">
                                <a
                                  href={item.link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-100/60 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>{item.link.label}</span>
                                </a>
                              </div>
                            )}

                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                              <span>Chủ đề: {item.tag}</span>
                            </div>
                          </div>
                        </div>

                        {/* Expand indicator button */}
                        <div className="flex justify-end pt-2 border-t border-slate-50 mt-2">
                          <span className="text-xs text-red-600 font-medium flex items-center gap-1 hover:underline">
                            {isExpanded ? (
                              <>
                                <span>Thu gọn</span>
                                <ChevronUp className="w-3 h-3" />
                              </>
                            ) : (
                              <>
                                <span>Đọc thêm</span>
                                <ChevronDown className="w-3 h-3 animate-pulse" />
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
