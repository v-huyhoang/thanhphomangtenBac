<?php

namespace Database\Seeders;

use App\Models\QuizQuestion;
use Illuminate\Database\Seeder;

class QuizQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $questions = [
            [
                'question' => 'Thành phố Sài Gòn - Gia Định chính thức được đổi tên thành Thành phố Hồ Chí Minh vào ngày tháng năm nào?',
                'options' => [
                    'A. 30/04/1975 (Ngày Giải phóng miền Nam)',
                    'B. 02/07/1976 (Kỳ họp thứ nhất Quốc hội khóa VI)',
                    'C. 19/05/1976 (Ngày sinh nhật Bác Hồ)',
                    'D. 02/09/1945 (Ngày Tuyên ngôn Độc lập)',
                ],
                'correct_answer' => 1,
                'explanation' => 'Đúng rồi! Tại kỳ họp thứ nhất Quốc hội khóa VI nước Cộng hòa Xã hội Chủ nghĩa Việt Nam diễn ra vào ngày 02/07/1976, Quốc hội đã chính thức ban hành Quyết định đổi tên thành phố Sài Gòn - Gia Định thành Thành phố Hồ Chí Minh.',
                'category' => 'Lịch sử',
            ],
            [
                'question' => 'Địa điểm lịch sử nổi tiếng nào tại TP.HCM là nơi người thanh niên yêu nước Nguyễn Tất Thành (Bác Hồ) ra đi tìm đường cứu nước vào ngày 05/06/1911?',
                'options' => [
                    'A. Bến Bạch Đằng (Quận 1)',
                    'B. Cột cờ Thủ Ngữ (Khánh Hội)',
                    'C. Cảng Nhà Rồng (Bảo tàng Hồ Chí Minh hiện nay)',
                    'D. Dinh Độc Lập (Hội trường Thống Nhất)',
                ],
                'correct_answer' => 2,
                'explanation' => 'Chính xác! Ngày 05/06/1911, từ Cảng Nhà Rồng (nằm bên sông Sài Gòn), người thanh niên yêu nước Nguyễn Tất Thành đã xuống tàu Amiral Latouche-Tréville ra đi tìm con đường cứu nước, giải phóng dân tộc.',
                'category' => 'Địa danh',
            ],
            [
                'question' => 'Bùng binh nổi tiếng nào ở trung tâm Quận 3 được gọi là điểm hẹn văn hóa, ẩm thực lâu đời gắn bó mật thiết với hàng thế hệ sinh viên Sài thành?',
                'options' => [
                    'A. Hồ Con Rùa (Công trường Quốc tế)',
                    'B. Hồ Bán Nguyệt (Quận 7)',
                    'C. Công trường Lam Sơn (Quận 1)',
                    'D. Vòng xoay Dân Chủ (Quận 3/Quận 10)',
                ],
                'correct_answer' => 0,
                'explanation' => 'Tuyệt vời! Hồ Con Rùa (tên chính thức là Công trường Quốc tế) là địa điểm tụ họp quen thuộc của giới học sinh, sinh viên với không gian râm mát, hồ phun nước dịu mắt và thiên đường ăn vặt nức tiếng.',
                'category' => 'Văn hóa',
            ],
            [
                'question' => 'Tòa nhà biểu tượng cao thứ nhì thành phố (81 tầng) biểu trưng cho ý chí kiên cường và tinh thần đoàn kết vươn cao của Việt Nam có tên là gì?',
                'options' => [
                    'A. Bitexco Financial Tower',
                    'B. Landmark 81 (Vinhomes Central Park)',
                    'C. Saigon One Tower',
                    'D. Vietcombank Tower',
                ],
                'correct_answer' => 1,
                'explanation' => 'Hoàn hảo! Landmark 81 tọa lạc bên bờ sông Sài Gòn, khánh thành năm 2018, được lấy cảm hứng từ bó tre truyền thống Việt Nam, tượng trưng cho sức mạnh, sự thịnh vượng và tinh thần đoàn kết bền bỉ.',
                'category' => 'Địa danh',
            ],
            [
                'question' => 'Phong trào tình nguyện hè rực rỡ và quy mô nhất của sinh viên TP.HCM, bắt đầu từ chiến dịch Ánh sáng văn hóa hè năm 1994, nay có tên gọi chính thức là gì?',
                'options' => [
                    'A. Chiến dịch Tiếp sức mùa thi',
                    'B. Chiến dịch Tình nguyện Hoa phượng đỏ',
                    'C. Chiến dịch Tình nguyện Mùa hè xanh',
                    'D. Chiến dịch Kỳ nghỉ hồng',
                ],
                'correct_answer' => 2,
                'explanation' => 'Chuẩn xác! Chiến dịch tình nguyện Mùa hè xanh chính là chiếc nôi tôi luyện nên hàng vạn thế hệ thanh niên xung kích, sáng tạo, nghĩa tình của TP.HCM, cống hiến tri thức cho các vùng sâu vùng xa.',
                'category' => 'Sự kiện',
            ],
        ];

        foreach ($questions as $q) {
            QuizQuestion::create($q);
        }
    }
}
