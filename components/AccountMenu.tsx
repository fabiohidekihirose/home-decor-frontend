"use client";

import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/slicers/authSlice";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/slicers/authSlice";

interface AccountMenuProps {
  mouseOutHandler: React.MouseEventHandler<HTMLDivElement>;
  mouseOverHandler: React.MouseEventHandler<HTMLDivElement>;
}

export default function AccountMenu({
  mouseOutHandler,
  mouseOverHandler,
}: AccountMenuProps) {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(logOut({}));
  };

  return (
    <div
      className="absolute right-[15px] top-[50px] p-6 w-[150px] rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)] bg-[#ffffff]"
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      {user ? (
        <div className="flex flex-col space-y-[20px] items-start">
          <Link href={"/account"} className="hover:text-[#30628b]">
            My Account
          </Link>
          <button onClick={clickHandler} className="hover:text-[#30628b]">
            Log Out
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-[20px]">
          <Link href={"/login"} className="hover:text-[#30628b]">
            Login
          </Link>
          <Link href={"/sign-up"} className="hover:text-[#30628b]">
            {" "}
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
