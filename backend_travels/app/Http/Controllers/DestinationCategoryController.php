<?php

namespace App\Http\Controllers;

use App\Models\DestinationCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DestinationCategoryController extends Controller
{
    public function index()
    {
        $categories = DestinationCategory::all();
        return response()->json([
            'status' => true,
            'message' => 'Destination categories retrieved successfully',
            'data' => $categories
        ], 200);
    }

    public function show($id)
    {
        $category = DestinationCategory::findOrFail($id);
        return response()->json([
            'status' => true,
            'message' => 'Destination category found successfully',
            'data' => $category
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'icon_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $category = DestinationCategory::create($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Destination category created successfully',
            'data' => $category
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'icon_name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $category = DestinationCategory::findOrFail($id);
        $category->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Destination category updated successfully',
            'data' => $category
        ], 200);
    }

    public function destroy($id)
    {
        $category = DestinationCategory::findOrFail($id);
        $category->delete();

        return response()->json([
            'status' => true,
            'message' => 'Destination category deleted successfully'
        ], 204);
    }
}