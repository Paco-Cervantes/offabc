<?php

use App\Author;
use Illuminate\Database\Seeder;

class AuthorsTableSeeder extends Seeder
{
    public function run()
    {
        Author::truncate();
        Author::create(["name" => 'Stephen King']);
        Author::create(["name" => 'J. K. Rowling']);
        Author::create(["name" => 'Charles Dickens']);
        Author::create(["name" => 'William Shakespeare']);
        Author::create(["name" => 'Jane Austen']);
        Author::create(["name" => 'Leo Tolstoy']);
        Author::create(["name" => 'J. R. R. Tolkien']);
        Author::create(["name" => 'George Orwell']);
        Author::create(["name" => 'F. Scott Fitzgerald']);
        Author::create(["name" => 'Neil Gaiman']);
        Author::create(["name" => 'James Patterson']);
    }
}
