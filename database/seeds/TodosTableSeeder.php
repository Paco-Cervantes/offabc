<?php

use App\Todo;
use Illuminate\Database\Seeder;

class TodosTableSeeder extends Seeder
{
    public function run()
    {
        Todo::truncate();
        Todo::create(["text" => 'Vue Routing', "done" => true]);
        Todo::create(["text" => 'Service Worker', "done" => true]);
        Todo::create(["text" => 'Cache App', "done" => true]);
        Todo::create(["text" => 'Use broweser DB', "done" => true]);
        Todo::create(["text" => 'Implement layer of DB/API seemlessly']);
        Todo::create(["text" => 'Implement sync system']);
    }
}
