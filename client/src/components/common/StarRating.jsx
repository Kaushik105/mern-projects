import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

function StarRating({ rating, handleRatingValue }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Button key={star} variant={"outline"} size={"icon"} className={"bg-transparent border-none shadow-none rounded-full"} onClick={() => { handleRatingValue(star) }}>
          <StarIcon
            className={`w-8 h-8 border-0 ${
              star <= rating ? "fill-yellow-400" : ""
            }`}
          ></StarIcon>
        </Button>
      ))}
    </div>
  );
}

export default StarRating;
