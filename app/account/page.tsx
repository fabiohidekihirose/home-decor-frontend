"use client";

import { useEffect, useState } from "react";
import RecentOrders from "./components/RecentOrders";
import PersonalInfo from "./components/PersonalInfo";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slicers/authSlice";
import { useRouter } from "next/navigation";

export default function Account() {
  const [currOption, setCurrOption] = useState("recent-orders");
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  const clickHandler = ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement>) => {
    setCurrOption(currentTarget.value);
  };

  return (
    <div className="max-md:flex-col p-6 md:p-16 max-md:pt-36 md:pt-44 xl:pt-36 flex md:space-x-[2%] max-md:space-y-[2%] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="md:w-[34%] p-12 pt-8 rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)] flex flex-col items-start space-y-[20px]">
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
      <div className="md:w-[64%] p-6 rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
        {currOption === "recent-orders" && <RecentOrders />}
        {currOption === "personal-info" && <PersonalInfo />}
      </div>
    </div>
  );
}
