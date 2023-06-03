import Logo from "./Logo";
import Link from "next/link";
import { RiAccountCircleLine, RiShoppingCart2Line } from "react-icons/ri";

export default function Navbar() {
  return (
    <div className="fixed flex items-center space-x-[100px] w-full mt-[10px]">
      <Logo></Logo>
      <input
        placeholder="Search for a product..."
        className="w-[50%] h-[40px] rounded-[20px] p-2 bg-[#ccdfee] text-[#]"
      ></input>
      {/* <div>
        <Link href={"/products"}>Products</Link>
      </div> */}
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
  );
}
