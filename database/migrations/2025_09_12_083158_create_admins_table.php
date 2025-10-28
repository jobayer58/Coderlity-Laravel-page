<?php

use App\Models\Admin;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('photo')->default('avatar.png');
            $table->string('bg_photo')->default('bg.png');
            $table->string('status');
            $table->string('country')->nullable();
            $table->string('phone')->nullable();
            $table->string('role')->default('user');
            $table->char('otp_code', 6)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        Admin::create(["name" => "Admin", "email" => "admin@gmail.com", "status" => "Active", "country" => "Bangladesh", "phone" => "+880,1735698452", "role" => "Admin", "password" => Hash::make(12345678), "email_verified_at" => Carbon::now()]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
