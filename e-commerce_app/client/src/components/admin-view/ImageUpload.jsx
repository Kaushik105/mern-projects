import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
  isCustom= false
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleImageRemove(e) {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:3000/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.data.url);
        setImageLoadingState(false);
      }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`${isCustom ? "" : "max-w-md"} mb-5 w-full `}>
      <label
        className="text-lg font-semibold mb-2 
    block"
      >
        Upload Image{" "}
      </label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-300" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon />
            </div>
            <p>{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleImageRemove}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
