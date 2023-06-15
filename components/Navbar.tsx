"use client";

import Logo from "./Logo";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiAccountCircleLine, RiShoppingCart2Line } from "react-icons/ri";
import { DepartmentProps } from "@/types";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slicers/authSlice";

export default function Navbar() {
  const [departments, setDepartments] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    (async () => {
      const departmentsData = await axios.get(`${baseUrl}/departments`);
      const departmentsSorted = departmentsData.data.sort(
        (a: DepartmentProps, b: DepartmentProps) => a.id - b.id
      );
      setDepartments(departmentsSorted);
    })();
  });

  const mouseOverHandler = () => {
    setShowAccountMenu(true);
  };

  const mouseOutHandler = () => {
    setShowAccountMenu(false);
  };

  const pressEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(
        `/products?search=${(event.target as HTMLInputElement).value}`
      );
    }
  };

  return (
    <div className="fixed items-center flex flex-col space-y-[10px] w-full py-[10px] z-50 bg-[#ffffff] border-b-[1px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="flex items-center space-x-[2%] w-full border-b-[1px]">
        <Logo />
        <input
          placeholder="Search for a product..."
          className="w-[50%] h-[40px] rounded-[10px] p-4 border-[#30628b] border-[2px]"
          onKeyUp={pressEnterHandler}
        ></input>
        <div className="flex items-center absolute right-[50px]">
          <Link
            href={user ? "/account" : "/login"}
            className="ml-[20px] flex flex-col items-center hover:text-[#30628b] text-[#000000]"
            onMouseOver={mouseOverHandler}
            onMouseOut={mouseOutHandler}
          >
            <RiAccountCircleLine size={25} />
            <div>Account</div>
          </Link>
          {showAccountMenu && (
            <AccountMenu
              mouseOverHandler={mouseOverHandler}
              mouseOutHandler={mouseOutHandler}
            />
          )}
          <Link
            href={"/cart"}
            className="ml-[30px] flex flex-col items-center hover:text-[#30628b] text-[#000000]"
          >
            <RiShoppingCart2Line size={25} />
            <div className="">Cart</div>
          </Link>
        </div>
      </div>
      <div className="flex space-x-[30px] flex-wrap mx-[min(20px)] justify-center">
        {departments.map((department: DepartmentProps) => (
          <Link
            key={department.id}
            href={{
              pathname: `/products`,
              query: { department: department.department },
            }}
            className="hover:text-[#30628b] hover:underline text-left"
          >
            {department.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
