<?php

namespace Database\Seeders;

use App\Models\TimelineEvent;
use Illuminate\Database\Seeder;

class TimelineEventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'year' => '1911',
                'title' => 'Người Thanh Niên Yêu Nước Ra Đi Tìm Đường Cứu Nước',
                'tag' => 'Bến Nhà Rồng',
                'description' => 'Nguyễn Tất Thành rời cảng Sài Gòn trên con tàu Amiral Latouche-Tréville ra đi tìm đường cứu nước.',
                'badge' => 'Mốc son khởi đầu',
                'image' => 'https://hvlq.vn/upload/61311/fck/files/2021_06_06_01_26_191_b55ac.jpg',
                'details' => 'Ngày 05/06/1911, từ Bến cảng Nhà Rồng (Sông Sài Gòn), người thanh niên yêu nước Nguyễn Tất Thành bước lên tàu viễn dương ra đi tìm con đường giải phóng cho dân tộc Việt Nam dưới ách đô hộ của thực dân Pháp.',
                'link_label' => 'Ý nghĩa lịch sử Ngày Bác Hồ ra đi tìm đường cứu nước',
                'link_url' => 'https://baochinhphu.vn/ky-niem-110-nam-ngay-bac-ho-ra-di-tim-duong-cuu-nuoc-102293414.htm',
            ],
            [
                'year' => '1945',
                'title' => 'Sài Gòn Sục Sôi Khởi Nghĩa Giành Chính Quyền',
                'tag' => 'Cách mạng Tháng Tám',
                'description' => 'Hàng vạn nhân dân Sài Gòn xuống đường giành chính quyền, khẳng định ý chí độc lập.',
                'badge' => 'Quật khởi kiên cường',
                'image' => 'https://file.qdnd.vn/data/old_img/phucthang/2010/8/17/170810ThangCQ06.jpg',
                'details' => 'Ngày 25/08/1945, Sài Gòn rực lửa cờ hoa trong cuộc tổng khởi nghĩa giành chính quyền. Sự kiện này là mốc son hào hùng của nhân dân miền Nam, góp phần vào thành công vang dội của Cách mạng Tháng Tám và ngày khai sinh nước Việt Nam Dân chủ Cộng hòa.',
                'link_label' => 'Khởi nghĩa giành chính quyền ở Sài Gòn - Hào khí Cách mạng Tháng Tám',
                'link_url' => 'https://nhandan.vn/khoi-nghia-giang-chinh-quyen-o-sai-gon-ha-hao-khi-cach-mang-thang-tam-post661234.html',
            ],
            [
                'year' => '1975',
                'title' => 'Đại Thắng Mùa Xuân - Giải Phóng Miền Nam',
                'tag' => 'Hội trường Thống Nhất',
                'description' => 'Chiến dịch Hồ Chí Minh toàn thắng, giải phóng hoàn toàn miền Nam, thống nhất đất nước.',
                'badge' => 'Toàn thắng vĩ đại',
                'image' => 'https://file3.qdnd.vn/data/images/0/2022/04/30/lainguyenthang/3004dung1.jpg?dpi=150&quality=100&w=870',
                'details' => 'Vào lúc 11h30 ngày 30/04/1975, lá cờ cách mạng tung bay trên nóc Dinh Độc Lập. Chiến dịch lịch sử mang tên Bác Hồ vĩ đại đã toàn thắng, kết thúc 21 năm kháng chiến chống Mỹ cứu nước, mở ra chương độc lập và thống nhất đất nước.',
                'link_label' => 'Ý nghĩa lịch sử vĩ đại của Đại thắng mùa Xuân năm 1975',
                'link_url' => 'https://baochinhphu.vn/dai-thang-mua-xuan-1975-suc-manh-cua-y-chi-thong-nhat-dat-nuoc-1022404291112345.htm',
            ],
            [
                'year' => '1976',
                'title' => 'Mốc Son Lịch Sử - Khởi Đầu Trang Sử Mới',
                'tag' => 'Đại hội thống nhất',
                'description' => 'Sài Gòn - Gia Định chính thức vinh dự mang tên Chủ tịch Hồ Chí Minh vĩ đại.',
                'badge' => 'Sự kiện trọng đại',
                'image' => 'https://images.hcmcpv.org.vn/res/news/2026/07/02-07-2026-ngay-271976-moc-son-choi-loi-trong-lich-su-thanh-pho-ho-chi-minh-3F121107.png',
                'details' => 'Ngày 02/07/1976, Quốc hội khóa VI nước Cộng hòa Xã hội Chủ nghĩa Việt Nam đã chính thức quyết định đổi tên thành phố Sài Gòn - Gia Định thành Thành phố Hồ Chí Minh. Đây là cột mốc chính thức khởi đầu hành trình kiến tạo, xây dựng lại thành phố sau chiến tranh.',
                'link_label' => 'Ngày Sài Gòn - Gia Định chính thức mang tên Thành phố Hồ Chí Minh',
                'link_url' => 'https://baochinhphu.vn/ngay-271976-sai-gon-gia-dinh-chinh-thuc-mang-ten-thanh-pho-ho-chi-minh-10224070209152431.htm',
            ],
            [
                'year' => '1986',
                'title' => 'Tiên Phong Đổi Mới - Bứt Phá Kinh Tế',
                'tag' => 'Thời kỳ Đổi Mới',
                'description' => 'TP.HCM là \'vườn ươm\' thử nghiệm các mô hình kinh tế thị trường đầu tiên.',
                'badge' => 'Tiên phong sáng tạo',
                'image' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
                'details' => 'Năm 1986 mở ra kỷ nguyên Đổi Mới. TP.HCM đóng vai trò là đầu tàu kinh tế năng động bậc nhất, vượt qua các rào cản bao cấp để thử nghiệm cơ chế quản lý mới, mở cửa thu hút đầu tư nước ngoài (FDI) và xây dựng các khu chế xuất tiên phong.',
                'link_label' => 'Nhìn lại vai trò đầu tàu kinh tế vượt rào cản của TP.HCM thời kỳ đầu Đổi Mới',
                'link_url' => 'https://tphcm.chinhphu.vn/tphcm-trong-su-nghiep-doi-moi-dau-tau-kinh-te-cua-ca-nuoc-1012412151024356.htm',
            ],
            [
                'year' => '1998',
                'title' => 'Kỷ Niệm 300 Năm Sài Gòn - Thành Phố Hồ Chí Minh',
                'tag' => 'Gìn giữ bản sắc',
                'description' => 'Nhìn lại hành trình 300 năm hình thành và phát triển từ thời khẩn hoang.',
                'badge' => 'Cội nguồn văn hóa',
                'image' => 'https://product.hstatic.net/200000481913/product/569aafbc-4e05-48c5-a841-02455b7c9c16_1b0d35f276324b4e814b25d34caeedb2_large.jpg',
                'details' => 'Cột mốc kỷ niệm 300 năm thành lập (1698 - 1998) ghi dấu lịch sử từ thời Chưởng cơ Nguyễn Hữu Cảnh kinh lý lập phủ Gia Định. Thành phố tôn vinh truyền thống yêu nước, đoàn kết, năng động và nhân ái của con người nơi đây.',
                'link_label' => 'Lịch sử hình thành và phát triển hơn 300 năm của vùng đất Sài Gòn - TP.HCM',
                'link_url' => 'https://tphcm.chinhphu.vn/lich-su-hinh-thanh-va-phat-trien-vung-dat-sai-gon-gia-di-nh-tphcm-1012405121630112.htm',
            ],
            [
                'year' => '2011',
                'title' => 'Hạ Tầng Hiện Đại - Thông Xe Hầm Vượt Sông Sài Gòn',
                'tag' => 'Hạ tầng kết nối',
                'description' => 'Chính thức khánh thành Đại lộ Đông Tây và hầm dìm vượt sông Sài Gòn hiện đại nhất Đông Nam Á.',
                'badge' => 'Kỳ tích hạ tầng',
                'image' => 'https://mia.vn/media/uploads/blog-du-lich/ham-song-sai-gon-1-1714700007.jpg',
                'details' => 'Ngày 20/11/2011, hầm dìm Thủ Thiêm chính thức thông xe, kết nối đôi bờ sông Sài Gòn giữa Quận 1 và khu đô thị mới Thủ Thiêm. Công trình là biểu tượng bứt phá về năng lực kỹ thuật xây dựng giao thông đô thị vượt bậc.',
                'link_label' => 'Chính thức thông xe hầm vượt sông Sài Gòn: Thiết lập kỳ tích hạ tầng mới',
                'link_url' => 'https://tuoitre.vn/chinh-thuc-thong-xe-ham-vuot-song-sai-gon-thiet-lap-ky-tich-moi-465921.htm',
            ],
            [
                'year' => '2015',
                'title' => 'Diện Mạo Đô Thị Hiện Đại & Không Gian Sáng Tạo',
                'tag' => 'Đô thị văn minh',
                'description' => 'Khánh thành Phố đi bộ Nguyễn Huệ và dâng hoa Tượng đài Chủ tịch Hồ Chí Minh.',
                'badge' => 'Bứt phá hạ tầng',
                'image' => 'https://cly.1cdn.vn/2026/06/27/z7966603803738_705ae9ed6695199e424daf8c15911f51.jpg',
                'details' => 'Thành phố chuyển mình mạnh mẽ về không gian công cộng. Phố đi bộ Nguyễn Huệ khánh thành trở thành quảng trường văn hóa hiện đại bậc nhất, biểu tượng kết nối cộng đồng năng động. Đồng thời, khánh thành tượng đài Bác Hồ kính yêu trước tòa nhà UBND thành phố.',
                'link_label' => 'Khánh thành Công viên Tượng đài Chủ tịch Hồ Chí Minh tại TP.HCM',
                'link_url' => 'https://baochinhphu.vn/khanh-thanh-tuong-dai-chu-tich-ho-chi-minh-tai-tphcm-102192534.htm',
            ],
            [
                'year' => '2021',
                'title' => 'Thành Lập Thành Phố Thủ Đức - Cực Tăng Trưởng Mới',
                'tag' => 'Đô thị sáng tạo',
                'description' => 'Thành lập thành phố thuộc thành phố trực thuộc Trung ương đầu tiên của cả nước.',
                'badge' => 'Mô hình tiên phong',
                'image' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhjPcoNayt_3Ma7h2bUyHUFj89_-3Q8tDMTEOnINhdnf-RY9Equ_gI1IWP&s=10',
                'details' => 'Nghị quyết của Ủy ban Thường vụ Quốc hội chính thức có hiệu lực sáp nhập Quận 2, Quận 9 và Quận Thủ Đức để thành lập TP. Thủ Đức - Đô thị sáng tạo tương tác cao phía Đông, tạo động lực mới thúc đẩy mạnh mẽ kinh tế số.',
                'link_label' => 'Chính thức thành lập Thành phố Thủ Đức thuộc TP.HCM',
                'link_url' => 'https://baochinhphu.vn/chinh-thuc-thanh-lap-thanh-pho-thu-duc-thuoc-tphcm-102285164.htm',
            ],
            [
                'year' => '2026',
                'title' => '50 Năm Tự Hào - Kiến Tạo Tương Lai Xanh & Số',
                'tag' => 'Kỷ nguyên số',
                'description' => 'Vững vàng vị thế Đô thị Thông minh, sáng tạo, phát triển bền vững.',
                'badge' => 'Tương lai rực rỡ',
                'image' => 'https://image.plo.vn/Uploaded/2026/awvbpciv/2026_06_26/thanh-pho-2-9134-4266.png',
                'details' => 'Mốc son kỷ niệm tròn 50 năm ngày thành phố chính thức, vinh dự mang tên Bác (02/07/1976 - 02/07/2026). Thành phố bứt phá chuyển đổi số toàn diện, phát triển bền vững và giữ vững danh hiệu Thành phố văn minh, hiện đại, nghĩa tình.',
                'link_label' => 'Trọng thể Lễ kỷ niệm 50 năm ngày Thành phố Sài Gòn - Gia Định mang tên Chủ tịch Hồ Chí Minh',
                'link_url' => 'https://baochinhphu.vn/sang-nay-2-7-ky-niem-trong-the-50-nam-ngay-thanh-pho-sai-gon-gia-dinh-mang-ten-chu-tich-ho-chi-minh-10226070207274128.htm',
            ],
        ];

        foreach ($events as $event) {
            TimelineEvent::create($event);
        }
    }
}
