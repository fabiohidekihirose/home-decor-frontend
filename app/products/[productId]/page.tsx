"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { BiCartAdd } from "react-icons/bi";
import { ProductProps } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/slicers/cartSlice";

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
  });
  const [similarProducts, setSimilarProducts] = useState([]);
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
      setSimilarProducts(similarProductsData.data[0].products);
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

  return (
    <div className="pt-36 p-24 flex flex-col space-y-[4%] rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="flex space-x-[3%]">
        <div className="w-[50%]">
          <img src={productInfo?.image} className="rounded-[10px]"></img>
        </div>
        <div className="text-[#000000] w-[47%] space-y-[20px]">
          <p className="text-[40px] font-[700]">{productInfo?.name}</p>
          <p className="text-[40px]">
            ¥
            {productInfo?.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
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
            <p>{productInfo?.description}</p>
          </div>
        </div>
      </div>
      <div className="space-y-[10px]">
        <h2 className="text-[24px] font-[600] text-[#000000]">
          Compare Similar Items
        </h2>
        <div className="flex text-[#000000]">
          {similarProducts.map((product: ProductProps) => (
            <Link
              key={product.id}
              href={`products/${product.id}`}
              className="w-[25%] p-2 border-[1px] rounded-[10px] border-[#ffffff] hover:border-[#7f7f7f] mb-[20px]"
            >
              <img src={product.image} className="rounded-[10px]"></img>
              <div className="pt-[10px]">
                <p className="text-[20px]">{product.name}</p>
                <p className="text-[24px]">
                  ¥
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
              <button
                className="flex items-center space-x-[10px] bg-[#30628B] text-[#ffffff] p-2 rounded-[10px] hover:bg-[#4186BE]"
                onClick={() => addToCartHandler(product)}
              >
                <BiCartAdd></BiCartAdd>
                <p>Add to cart</p>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
