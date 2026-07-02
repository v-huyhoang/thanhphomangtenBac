import React, { useState, useEffect } from "react";
import { DocumentResource } from "../types";
import {
  Search,
  Filter,
  BookOpen,
  Download,
  FileText,
  User,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [documents, setDocuments] = useState<DocumentResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadedId, setDownloadedId] = useState<number | null>(null);

  // Available categories
  const categories = [
    "Tất cả",
    "Lịch sử",
    "Quy hoạch",
    "Văn hóa",
    "Giáo dục",
    "Chính sách",
  ];

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch documents from API
  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/documents?category=${encodeURIComponent(selectedCategory)}&search=${encodeURIComponent(debouncedSearch)}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch documents");
        return res.json();
      })
      .then((data) => {
        setDocuments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading documents:", err);
        setLoading(false);
      });
  }, [selectedCategory, debouncedSearch]);

  // Handle download count increment and open URL
  const handleDownload = (id: number, url: string) => {
    fetch(`/api/documents/${id}/download`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update download count");
        return res.json();
      })
      .then((data: { downloadCount: number }) => {
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc.id === id ? { ...doc, downloadCount: data.downloadCount } : doc
          )
        );
      })
      .catch((err) => console.error("Error updating download count:", err));

    setDownloadedId(id);
    setTimeout(() => setDownloadedId(null), 3000);

    // Open URL in new window safely
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Lịch sử":
        return "bg-red-50 text-red-700 border-red-200/60";
      case "Quy hoạch":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Văn hóa":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Giáo dục":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Chính sách":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/60";
    }
  };

  const getFileTypeBadgeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-rose-500/10 text-rose-600";
      case "DOCX":
        return "bg-blue-500/10 text-blue-600";
      case "EBOOK":
        return "bg-emerald-500/10 text-emerald-600";
      default:
        return "bg-slate-500/10 text-slate-600";
    }
  };

  return (
    <section
      id="tai-lieu"
      className="py-10 bg-slate-50 border-t border-slate-100 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-red-100"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tài liệu & Học liệu số</span>
          </motion.div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Thư Viện Tài Liệu Sinh Viên
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Nơi tổng hợp các nghị quyết, đề án, văn kiện lịch sử và cẩm nang bổ
            ích phục vụ cho học tập, nghiên cứu và tổ chức hoạt động Đoàn - Hội
            của học sinh sinh viên.
          </p>
        </div>

        {/* Search and Category Filter Toolbar */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/60 p-5 md:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tên tài liệu, tác giả, nội dung..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 hover:bg-slate-100/50 focus:bg-white text-sm text-slate-800 border border-slate-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 rounded-xl transition-all outline-none"
              />
            </div>

            {/* Category Buttons Filter */}
            <div className="lg:col-span-8 flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5" />
                Chủ đề:
              </span>
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? "bg-red-600 text-white border-red-600 shadow-xs shadow-red-600/10 scale-102"
                        : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/60">
              <div className="inline-block w-8 h-8 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 mt-4 text-sm font-medium">Đang tìm kiếm tài liệu phù hợp...</p>
            </div>
          ) : documents.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200/70 hover:border-red-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Card Top Information */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${getCategoryBadgeColor(doc.category)}`}
                      >
                        {doc.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getFileTypeBadgeColor(doc.fileType)}`}
                        >
                          {doc.fileType}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {doc.sizeOrDuration}
                        </span>
                      </div>
                    </div>

                    {/* Document Title */}
                    <h3 className="font-display font-bold text-slate-900 group-hover:text-red-600 text-sm md:text-base leading-snug line-clamp-2 mb-2 transition-colors">
                      {doc.title}
                    </h3>

                    {/* Document Description */}
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed line-clamp-3 mb-4">
                      {doc.description}
                    </p>

                    {/* Author Stamp */}
                    <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-slate-500">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px] font-semibold truncate">
                        {doc.author}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="bg-slate-50/60 border-t border-slate-100 p-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">
                      Đã xem:{" "}
                      <strong className="text-slate-600 font-bold">
                        {doc.downloadCount}
                      </strong>
                    </span>

                    <button
                      onClick={() => handleDownload(doc.id, doc.url)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                        downloadedId === doc.id
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                          : "bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border-slate-200 group-hover:border-red-200"
                      }`}
                    >
                      {downloadedId === doc.id ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 animate-bounce" />
                          <span>Đang mở...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Xem tài liệu</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/60">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-bold text-sm">
                Không tìm thấy tài liệu phù hợp
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Hãy thử nhập một từ khóa khác hoặc lọc theo chủ đề.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Tất cả");
                }}
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
