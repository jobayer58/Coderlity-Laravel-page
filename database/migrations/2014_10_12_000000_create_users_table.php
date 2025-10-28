<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('provider_id')->nullable();
            $table->string('provider_token', 2000)->nullable();
            $table->string('provider_refresh_token', 2000)->nullable();
            $table->string('email')->unique();
            $table->string('user_name')->nullable();
            $table->string('photo')->default('avatar.png');
            $table->string('bg_photo')->default('bg.png');
            $table->string('status')->default('Active');
            $table->string('country')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('role')->default('user');
            $table->char('otp_code', 6)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->json('service_dashboard')->default(json_encode([
                ['service' => 'SEO', 'accessStatus' => 'Disabled', 'type' => 'empty'],
                ['service' => 'ADS', 'accessStatus' => 'Disabled', 'type' => 'empty'],
                ['service' => 'BRANDING', 'accessStatus' => 'Disabled', 'type' => 'empty']
            ]));
            $table->rememberToken();
            $table->timestamps();
        });
 
        User::create(["name" => "Codelity", "email" => "coderlity@gmail.com",  "status" => "Active", "password" => Hash::make(12345678), "email_verified_at" => now()]);
    }
 
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
