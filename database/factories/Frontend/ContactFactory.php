<?php

namespace Database\Factories\Frontend;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Frontend\Contact>
 */
class ContactFactory extends Factory
{
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
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'service_type' => fake()->randomElement(['Web Application', 'Mobile Application', 'UI/UX Design', 'Digital Marketing', 'Domain & Hosting']),
            'message' => fake()->sentence(10),
        ];
    }
}
