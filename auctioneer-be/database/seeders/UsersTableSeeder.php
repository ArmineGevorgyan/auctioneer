<?php

namespace Database\Seeders;

use DB;
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
        DB::table('users')->insert([
            'username' => 'user1',
            'email' => 'user1@gmail.com',
            'password' => Hash::make('user2'),
            'api_token' => Str::random(60),
        ]);

        DB::table('users')->insert([
            'username' => 'user3',
            'email' => 'user3@gmail.com',
            'password' => Hash::make('user4'),
            'api_token' => Str::random(60),
        ]);

        DB::table('users')->insert([
            'username' => 'admin1',
            'email' => 'admin1@gmail.com',
            'password' => Hash::make('admin1'),
            'api_token' => Str::random(60),
        ]);
    }
}
