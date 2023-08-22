"use client";

import { useRouter } from "next/navigation";
import { TfiClose } from "react-icons/tfi";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/slicers/authSlice";

interface MenuProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
}

export default function Menu({ setShowMenu, showMenu }: MenuProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div
      className={`fixed w-[60%] bg-[#ffffff] flex flex-col z-[50] h-full right-[0] text-[30px] shadow-[-10px_0_10px_rgba(157,157,157,0.25)] ease-in-out duration-1000 ${
        showMenu ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <TfiClose
        onClick={() => setShowMenu(false)}
        size={35}
        className="absolute right-[8.7%] top-[2.7%]"
      />
      <div className="flex flex-col mt-[27%] space-y-[2%]">
        <button
          onClick={() => {
            setShowMenu(false);
            router.push("/");
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            setShowMenu(false);
            router.push("/products?department=all");
          }}
        >
          Products
        </button>
        <button
          onClick={() => {
            setShowMenu(false);
            router.push("/favorites");
          }}
        >
          Favorites
        </button>
        <button
          onClick={() => {
            setShowMenu(false);
            router.push("/cart");
          }}
        >
          Cart
        </button>
        {user ? (
          <div className="flex flex-col space-y-[2%]">
            <button
              onClick={() => {
                setShowMenu(false);
                router.push("/account");
              }}
            >
              My Account
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                dispatch(logOut({}));
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-[2%]">
            <button
              onClick={() => {
                setShowMenu(false);
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                router.push("/sign-up");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
