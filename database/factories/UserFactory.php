<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $services = [
            ['service' => 'SEO', 'accessStatus' => fake()->randomElement(['Enabled', 'Disabled']), 'type' => fake()->randomElement(['premium', 'basic', 'empty'])],
            ['service' => 'ADS', 'accessStatus' => fake()->randomElement(['Enabled', 'Disabled']), 'type' => fake()->randomElement(['premium', 'basic', 'empty'])],
            ['service' => 'BRANDING', 'accessStatus' => fake()->randomElement(['Enabled', 'Disabled']), 'type' => fake()->randomElement(['premium', 'basic', 'empty'])]
        ];
  
        return [
            'name' => fake()->name(),
            'user_name' => fake()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'photo' => "avatar.png",
            'bg_photo' => "bg.png",
            'status' => fake()->randomElement(['Active', 'Disabled']),
            'country' => fake()->country(),
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'role' => "user",
            'otp_code' => fake()->numerify('######'),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'service_dashboard' => json_encode($services),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
