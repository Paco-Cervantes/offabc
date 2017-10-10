<?php

Route::group(['domain' => config('app.domain')], function () {
    Route::get('/', function () {
        return view('welcome');
    });
    Auth::routes();
});

Route::group(['domain' => 'dashboard.' . config('app.domain')], function () {
    Route::get('/{vue_capture?}', ['as' => 'dashboard', 'uses' => 'DashboardController@index'])->where('vue_capture', '[\/\w\.-]*');
});
