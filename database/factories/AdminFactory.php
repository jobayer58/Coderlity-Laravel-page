<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'photo' => "avatar.png",
            'bg_photo' => "bg.png",
            'status' => fake()->randomElement(['Active', 'Disabled']),
            'country' => fake()->country(),
            'phone' => fake()->phoneNumber(),
            'role' => "User",
            'otp_code' => fake()->numerify('######'),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function moderator()
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Moderator',
            'email' => 'moderator@gmail.com',
            'status' => 'Active',
            'country' => "Bangladesh",
            'phone' => '+880,1713548624',
            'role' => 'Moderator',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
        ]);
    }

    /**
     * Create an admin user
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function admin()
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Admin',
            'email' => 'admina@gmail.com',
            'status' => 'Active',
            'country' => "Bangladesh",
            'phone' => '+880,1713548629',
            'role' => 'Admin',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
        ]);
    }

    /**
     * Create an editor user
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function editor()
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Editor',
            'email' => 'editor@gmail.com',
            'status' => 'Active',
            'country' => "Bangladesh",
            'phone' => '+880,1713548627',
            'role' => 'Editor',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
        ]);
    }

    /**
     * Create a regular user
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function user()
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'User',
            'email' => 'user@gmail.com',
            'status' => 'Active',
            'country' => "Bangladesh",
            'phone' => '+880,1713548626',
            'role' => 'User',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
        ]);
    }
}
