<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    //

    public function storeProduct(Request $request){
        $validatedData = $request->validate([
            'parentID' => 'required',
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
        ]);

        $product = Product::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'category_id' => $validatedData['parentID'],
        ]);

        return response()->json('ProductController created!');
    }


    public function create($id)
    {
        return response()->json(['id' => $id]);
    }
}
