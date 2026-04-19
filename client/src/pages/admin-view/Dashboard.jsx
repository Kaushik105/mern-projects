import ProductImageUpload from "@/components/admin-view/ImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/commonSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);


  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
  

  return (
    <div className="w-full flex flex-col gap-2">
      <ProductImageUpload
        imageLoadingState={imageLoadingState}
        imageFile={imageFile}
        setImageFile={setImageFile}
        setImageLoadingState={setImageLoadingState}
        setUploadedImageUrl={setUploadedImageUrl}
        isEditMode={false}
        isCustom={true}
      />
      <Button
        onClick={() => {
          handleUploadFeatureImage();
        }}
      >
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div key={featureImgItem._id} className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
