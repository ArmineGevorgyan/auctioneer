<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'username' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('user1'),
            'api_token' => Str::random(60),
            'max_bid_amount' => 200,
            'max_bid_left' => 200,
        ]);
        $user->assignRole('visitor');

        $user = User::create([
            'username' => 'user2',
            'email' => 'user2@gmail.com',
            'password' => Hash::make('user2'),
            'api_token' => Str::random(60),
            'max_bid_amount' => 100,
            'max_bid_left' => 100,
        ]);
        $user->assignRole('visitor');

        $user = User::create([
            'username' => 'admin1',
            'email' => 'admin1@gmail.com',
            'password' => Hash::make('admin1'),
            'api_token' => Str::random(60),
        ]);
        $user->assignRole('admin');
    }
}
