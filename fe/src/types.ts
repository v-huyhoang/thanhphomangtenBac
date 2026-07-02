export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  badge: string;
  details: string;
  tag: string;
  image?: string;
  link?: {
    label: string;
    url: string;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  isUser?: boolean;
}

export interface WallMessage {
  id: string;
  name: string;
  school: string;
  message: string;
  timestamp: string;
  likes: number;
  likedByUser?: boolean;
  colorIndex: number; // For elegant pastel/dark warm accent variations
}

export interface DocumentResource {
  id: number;
  title: string;
  description: string;
  category:
    | "Lịch sử"
    | "Quy hoạch"
    | "Giáo dục"
    | "Văn hóa"
    | "Chính sách"
    | "Kinh tế"
    | "Tài liệu đa phương tiện"
    | "Nghệ thuật";
  fileType: "PDF" | "DOCX" | "EBOOK" | "WEBSITE" | "VIDEO" | "AUDIO";
  sizeOrDuration: string;
  author: string;
  url: string;
  downloadCount: number;
}
