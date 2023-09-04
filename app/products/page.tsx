"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductProps, DepartmentProps } from "@/types";
import ProductCard from "./components/ProductCard";

export default function ProductsPage() {
  const [departments, setDepartmets] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState("");
  const [currentDepartmentText, setCurrentDepartmentText] = useState("");

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
      } else if (departmentInUrl === "special-offers") {
        const offerProducts = await axios.get(`${baseUrl}/products/sales`);

        setFilteredProducts(offerProducts.data);
        setCurrentDepartment("special-offers");
        setCurrentDepartmentText("Special Offers");
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
        setCurrentDepartmentText(`Department: ${departmentName.label}`);
      } else if (searchInUrl) {
        const productsList = await axios.get(
          `${baseUrl}/products/search/${searchInUrl}`
        );

        if (productsList.data.length) {
          setFilteredProducts(productsList.data);

          setCurrentDepartmentText(`Search: ${searchInUrl}`);
        } else {
          setFilteredProducts([]);
          setCurrentDepartmentText("All Products");
        }
      }
    })();
  }, [departmentInUrl, searchInUrl]);

  const clickHandler = async ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/products?department=${currentTarget.value}`);
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
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
