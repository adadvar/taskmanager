<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('todo_views', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string ('user_ip', 100);
            $table->unsignedBigInteger('todo_id');
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')  
                ->on('users')
                ->onDelete('set null')
                ->onUpdate('cascade');

            $table->foreign('todo_id')
                ->references('id')
                ->on('todos')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todo_views');
    }
};
