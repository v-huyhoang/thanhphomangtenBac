<?php

namespace Database\Seeders;

use App\Models\WallMessage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class WallMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $messages = [
            [
                'name' => 'Trần Tuấn Kiệt',
                'school' => 'Đai học Bách Khoa - ĐHQG-HCM',
                'message' => 'Tự hào là một sinh viên thế hệ 2026, chúc Thành phố mang tên Bác ngày càng phát triển rực rỡ, hiện đại và luôn đi đầu trong đổi mới sáng tạo, chuyển đổi số! Lớp trẻ tụi mình quyết tâm chung tay xây dựng đô thị thông minh.',
                'likes' => 124,
                'color_index' => 0,
                'status' => 'approved',
                'created_minutes_ago' => 5,
            ],
            [
                'name' => 'Nguyễn Hải Yến',
                'school' => 'Đại học Khoa học Xã hội và Nhân văn',
                'message' => 'Thành phố 50 tuổi cũng là nơi mình học cách tự lập và trưởng thành. Từ những buổi chiều ngắm hoàng hôn lộng gió ở Bến Bạch Đằng đến những đêm ôn thi miệt mài cùng bạn bè, yêu thành phố này vô cùng vì sự bao dung và nghĩa tình tuyệt vời! ❤️',
                'likes' => 89,
                'color_index' => 1,
                'status' => 'approved',
                'created_minutes_ago' => 10,
            ],
            [
                'name' => 'Phạm Hoàng Long',
                'school' => 'Đại học Công nghệ Thông tin',
                'message' => 'Chúc TP.HCM thân yêu tuổi 50 luôn trẻ trung, đầy ắp tiếng cười và tiếp tục bứt phá phát triển! Hy vọng những dòng code, những ứng dụng thông minh của tụi mình sẽ góp phần nhỏ bé giúp cuộc sống người dân thành phố ngày càng tiện nghi hơn.',
                'likes' => 56,
                'color_index' => 2,
                'status' => 'approved',
                'created_minutes_ago' => 30,
            ],
            [
                'name' => 'Lê Thảo Nguyên',
                'school' => 'Đại học Kinh tế - Luật',
                'message' => 'Nửa thế kỷ tự hào! Sài Gòn - TP.HCM luôn chứa đựng những cơ hội diệu kỳ cho bất kỳ ai chịu dấn thân và nỗ lực. Thế hệ Gen Z tụi mình cam kết sẽ học tập thật tốt, hội nhập chủ động để khẳng định vị thế tri thức trẻ trên trường quốc tế.',
                'likes' => 72,
                'color_index' => 3,
                'status' => 'approved',
                'created_minutes_ago' => 60,
            ],
            [
                'name' => 'Vũ Minh Đức',
                'school' => 'Đại học Y Dược TP.HCM',
                'message' => 'Chúc thành phố của chúng ta luôn bình yên, khỏe mạnh và nghĩa tình! Sự bao dung, san sẻ trong gian khó (như những ngày đại dịch lịch sử) chính là bản sắc quý giá nhất của con người nơi đây. Tự hào được học tập và cống hiến tại đây!',
                'likes' => 105,
                'color_index' => 4,
                'status' => 'approved',
                'created_minutes_ago' => 120,
            ],
            [
                'name' => 'Đặng Thu Trang',
                'school' => 'Đại học Sư phạm TP.HCM',
                'message' => 'Lớp học sinh, sinh viên hôm nay chính là những người gieo mầm cho 50 năm tiếp theo của thành phố. Chúc các bạn trẻ luôn rực rỡ nhiệt huyết, dám nghĩ, dám làm, giữ mãi trái tim nóng ấm và chiếc đầu lạnh để cống hiến cho quê hương!',
                'likes' => 48,
                'color_index' => 5,
                'status' => 'approved',
                'created_minutes_ago' => 180,
            ],
        ];

        foreach ($messages as $msg) {
            WallMessage::create([
                'name' => $msg['name'],
                'school' => $msg['school'],
                'message' => $msg['message'],
                'likes' => $msg['likes'],
                'color_index' => $msg['color_index'],
                'status' => $msg['status'],
                'created_at' => Carbon::now()->subMinutes($msg['created_minutes_ago']),
            ]);
        }
    }
}
