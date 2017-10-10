<?php

Route::get('todos', function () {
    return App\Todo::all();
});

Route::post('todos', function (Illuminate\Http\Request $request) {
    return App\Todo::create(array_merge(
        ['done' => false],
        $request->only(['text', 'done'])
    ));
});

Route::put('todos/{todo}', function (App\Todo $todo, Illuminate\Http\Request $request) {
    $todo->update($request->only(['text', 'done']));

    return $todo;
});

Route::delete('todos/{todo}', function (App\Todo $todo) {
    $todo->delete();

    return $todo;
});

Route::get('authors', function () {
    return App\Author::all();
});

Route::post('authors', function (Illuminate\Http\Request $request) {
    return App\Author::create($request->only('name'));
});

Route::delete('authors/{author}', function (App\Author $author) {
    $author->delete();

    return $author;
});

Route::get('books', function () {
    return App\Book::all();
});

Route::post('books', function (Illuminate\Http\Request $request) {
    return App\Book::create($request->only(['isbn', 'name', 'description']));
});
