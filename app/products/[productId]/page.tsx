"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ProductProps, ReviewProps } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/slicers/cartSlice";
import DiscountPrice from "@/components/DiscountPrice";
import Image from "next/image";
import { buildAverageRatingStars } from "../components/ProductCard";
import ProductCard from "../components/ProductCard";
import ReviewCard from "../components/ReviewCard";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const [productInfo, setProductInfo] = useState<ProductProps>({
    id: 0,
    name: "",
    department_name: "",
    image: "",
    price: 0,
    quantity: 0,
    description: "",
    inCart: 0,
    discount: 0,
    review: [],
  });
  const [ratingStars, setRatingStars] = useState<null | string>(null);
  const [reviewsCounter, setReviewsCounter] = useState<null | number>(null);
  const [reviews, setReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showLess, setShowLess] = useState(true);
  const [showButtonText, setShowButtonText] = useState("Show More");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    (async () => {
      const productData = await axios.get(
        `${baseUrl}/products/${params.productId}`
      );

      const similarProductsData = await axios.get(
        `${baseUrl}/products/departments/${productData.data.department_name}`
      );

      setProductInfo(productData.data);
      setSimilarProducts(
        similarProductsData.data[0].products.filter(
          (product: ProductProps) => productData.data.id !== product.id
        )
      );
      setReviews(productData.data.review);
      setRatingStars(buildAverageRatingStars(productData.data.review));
      setReviewsCounter(productData.data.review.length);
    })();
  }, []);

  const plusHandler = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const minusHandler = () => {
    if (quantity > 1) setQuantity((quantity) => quantity - 1);
  };

  const addToCartHandler = (product: ProductProps, add: number = 1) => {
    dispatch(addToCart({ ...product, inCart: add }));
    router.push("/cart");
  };

  const showMoreOrLessHandler = () => {
    if (showLess) {
      setShowLess(false);
      setShowButtonText("Show Less");
    } else {
      setShowLess(true);
      setShowButtonText("Show More");
    }
  };

  return (
    <div className="p-6 xl:p-24 max-md:pt-36 md:pt-44 xl:pt-36 flex flex-col space-y-[4%] rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="flex max-md:flex-col md:space-x-[3%]">
        <div className="md:w-[50%]">
          <Image
            alt={productInfo?.name}
            src={productInfo?.image}
            width="0"
            height="0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 15vw"
            className="rounded-[10px] w-full h-auto"
          ></Image>
        </div>
        <div className="text-[#000000] md:w-[47%] space-y-[20px]">
          <p className="text-[40px] font-[700]">{productInfo?.name}</p>
          {productInfo.discount > 0 ? (
            <DiscountPrice
              price={productInfo.price}
              discount={productInfo.discount}
              textSize={40}
            />
          ) : (
            <p className="text-[40px]">
              ¥
              {productInfo?.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          )}
          <div className="flex space-x-[5px]">
            <div>{ratingStars}</div>
            <div>{`(${reviewsCounter})`}</div>
          </div>
          <p>FREE shipping</p>
          <div className="flex space-x-[20px] items-center">
            <div className="flex w-[20%]">
              <button
                className="border-[1px] border-[#000000] p-2 rounded-l-[10px] hover:bg-[#30628b] hover:text-[#ffffff]"
                onClick={minusHandler}
              >
                -
              </button>
              <div className="text-center p-2 border-[1px] border-[#000000] w-[40%]">
                {quantity}
              </div>
              <button
                className="border-[1px] border-[#000000] p-2 rounded-r-[10px] hover:bg-[#30628b] hover:text-[#ffffff]"
                onClick={plusHandler}
              >
                +
              </button>
            </div>
            <button
              className="bg-[#30628b] text-[#ffffff] p-4 rounded-[10px] w-[50%] hover:bg-[#4186BE]"
              onClick={() => addToCartHandler(productInfo, quantity)}
            >
              Add to cart
            </button>
          </div>
          <div className="space-y-[2%]">
            <p className="text-[20px]">Description</p>
            <p
              className={`whitespace-pre-wrap ${
                showLess ? "line-clamp-[4]" : ""
              }`}
            >
              {productInfo?.description}
            </p>
            <button className="underline" onClick={showMoreOrLessHandler}>
              {showButtonText}
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-[10px]">
        <h2 className="text-[24px] font-[600] text-[#000000]">
          Rating & Reviews
        </h2>
        {reviews.length ? (
          reviews.map((review: ReviewProps) => (
            <ReviewCard review={review} key={review.id} />
          ))
        ) : (
          <div>No reviews yet</div>
        )}
      </div>
      <div className="space-y-[10px]">
        <h2 className="text-[24px] font-[600] text-[#000000]">
          Compare Similar Items
        </h2>
        <div className="flex text-[#000000]">
          {similarProducts.map((product: ProductProps) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
