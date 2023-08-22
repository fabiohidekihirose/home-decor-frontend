"use client";

import Logo from "./Logo";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { RiAccountCircleLine, RiShoppingCart2Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { DepartmentProps } from "@/types";
import AccountMenu from "./AccountMenu";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slicers/authSlice";

interface NavbarProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar({ setShowMenu }: NavbarProps) {
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
  }, []);

  const mouseOverHandler = () => {
    setShowAccountMenu(true);
  };

  const mouseOutHandler = () => {
    setShowAccountMenu(false);
  };

  const pressEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchWord = (event.target as HTMLInputElement).value;
      (event.target as HTMLInputElement).value = "";
      router.push(`/products?search=${searchWord}`);
    }
  };

  return (
    <div className="fixed items-center flex flex-col space-y-[10px] w-full md:py-[10px] z-50 bg-[#ffffff] md:border-b-[1px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="flex max-md:flex-col max-md:mb-[20px] max-md:justify-center items-center md:space-x-[2%] w-full md:border-b-[1px]">
        <Logo />
        <input
          placeholder="Search for a product..."
          className="max-md:w-[90%] max-xl:w-[40%] w-[50%] h-[40px] rounded-[10px] p-4 border-[#30628b] border-[2px]"
          onKeyUp={pressEnterHandler}
        ></input>
        <RxHamburgerMenu
          className="md:hidden absolute right-[5%] top-[15%]"
          onClick={() => setShowMenu(true)}
          size={35}
        />
        <div className="flex items-center absolute right-[50px] max-md:hidden">
          <Link
            href={"/favorites"}
            className="ml-[20px] flex flex-col items-center hover:text-[#30628b] text-[#000000]"
          >
            <MdOutlineFavoriteBorder size={25} />
            <div>Favorite</div>
          </Link>
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
      <div className="md:flex space-x-[26px] flex-wrap mx-[min(20px)] justify-center hidden">
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
