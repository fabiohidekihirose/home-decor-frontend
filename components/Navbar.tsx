"use client";

import Logo from "./Logo";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiAccountCircleLine, RiShoppingCart2Line } from "react-icons/ri";
import { DepartmentProps } from "@/types";

export default function Navbar() {
  const [departments, setDepartments] = useState([]);

  const baseUrl = "http://localhost:8000";

  useEffect(() => {
    (async () => {
      const departmentsData = await axios.get(`${baseUrl}/departments`);
      const departmentsSorted = departmentsData.data.sort(
        (a: DepartmentProps, b: DepartmentProps) => a.id - b.id
      );
      setDepartments(departmentsSorted);
    })();
  });

  return (
    <div className="fixed space-y-[10px] w-full py-[10px] z-50 bg-[#ffffff] border-b-[1px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="flex items-center space-x-[2%] w-full border-b-[1px]">
        <Logo />
        <input
          placeholder="Search for a product..."
          className="w-[50%] h-[40px] rounded-[10px] p-4 border-[#30628b] border-[2px]"
        ></input>
        <div className="flex items-center absolute right-[50px]">
          <Link
            href={"/login"}
            className="ml-[20px] flex flex-col items-center hover:text-[#30628b] text-[#000000]"
          >
            <RiAccountCircleLine size={25} />
            <div>Account</div>
          </Link>
          <Link
            href={"/cart"}
            className="ml-[30px] flex flex-col items-center hover:text-[#30628b] text-[#000000]"
          >
            <RiShoppingCart2Line size={25} />
            <div className="">Cart</div>
          </Link>
        </div>
      </div>
      <div className="flex justify-around">
        {departments.map((department: DepartmentProps) => (
          <Link
            key={department.id}
            href={{
              pathname: `/products`,
              query: { department: department.department },
            }}
            className="hover:text-[#30628b] hover:underline"
          >
            {department.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
