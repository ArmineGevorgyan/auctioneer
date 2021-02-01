<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->longText('image')->nullable();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->double('starting_price',12,2)->unsigned();
            $table->double('current_price',12,2)->unsigned();
            $table->boolean('is_available')->default(true);
            $table->dateTime('closing_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
