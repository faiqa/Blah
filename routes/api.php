<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
_________________________________________________________________________________

*******************************CATEGORY ROUTES***********************************
_________________________________________________________________________________

*/


//DISPLAY ALL / SINGLE CATEGORY
Route::get('categories', 'CategoryController@index');
Route::get('category/{id}', 'CategoryController@show');

//ADD CATEGORY
Route::post('categories', 'CategoryController@store');

//DELETE CATEGORY
Route::delete('deleteCategory/{id}', 'CategoryController@delete');

//EDIT CATEGORY
Route::get('categoryEdit/{id}', 'CategoryController@edit');//Will be in app.js
Route::post('categoryUpdate/{id}', 'CategoryController@update');//remains in laravel route


/*
_________________________________________________________________________________

*******************************PRODUCT ROUTES************************************
_________________________________________________________________________________

*/

//ADD PRODUCT
Route::get('createProduct/{id}','ProductController@create');
Route::post('storeProduct', 'ProductController@storeProduct');











/*
_________________________________________________________________________________

********************************LOGIN ROUTES*************************************
_________________________________________________________________________________

*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


