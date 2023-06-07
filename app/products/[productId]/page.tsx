"use client";

import { products } from "@/data";
import { useState } from "react";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";

export default function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const [quantity, setQuantity] = useState(1);
  const similarProducts = [products[0], products[0], products[0], products[0]];

  const plusHandler = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const minusHandler = () => {
    if (quantity > 1) setQuantity((quantity) => quantity - 1);
  };

  return (
    <div className="pt-28 p-24 flex flex-col space-y-[4%]">
      <div className="flex space-x-[3%]">
        <div className="w-[50%]">
          <img
            src="/images/departments/bedroom.jpg"
            className="rounded-[10px]"
          ></img>
        </div>
        <div className="text-[#000000] w-[47%] space-y-[20px]">
          <p className="text-[40px] font-[700]">{products[0].name}</p>
          <p className="text-[40px]">
            ¥
            {products[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
          <p>FREE shipping</p>
          <div className="flex">
            <div>
              <button
                className="border-[1px] border-[#000000] p-4 rounded-l-[10px]"
                onClick={minusHandler}
              >
                -
              </button>
              <input
                className="text-center py-4 border-[1px] border-[#000000] w-[40%]"
                defaultValue={quantity}
              ></input>
              <button
                className="border-[1px] border-[#000000] p-4 rounded-r-[10px]"
                onClick={plusHandler}
              >
                +
              </button>
            </div>
            <button className="bg-[#30628b] text-[#ffffff] p-4 rounded-[10px] w-[50%] hover:bg-[#4186BE]">
              Add to cart
            </button>
          </div>
          <div className="space-y-[2%]">
            <p className="text-[20px]">Description</p>
            <p>
              The sofa is a beautifully designed and comfortable piece of
              furniture that serves as a centerpiece in any living space. It
              features a modern and sleek design, blending seamlessly with
              various interior styles, from contemporary to traditional. Crafted
              with meticulous attention to detail, the sofa boasts a sturdy
              wooden frame, ensuring durability and stability for years to come.
              Its high-quality upholstery is made from a plush and soft fabric,
              providing a luxurious feel and inviting comfort. The sofa offers
              generous seating space, allowing multiple individuals to relax and
              unwind together. The cushions are generously padded, striking the
              perfect balance between support and coziness. The backrest
              provides excellent lumbar support, promoting a comfortable sitting
              posture and minimizing fatigue. With its thoughtful design, the
              sofa offers versatility and functionality. It may include
              additional features like adjustable headrests, reclining
              mechanisms, or built-in storage compartments, enhancing the
              overall convenience and user experience. The color palette of the
              sofa is carefully selected, ranging from neutral tones to vibrant
              hues, enabling it to complement various color schemes and personal
              preferences. Its clean lines and elegant silhouette create an
              inviting and sophisticated atmosphere in any room. Whether it's
              for hosting guests, lounging while watching a movie, or simply
              enjoying a quiet evening, this sofa provides a cozy haven for
              relaxation and socializing. It's a perfect blend of style,
              comfort, and functionality, making it an essential and captivating
              addition to any living space.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-[10px]">
        <h2 className="text-[24px] font-[600] text-[#000000]">
          Compare Similar Items
        </h2>
        <div className="flex text-[#000000]">
          {similarProducts.map((product) => (
            <Link
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
              <button className="flex items-center space-x-[10px] bg-[#30628B] text-[#ffffff] p-2 rounded-[10px] hover:bg-[#4186BE]">
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
