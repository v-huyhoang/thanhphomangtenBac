import React, { useState, useEffect } from "react";
import { AVATAR_COLORS, WALL_COLORS } from "../data";
import { WallMessage } from "../types";
import {
  Send,
  Heart,
  MessageSquare,
  Sparkles,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MessageWall() {
  const [messages, setMessages] = useState<WallMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newSchool, setNewSchool] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "likes">("newest");
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Load from API
  const fetchMessages = () => {
    setLoading(true);
    fetch(`/api/messages?sort_by=${sortBy}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch messages");
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, [sortBy]);

  // Reset page when search/sorting changes or messages array changes size
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, messages.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    // Pick a random color index (0 to 5)
    const randomColorIndex = Math.floor(Math.random() * WALL_COLORS.length);

    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName.trim(),
        school: newSchool.trim() || "Sinh viên TP.HCM",
        message: newMessage.trim(),
        color_index: randomColorIndex,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post message");
        return res.json();
      })
      .then((newWallMsg: WallMessage) => {
        setMessages((prev) => [newWallMsg, ...prev]);
        // Reset Form
        setNewName("");
        setNewSchool("");
        setNewMessage("");
        setSubmitted(true);

        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      })
      .catch((err) => console.error("Error posting message:", err));
  };

  const handleLikeMessage = (id: string) => {
    fetch(`/api/messages/${id}/like`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to like message");
        return res.json();
      })
      .then((data: { likes: number; likedByUser: boolean }) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id
              ? { ...msg, likes: data.likes, likedByUser: data.likedByUser }
              : msg
          )
        );
      })
      .catch((err) => console.error("Error liking message:", err));
  };

  return (
    <section id="buc-tuong-cam-xuc" className="py-10 bg-slate-50 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-bold tracking-wider text-red-600 uppercase">
            Gửi Gắm Niềm Tin
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Bức Tường Cảm Xúc
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            Nơi kết nối hàng ngàn lời chúc, thông điệp tự hào và khát vọng sáng
            tạo của học sinh, sinh viên gửi tới Thành phố Hồ Chí Minh anh hùng
            nhân cột mốc vàng 50 năm tuổi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Submit message form (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl lg:sticky lg:top-24">
            <h3 className="font-display font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              Gửi Lời Chúc Của Bạn
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Lời nhắn của bạn sẽ được hiển thị ngay lập tức lên Bức tường cảm
              xúc của giới trẻ toàn thành phố.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1 uppercase tracking-wider">
                  Họ và Tên
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Lê Minh Trí"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/10 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1 uppercase tracking-wider">
                  Trường Học / Tổ Chức
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: ĐH Khoa học Tự nhiên"
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/10 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-slate-700 text-xs font-semibold mb-1 uppercase tracking-wider">
                  Lời nhắn / Tâm tình
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={250}
                  placeholder="Chia sẻ niềm tự hào, lời chúc hoặc ước vọng của bạn dành cho thành phố tuổi 50... (Tối đa 250 ký tự)"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/10 text-slate-800 placeholder-slate-400 text-sm outline-none transition-all resize-none"
                ></textarea>
                <div className="flex justify-end text-[10px] text-slate-400 font-mono mt-1">
                  {newMessage.length}/250 ký tự
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-md shadow-red-600/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Lời Tâm Tình</span>
              </button>
            </form>

            {submitted && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  Tuyệt vời! Lời nhắn của bạn đã xuất hiện trên bức tường.
                </span>
              </div>
            )}
          </div>

          {/* RIGHT: Grid display wall (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Sorting Filter Controls */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <span className="text-xs md:text-sm text-slate-500 font-medium">
                Đang hiển thị{" "}
                <strong className="text-slate-800">{messages.length}</strong>{" "}
                lời chúc
              </span>

              <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setSortBy("newest")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                    sortBy === "newest"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Mới nhất
                </button>
                <button
                  onClick={() => setSortBy("likes")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all flex items-center gap-1 ${
                    sortBy === "likes"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Heart className="w-3 h-3 fill-current" />
                  Yêu thích nhất
                </button>
              </div>
            </div>

            {/* Grid of Message Cards */}
            {loading ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="inline-block w-8 h-8 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 mt-4 text-sm font-medium">Đang tải những lời chúc yêu thương...</p>
              </div>
            ) : messages.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(() => {
                    const start = (currentPage - 1) * itemsPerPage;
                    const paginated = messages.slice(start, start + itemsPerPage);

                    return paginated.map((msg) => {
                      const colorTheme =
                        WALL_COLORS[msg.colorIndex % WALL_COLORS.length];
                      const avatarColor =
                        AVATAR_COLORS[msg.colorIndex % AVATAR_COLORS.length];

                      return (
                        <div
                          key={msg.id}
                          className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colorTheme} animate-fade-in`}
                          id={`message-card-${msg.id}`}
                        >
                          <div>
                            {/* Card Header: Avatar & Info */}
                            <div className="flex items-center gap-2.5 mb-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ${avatarColor}`}
                              >
                                {msg.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-display font-bold text-slate-900 text-sm leading-none truncate">
                                  {msg.name}
                                </h4>
                                <span className="text-[10px] text-slate-500 font-medium truncate block mt-0.5">
                                  {msg.school}
                                </span>
                              </div>
                            </div>

                            {/* Card Content: Message */}
                            <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-light whitespace-pre-line italic">
                              "{msg.message}"
                            </p>
                          </div>

                          {/* Card Footer: Timestamp & Like action */}
                          <div className="flex items-center justify-between border-t border-slate-200/40 pt-3 mt-4 text-[10px] text-slate-400 font-medium">
                            <span>{msg.timestamp}</span>

                            <button
                              onClick={() => handleLikeMessage(msg.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                                msg.likedByUser
                                  ? "bg-red-500 border-red-500 text-white shadow-xs scale-105"
                                  : "bg-white/80 border-slate-200 text-slate-500 hover:text-red-500 hover:bg-red-50/50"
                              }`}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${msg.likedByUser ? "fill-current" : ""}`}
                              />
                              <span className="font-bold">{msg.likes}</span>
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Pagination Controls */}
                {(() => {
                  const totalPages = Math.ceil(messages.length / itemsPerPage);
                  if (totalPages <= 1) return null;

                  return (
                    <div className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200/60 shadow-xs mt-6">
                      <span className="text-xs text-slate-500 font-medium">
                        Trang{" "}
                        <strong className="text-slate-800">{currentPage}</strong> /{" "}
                        {totalPages}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                          className="p-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                          aria-label="Previous Page"
                        >
                          <ChevronLeft className="w-4 h-4 text-slate-600" />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (page) => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                currentPage === page
                                  ? "bg-red-600 text-white shadow-xs"
                                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              {page}
                            </button>
                          ),
                        )}

                        <button
                          onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                          }
                          disabled={currentPage === totalPages}
                          className="p-1.5 border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                          aria-label="Next Page"
                        >
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-700 text-sm">
                  Chưa có lời chúc nào
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Hãy là người đầu tiên gửi lời chúc ý nghĩa đến thành phố!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
