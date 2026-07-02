# Thiết Kế Schema Database - Hệ Thống Kỷ Niệm 50 Năm Thành Phố Mang Tên Bác

Tài liệu này cung cấp thiết kế cấu trúc cơ sở dữ liệu chi tiết (Schema Database), các câu lệnh SQL DDL chuẩn, cùng mô hình quan hệ phục vụ cho việc triển khai phần backend thực tế của ứng dụng.

Hệ quản trị cơ sở dữ liệu khuyến nghị: **PostgreSQL** (hoặc **MySQL** / **MariaDB**).

---

## 1. Biểu Đồ Quan Hệ Thực Thể (ERD Concept)

```text
  [timeline_events] (Cột mốc lịch sử)
  
  [quiz_questions] (Ngân hàng câu hỏi trắc nghiệm)
  
  [leaderboard] (Bảng xếp hạng thi tài lịch sử)
  
  [wall_messages] (Thông điệp / Bức tường cảm xúc)
        └─── (1) : (N) ───► [message_likes] (Theo dõi lượt thả tim của người dùng/IP)
        
  [documents] (Thư viện tài liệu & học liệu số)
```

---

## 2. Chi Tiết Các Bảng Trong Database

### 2.1 Bảng `timeline_events` (Quản lý các cột mốc lịch sử)
Lưu trữ thông tin các mốc son lịch sử của Thành phố Hồ Chí Minh qua các thời kỳ.

| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` (hoặc `INT`) | `PRIMARY KEY`, `AUTO_INCREMENT` | Định danh duy nhất của cột mốc. |
| `year` | `VARCHAR(10)` | `NOT NULL` | Năm diễn ra sự kiện (Ví dụ: "1911", "1976"). |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tiêu đề của cột mốc lịch sử. |
| `tag` | `VARCHAR(100)` | `NOT NULL` | Nhãn chủ đề (Ví dụ: "Bến Nhà Rồng", "Đại hội thống nhất"). |
| `description` | `TEXT` | `NOT NULL` | Mô tả ngắn gọn xuất hiện ngoài dòng thời gian. |
| `badge` | `VARCHAR(100)` | `NOT NULL` | Nhãn phụ nổi bật màu sắc (Ví dụ: "Mốc son khởi đầu"). |
| `details` | `TEXT` | `NOT NULL` | Mô tả chi tiết khi người dùng nhấn mở rộng. |
| `image` | `VARCHAR(512)` | `NULL` | Đường dẫn/URL hình ảnh minh họa cho mốc lịch sử. |
| `link_label` | `VARCHAR(255)` | `NULL` | Nhãn của liên kết ngoài (Ví dụ: "Tìm hiểu Quyết định đặt tên..."). |
| `link_url` | `VARCHAR(512)` | `NULL` | URL liên kết ngoài để đọc thêm tài liệu chính thống. |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời gian khởi tạo bản ghi. |

---

### 2.2 Bảng `quiz_questions` (Ngân hàng đề thi trắc nghiệm)
Lưu trữ các câu hỏi trắc nghiệm kiến thức lịch sử phục vụ module "Đấu trường Lịch sử".

| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | Định danh duy nhất câu hỏi. |
| `question` | `TEXT` | `NOT NULL` | Nội dung câu hỏi trắc nghiệm. |
| `options` | `JSON` (hoặc `TEXT[]`) | `NOT NULL` | Mảng danh sách 4 phương án trả lời dưới dạng JSON Array (Ví dụ: `["Sài Gòn - Gia Định", "Gia Định", ...]`). |
| `correct_answer`| `INT` | `NOT NULL` | Chỉ mục của đáp án đúng (0, 1, 2, 3 tương ứng với phương án). |
| `explanation` | `TEXT` | `NOT NULL` | Lời giải thích khoa học/lịch sử chi tiết sau khi trả lời. |
| `category` | `VARCHAR(100)` | `NOT NULL` | Danh mục câu hỏi (Ví dụ: "Địa danh", "Sự kiện", "Nhân vật"). |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Thời gian khởi tạo. |

---

### 2.3 Bảng `leaderboard` (Bảng xếp hạng kết quả thi đấu)
Lưu kết quả các lượt thi trắc nghiệm xuất sắc nhất của học sinh, sinh viên.

| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | Định danh lượt ghi danh. |
| `name` | `VARCHAR(100)` | `NOT NULL` | Họ và tên thí sinh. |
| `school` | `VARCHAR(255)` | `NOT NULL` | Tên Trường THPT / Đại học / Cao đẳng của thí sinh. |
| `score` | `INT` | `NOT NULL` | Số câu trả lời đúng (Ví dụ: 10/10). |
| `time_in_seconds`| `INT` | `NOT NULL` | Tổng thời gian hoàn thành bài thi (tính bằng giây). |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Ngày giờ thực hiện bài thi (sử dụng thay thế trường `date`). |

> *Chỉ mục khuyến nghị (Index):* Tạo index phức hợp trên `(score DESC, time_in_seconds ASC)` để tối ưu tốc độ truy vấn bảng xếp hạng thời gian thực.

---

### 2.4 Bảng `wall_messages` (Bức tường thông điệp cảm xúc)
Lưu trữ cảm tưởng, lời chúc, thông điệp tự hào của người trẻ gửi tới Thành phố.

| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | Định danh thông điệp. |
| `name` | `VARCHAR(100)` | `NOT NULL` | Tên người gửi (hoặc ẩn danh). |
| `school` | `VARCHAR(255)` | `NOT NULL` | Tên trường học hoặc Đơn vị công tác. |
| `message` | `TEXT` | `NOT NULL` | Nội dung lời chúc / cảm tưởng. |
| `likes` | `INT` | `DEFAULT 0` | Số lượt thả tim hiện tại. |
| `color_index` | `INT` | `DEFAULT 0` | Chỉ số màu nền của card thông điệp (0 đến 3 để render màu pastel). |
| `status` | `VARCHAR(50)` | `DEFAULT 'approved'` | Trạng thái kiểm duyệt (Ví dụ: 'pending', 'approved', 'rejected'). |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Ngày giờ đăng tải cảm tưởng. |

---

### 2.5 Bảng `message_likes` (Theo dõi lượt thích thông điệp)
Ngăn chặn hành vi spam tự động thả tim nhiều lần trên cùng một thông điệp (đồng bộ với cơ chế `likedByUser` phía Client).

| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | Định danh bản ghi lượt thích. |
| `message_id` | `INT` | `NOT NULL`, `FOREIGN KEY` | Tham chiếu tới `wall_messages(id)` ON DELETE CASCADE. |
| `user_ip` | `VARCHAR(45)` | `NOT NULL` | Lưu địa chỉ IPv4/IPv6 hoặc Client ID của thiết bị để kiểm tra trùng lặp. |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Ngày giờ thả tim. |

> *Ràng buộc duy nhất (Unique Constraint):* Tạo khoá duy nhất phức hợp trên `(message_id, user_ip)` để đảm bảo mỗi IP chỉ được thích mỗi thông điệp tối đa 1 lần.

---

### 2.6 Bảng `documents` (Thư viện tài liệu học tập số)
Lưu trữ thông tin và liên kết tải/đọc các văn kiện lịch sử, nghiên cứu khoa học cho sinh viên.

| Tên trường | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | `SERIAL` | `PRIMARY KEY` | Định danh tài liệu. |
| `title` | `VARCHAR(255)` | `NOT NULL` | Tên tài liệu / Nghị quyết / Sách điện tử. |
| `description` | `TEXT` | `NOT NULL` | Tóm tắt nội dung chính của tài liệu học tập. |
| `category` | `VARCHAR(100)` | `NOT NULL` | Phân loại: "Lịch sử", "Quy hoạch", "Văn hóa", "Giáo dục", "Chính sách". |
| `file_type` | `VARCHAR(20)` | `NOT NULL` | Định dạng file: "PDF", "DOCX", "EBOOK", "WEBSITE". |
| `size_or_duration`| `VARCHAR(50)`| `NOT NULL` | Kích thước file hoặc mô tả dung lượng (Ví dụ: "2.4 MB", "Liên kết ngoài"). |
| `author` | `VARCHAR(255)` | `NOT NULL` | Đơn vị phát hành / Tác giả biên soạn (Ví dụ: "Thành Đoàn TP.HCM"). |
| `url` | `VARCHAR(512)` | `NOT NULL` | Đường dẫn trực tiếp để tải về hoặc chuyển tiếp đến trang lưu trữ chính thống. |
| `download_count`| `INT` | `DEFAULT 0` | Số lượt sinh viên nhấn tải/xem tài liệu này. |
| `created_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Ngày giờ tạo/đăng tài liệu. |

---

## 3. Bản Vẽ Câu Lệnh SQL DDL Hoàn Chỉnh (PostgreSQL)

Dưới đây là mã nguồn SQL sẵn sàng để thực thi (execute) nhằm khởi tạo cấu trúc cơ sở dữ liệu trên máy chủ:

