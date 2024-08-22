@extends('admin.layouts.app')

@section('content')
    <h1>Edit Category</h1>

    <form action="{{ route('admin.categories.update', $category->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" class="form-control" value="{{ $category->title }}" required>
        </div>
        <div class="form-group">
            <label for="icon_name">Icon Name</label>
            <input type="text" name="icon_name" class="form-control" value="{{ $category->icon_name }}" required>
        </div>
        <button type="submit" class="btn btn-success">Update</button>
    </form>
@endsection
