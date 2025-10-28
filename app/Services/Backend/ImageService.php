<?php

namespace App\Services\Backend;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;


class ImageService
{
    public static function singleUpload($file, $directory, $namePrefix = "coderlity")
    {
        // new image upload
        $photoName = $namePrefix . '-' . Str::uuid();
        $ext = $file->getClientOriginalExtension();
        $fileName = $photoName . '.' . $ext;
        $file->storeAs($directory, $fileName, 'public');

        return $fileName;
    }

    public static function singleDelete($directory, $photoName)
    {
        File::delete(public_path("uploads/" . $directory . $photoName));
        return true;
    }
}
