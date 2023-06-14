"use client";

import { useEffect, useState } from "react";
import RecentOrders from "./components/RecentOrders";
import PersonalInfo from "./components/PersonalInfo";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/slicers/authSlice";
import { useRouter } from "next/navigation";

export default function Account() {
  const [currOption, setCurrOption] = useState("recent-orders");
  const token = useAppSelector(selectCurrentToken);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  const clickHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setCurrOption(currentTarget.value);
  };

  return (
    <div className="p-24 pt-36 flex space-x-[2%]">
      <div className="w-[34%] p-12 pt-8 rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)] flex flex-col items-start space-y-[20px]">
        <h2 className="text-[40px]">Welcome!</h2>
        <button
          value={"recent-orders"}
          className="hover:underline hover:text-[#30628b] text-[20px]"
          onClick={clickHandler}
        >
          Recent Orders
        </button>
        <button
          value={"personal-info"}
          className="hover:underline hover:text-[#30628b] text-[20px]"
          onClick={clickHandler}
        >
          Personal Info
        </button>
      </div>
      <div className="w-[64%] p-6 rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
        {currOption === "recent-orders" && <RecentOrders />}
        {currOption === "personal-info" && <PersonalInfo />}
      </div>
    </div>
  );
}