```sql
-- 1. Khởi tạo bảng mốc lịch sử
CREATE TABLE timeline_events (
    id SERIAL PRIMARY KEY,
    year VARCHAR(10) NOT NULL,
    title VARCHAR(255) NOT NULL,
    tag VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    badge VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    image VARCHAR(512),
    link_label VARCHAR(255),
    link_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Khởi tạo bảng ngân hàng câu hỏi trắc nghiệm
CREATE TABLE quiz_questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    options JSON NOT NULL, -- Lưu danh sách mảng đáp án dạng ["A", "B", "C", "D"]
    correct_answer INT NOT NULL, -- Index từ 0 đến 3
    explanation TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Khởi tạo bảng xếp hạng thi đua
CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    school VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    time_in_seconds INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo Index tối ưu hóa truy vấn bảng xếp hạng nhanh chóng
CREATE INDEX idx_leaderboard_performance ON leaderboard (score DESC, time_in_seconds ASC);

-- 4. Khởi tạo bảng bức tường thông điệp cảm xúc
CREATE TABLE wall_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    school VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    likes INT DEFAULT 0,
    color_index INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Khởi tạo bảng chống spam thả tim thông điệp
CREATE TABLE message_likes (
    id SERIAL PRIMARY KEY,
    message_id INT NOT NULL REFERENCES wall_messages(id) ON DELETE CASCADE,
    user_ip VARCHAR(45) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_message_ip_like UNIQUE (message_id, user_ip)
);

-- 6. Khởi tạo bảng quản lý tài liệu, thư viện số
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    size_or_duration VARCHAR(50) NOT NULL,
    author VARCHAR(255) NOT NULL,
    url VARCHAR(512) NOT NULL,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Đặc Tả Thiết Kế API RESTful Cho Backend

Sau khi có cấu trúc cơ sở dữ liệu trên, bạn có thể dễ dàng thiết lập một máy chủ Node.js Express với các API sau để phục vụ Client tương ứng:

| Method | Endpoint | Mô tả | SQL Query Demo |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/timeline` | Lấy danh sách 10 cột mốc lịch sử | `SELECT * FROM timeline_events ORDER BY year ASC;` |
| **GET** | `/api/quiz` | Lấy ngẫu nhiên câu hỏi ôn tập trắc nghiệm | `SELECT * FROM quiz_questions ORDER BY RANDOM() LIMIT 10;` |
| **GET** | `/api/leaderboard`| Lấy top 10 thí sinh xếp hạng cao nhất | `SELECT * FROM leaderboard ORDER BY score DESC, time_in_seconds ASC LIMIT 10;` |
| **POST**| `/api/leaderboard`| Ghi danh kết quả thi của sinh viên mới | `INSERT INTO leaderboard(name, school, score, time_in_seconds) VALUES ($1, $2, $3, $4);` |
| **GET** | `/api/messages` | Lấy tin nhắn cảm xúc kèm phân trang | `SELECT * FROM wall_messages WHERE status = 'approved' ORDER BY created_at DESC LIMIT $1 OFFSET $2;` |
| **POST**| `/api/messages` | Sinh viên đăng lời cảm tưởng mới | `INSERT INTO wall_messages(name, school, message, color_index) VALUES ($1, $2, $3, $4);` |
| **POST**| `/api/messages/:id/like`| Thả tim thông điệp và tăng biến đếm | `UPDATE wall_messages SET likes = likes + 1 WHERE id = $1;` |
| **GET** | `/api/documents` | Lấy & tìm kiếm tài liệu có bộ lọc | `SELECT * FROM documents WHERE category = $1 AND title ILIKE $2;` |
| **POST**| `/api/documents/:id/download` | Tăng số lượt xem/tải về tài liệu | `UPDATE documents SET download_count = download_count + 1 WHERE id = $1;` |

---

## 5. Hướng Dẫn Triển Khai Backend (Gợi ý công nghệ)

1. **Framework:** Sử dụng **Node.js (Express)** hoặc **NestJS** kết hợp TypeScript nhằm tương thích tuyệt đối với các kiểu dữ liệu đã thiết kế ở Frontend (`/src/types.ts`).
2. **Thư viện kết nối CSDL (ORM/Query Builder):** Khuyên dùng **Prisma** hoặc **Drizzle ORM** để định nghĩa schema và tự động migrate cơ sở dữ liệu cực kỳ trực quan.
3. **Caching:** Có thể tích hợp thêm **Redis** để lưu trữ bộ nhớ đệm cho bảng xếp hạng (Leaderboard) do dữ liệu này được truy vấn liên tục với tần suất rất cao từ phía người dùng.
