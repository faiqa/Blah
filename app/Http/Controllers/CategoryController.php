<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;

class CategoryController extends Controller
{
    //Serves all operations to handle a category/categories


    public function index()
    {
        $categories = Category::withCount('products')->get();
        return $categories->toJson();
    }

    public function store(Request $request){
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $category = Category::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
        ]);

        return response()->json('CategoryController created!');
    }

    public function show($id)
    {
        $category = Category::with('products')->where('id',$id)->first();
        return $category->toJson();
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return $category->toJson();
    }


    public function update(Request $request,$id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $category = Category::find($id);
        $category->name = $validatedData['name'];
        $category->description = $validatedData['description'];
        $category->save();

        return response()->json('Category Updated Successfully');
    }

    public function delete($id){

        $category= Category::find($id);
        $category->products()->delete();
        $category->delete();

        return response()->json('Category Deleted');
    }

}
