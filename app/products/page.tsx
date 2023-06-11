"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slicers/cart/slicers";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductProps, DepartmentProps } from "@/types";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [departments, setDepartmets] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const departmentInUrl = searchParams.get("department");

  const baseUrl = "http://localhost:8000";

  useEffect(() => {
    (async () => {
      const allProducts = await axios.get(`${baseUrl}/products`);
      const allDepartments = await axios.get(`${baseUrl}/departments`);

      setDepartmets(
        allDepartments.data.sort(
          (a: DepartmentProps, b: DepartmentProps) => a.id - b.id
        )
      );
      setAllProducts(allProducts.data);

      if (departmentInUrl) {
        setFilteredProducts(
          allProducts.data.filter(
            (product: ProductProps) =>
              product.department_name === departmentInUrl
          )
        );
        setCurrentDepartment(departmentInUrl);
      } else {
        setFilteredProducts(allProducts.data);
        setCurrentDepartment("all");
      }
    })();
  }, [departmentInUrl]);

  const clickHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    let newProductsList;

    if (currentTarget.value === "all") {
      newProductsList = allProducts;
    } else {
      newProductsList = allProducts.filter(
        (product: ProductProps) =>
          product.department_name === currentTarget.value
      );
    }

    setCurrentDepartment(currentTarget.value);
    setFilteredProducts(newProductsList);
  };

  const addToCartHandler = (product: ProductProps) => {
    dispatch(addToCart({ ...product, inCart: 0 }));
    router.push("/cart");
  };

  return (
    <div className="pt-36 flex shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="w-[30%] p-8 text-[#000000]">
        <p className="font-[700] text-[24px]">Departments</p>
        <div className="flex flex-col items-start space-y-[10px] p-4">
          <button
            value="all"
            onClick={clickHandler}
            className={
              currentDepartment === "all"
                ? "font-[600]"
                : "hover:underline hover:text-[#30628b]"
            }
          >
            All Products
          </button>
          {departments.map((department: DepartmentProps) => (
            <button
              key={`button${department.label}`}
              value={department.department}
              onClick={clickHandler}
              className={
                currentDepartment === department.department
                  ? "font-[600]"
                  : "hover:underline hover:text-[#30628b]"
              }
            >
              {department.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full flex py-6 px-10 flex flex-wrap">
        {filteredProducts.map((product: ProductProps) => (
          <div
            key={product.id}
            className="w-[33.3%] h-auto border-[1px] p-4 rounded-[10px] border-[#ffffff] hover:border-[#9d9e9f] mb-[20px] hover:shadow-[0_4px_30px_rgba(157,157,157,0.25)]"
          >
            <Link href={`products/${product.id}`}>
              <img src={product.image} className="rounded-[10px]"></img>
              <div className="pt-[10px] text-[#000000]">
                <p className="text-[18px]">{product.name}</p>
                <p className="text-[24px]">
                  ¥
                  {product.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            </Link>
            <button
              className="flex items-center space-x-[5px] bg-[#30628B] text-[#ffffff] p-2 rounded-[10px] hover:bg-[#4186BE] mt-[10px]"
              onClick={() => addToCartHandler(product)}
            >
              <BiCartAdd></BiCartAdd>
              <p>Add to cart</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
