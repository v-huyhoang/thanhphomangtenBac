<?php

namespace Database\Seeders;

use App\Models\Leaderboard;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class LeaderboardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $entries = [
            [
                'name' => 'Nguyễn Minh Triết',
                'school' => 'ĐHQG-HCM',
                'score' => 50,
                'time_in_seconds' => 42,
                'created_at' => '2026-07-01 09:15:00',
            ],
            [
                'name' => 'Trần Thảo Vy',
                'school' => 'ĐHQG',
                'score' => 40,
                'time_in_seconds' => 48,
                'created_at' => '2026-07-01 10:30:00',
            ],
            [
                'name' => 'Lê Hoàng Nam',
                'school' => 'Bách Khoa',
                'score' => 40,
                'time_in_seconds' => 52,
                'created_at' => '2026-07-01 11:05:00',
            ],
            [
                'name' => 'Phạm Minh Quân',
                'school' => 'KHTN',
                'score' => 30,
                'time_in_seconds' => 58,
                'created_at' => '2026-07-01 14:20:00',
            ],
            [
                'name' => 'Đỗ Mai Anh',
                'school' => 'Y Dược',
                'score' => 30,
                'time_in_seconds' => 61,
                'created_at' => '2026-07-01 15:45:00',
            ],
        ];

        foreach ($entries as $entry) {
            Leaderboard::create([
                'name' => $entry['name'],
                'school' => $entry['school'],
                'score' => $entry['score'],
                'time_in_seconds' => $entry['time_in_seconds'],
                'created_at' => Carbon::parse($entry['created_at']),
            ]);
        }
    }
}
