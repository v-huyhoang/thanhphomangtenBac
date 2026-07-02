<?php

namespace Database\Seeders;

use App\Models\Document;
use Illuminate\Database\Seeder;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $docs = [
            [
                'title' => 'Sáng 2/7, kỷ niệm trọng thể 50 năm Ngày Thành phố Sài Gòn-Gia Định mang tên Chủ tịch Hồ Chí Minh',
                'description' => 'Tư liệu tổng kết, đánh giá thành tựu to lớn, toàn diện của TP.HCM sau nửa thế kỷ phát triển dưới sự lãnh đạo của Đảng và Nhà nước.',
                'category' => 'Lịch sử',
                'file_type' => 'WEBSITE',
                'size_or_duration' => 'Liên kết ngoài',
                'author' => 'Báo Chính phủ',
                'url' => 'https://baochinhphu.vn/sang-nay-2-7-ky-niem-trong-the-50-nam-ngay-thanh-pho-sai-gon-gia-dinh-mang-ten-chu-tich-ho-chi-minh-10226070207274128.htm',
                'download_count' => 1540,
            ],
            [
                'title' => 'Kỷ niệm 50 năm Thành phố mang tên Bác: Đột phá thể chế, mở cánh cửa cho khát vọng đô thị toàn cầu',
                'description' => 'Tài liệu định hướng quy hoạch chiến lược, đột phá thể chế để giải phóng nguồn lực của siêu đô thị và xây dựng Trung tâm Tài chính Quốc tế.',
                'category' => 'Quy hoạch',
                'file_type' => 'PDF',
                'size_or_duration' => '4.8 MB',
                'author' => 'Cổng thông tin điện tử TP.HCM',
                'url' => 'https://tphcm.chinhphu.vn/ky-niem-50-nam-thanh-pho-mang-ten-bac-dot-pha-the-che-mo-canh-cua-cho-khat-vong-do-thi-toan-cau-101260628164250668.htm',
                'download_count' => 2890,
            ],
            [
                'title' => 'Ấn phẩm bỏ túi kỷ niệm 50 năm thành phố mang tên Bác',
                'description' => 'Cẩm nang văn hóa, lịch sử bỏ túi giới thiệu các địa danh gắn liền với chặng đường phát triển và tình yêu bền bỉ dành cho Thành phố mang tên Bác.',
                'category' => 'Giáo dục',
                'file_type' => 'EBOOK',
                'size_or_duration' => '3.2 MB',
                'author' => 'Báo Tuổi Trẻ',
                'url' => 'https://tuoitre.vn/dulichtphcm/chuyen-dong/ra-mat-an-pham-bo-tui-ky-niem-50-nam-thanh-pho-mang-ten-bac-c2a115387.html',
                'download_count' => 1945,
            ],
            [
                'title' => 'Cầu truyền hình nghệ thuật - chính luận \'Rạng rỡ tên Người\'',
                'description' => 'Chương trình nghệ thuật và tư liệu lịch sử đặc biệt kết nối các điểm cầu, tái hiện hành trình lịch sử đầy tự hào của Thành phố Hồ Chí Minh qua nửa thế kỷ.',
                'category' => 'Văn hóa',
                'file_type' => 'WEBSITE',
                'size_or_duration' => '120 phút',
                'author' => 'Báo Lao Động',
                'url' => 'https://laodong.vn/xa-hoi/tai-hien-hanh-trinh-50-nam-tphcm-mang-ten-bac-qua-cau-truyen-hinh-rang-ro-ten-nguoi-1729069.ldo',
                'download_count' => 3420,
            ],
            [
                'title' => 'Toàn cảnh lễ kỷ niệm 50 năm thành phố mang tên Bác tại Hội trường Thống Nhất',
                'description' => 'Báo cáo nội dung diễn văn chính trị, tổng kết các chính sách và định hướng phát triển của Thành phố trong kỷ nguyên mới.',
                'category' => 'Chính sách',
                'file_type' => 'WEBSITE',
                'size_or_duration' => 'Liên kết ngoài',
                'author' => 'Báo Thanh Niên',
                'url' => 'https://thanhnien.vn/toan-canh-le-ky-niem-50-nam-thanh-pho-mang-ten-bac-185260702115021346.htm',
                'download_count' => 2026,
            ],
            [
                'title' => 'Sài Gòn-Gia Định-TPHCM: Bản anh hùng ca và khát vọng trong kỷ nguyên vươn mình',
                'description' => 'Tài liệu tổng hợp chuỗi sự kiện lịch sử trọng thể diễn ra vào sáng ngày 2/7/2026 kỷ niệm chặng đường 50 năm vẻ vang.',
                'category' => 'Lịch sử',
                'file_type' => 'PDF',
                'size_or_duration' => '8.5 MB',
                'author' => 'Báo Nhân Dân',
                'url' => 'https://nhandan.vn/sang-nay-dien-ra-le-ky-niem-50-nam-ngay-thanh-pho-sai-gon-gia-dinh-vinh-du-mang-ten-chu-tich-ho-chi-minh-271976-272026-post972855.html',
                'download_count' => 1976,
            ],
            [
                'title' => 'Chuỗi hoạt động văn hóa nghệ thuật cộng đồng mừng 50 năm thành phố mang tên Bác',
                'description' => 'Tài liệu giới thiệu các chương trình trình diễn 3D mapping tại trụ sở UBND, bắn pháo hoa và không gian văn hóa nghệ thuật đường phố.',
                'category' => 'Văn hóa',
                'file_type' => 'WEBSITE',
                'size_or_duration' => 'Liên kết ngoài',
                'author' => 'Báo Tiền Phong',
                'url' => 'https://tienphong.vn/nguoi-dan-han-hoan-xuong-duong-mung-50-nam-thanh-pho-mang-ten-bac-post1856382.tpo',
                'download_count' => 4512,
            ],
        ];

        foreach ($docs as $doc) {
            Document::create($doc);
        }
    }
}
