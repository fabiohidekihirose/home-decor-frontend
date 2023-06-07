"use client";

import { useState } from "react";
import { products, departments } from "@/data";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const clickHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    let newProductsList;

    if (currentTarget.value === "all") {
      newProductsList = products;
    } else {
      newProductsList = products.filter(
        (product) => product.department === currentTarget.value
      );
    }

    setFilteredProducts(newProductsList);
  };

  return (
    <div className="pt-24 flex">
      <div className="w-[30%] p-6 space-y-[20px]">
        <p className="text-[500] text-[24px]">Departments</p>
        <div className="flex flex-col items-start space-y-[10px]">
          <button value="all" onClick={clickHandler}>
            All Products
          </button>
          {departments.map((department) => (
            <button
              key={`button${department.label}`}
              value={department.department}
              onClick={clickHandler}
            >
              {department.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex py-6 px-10 flex flex-wrap">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="w-[33.3%] p-2 border-[1px] rounded-[10px] border-[#ffffff] hover:border-[#7f7f7f] mb-[20px]"
          >
            <Link href={`products/${product.id}`}>
              <img src={product.image} className="rounded-[10px]"></img>
              <div className="pt-[10px] text-[#000000]">
                <p className="text-[20px]">{product.name}</p>
                <p className="text-[24px]">
                  ¥
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            </Link>
            <button className="flex items-center space-x-[10px] bg-[#30628B] text-[#ffffff] p-2 rounded-[10px] hover:bg-[#4186BE]">
              <BiCartAdd></BiCartAdd>
              <p>Add to cart</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
