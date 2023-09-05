import { ReviewProps } from "@/types";
import { useState } from "react";

interface ReviewCardProps {
  review: ReviewProps;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [ratingStars, setRatingStars] = useState(
    buildRatingStar(review.rating)
  );

  function buildRatingStar(rating: number) {
    const ratingStarsArray = [];
    let ratingNumber = rating;

    for (let i = 0; i < 5; i++) {
      if (ratingNumber > 1) {
        ratingStarsArray.push("★");
        ratingNumber -= 1;
      } else {
        ratingStarsArray.push("☆");
      }
    }

    return ratingStarsArray.join("");
  }

  return (
    <div className="bg-[#]">
      <p className="text-[20px]">{review.user.first_name}</p>
      <div>{ratingStars}</div>
      <p>{review.comment}</p>
    </div>
  );
}
