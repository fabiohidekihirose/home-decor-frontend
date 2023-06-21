"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { BiCartAdd } from "react-icons/bi";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/slicers/cartSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductProps, DepartmentProps } from "@/types";

export default function ProductsPage() {
  const [departments, setDepartmets] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState("");
  const [currentDepartmentText, setCurrentDepartmentText] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const departmentInUrl = searchParams.get("department");
  const searchInUrl = searchParams.get("search");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    (async () => {
      const allDepartments = await axios.get(`${baseUrl}/departments`);

      setDepartmets(
        allDepartments.data.sort(
          (a: DepartmentProps, b: DepartmentProps) => a.id - b.id
        )
      );

      if (departmentInUrl === "all") {
        const allProductsList = await axios.get(`${baseUrl}/products`);

        setFilteredProducts(allProductsList.data);
        setCurrentDepartment("all");
        setCurrentDepartmentText("All Products");
      } else if (departmentInUrl) {
        const productsList = await axios.get(
          `${baseUrl}/products/departments/${departmentInUrl}`
        );

        const departmentName = allDepartments.data.find(
          (department: DepartmentProps) =>
            department.department === departmentInUrl
        );

        setFilteredProducts(productsList.data[0].products);
        setCurrentDepartment(departmentInUrl);
        setCurrentDepartmentText(departmentName.label);
      } else if (searchInUrl) {
        const productsList = await axios.get(
          `${baseUrl}/products/search/${searchInUrl}`
        );

        if (productsList.data.length) {
          setFilteredProducts(productsList.data);

          const departmentName = allDepartments.data.find(
            (department: DepartmentProps) =>
              department.department === searchInUrl
          );
          setCurrentDepartmentText(departmentName.label);
        } else {
          setFilteredProducts([]);
          setCurrentDepartmentText("All Products");
        }
      }
    })();
  }, [departmentInUrl]);

  const clickHandler = async ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/products?department=${currentTarget.value}`);
  };

  const addToCartHandler = (product: ProductProps) => {
    dispatch(addToCart({ ...product, inCart: 1 }));
    router.push("/cart");
  };

  return (
    <div className="pt-36 flex shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="md:w-[385px] md:p-8 text-[#000000] max-md:hidden">
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
      <div className="w-full flex flex-col md:py-6 px-10 max-md:px-6">
        <p className="text-[20px] font-[700] mb-[20px]">
          {currentDepartmentText}
        </p>
        <div className="w-full flex max-md:flex-col md:flex-wrap">
          {filteredProducts.map((product: ProductProps) => (
            <div
              key={product.id}
              className="md:w-[33.3%] h-auto border-[1px] p-4 rounded-[10px] border-[#ffffff] hover:border-[#9d9e9f] mb-[20px] hover:shadow-[0_4px_30px_rgba(157,157,157,0.25)]"
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
    </div>
  );
}
