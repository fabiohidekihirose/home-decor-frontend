import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center md:ml-[40px]">
        <Image
          src={"/images/home_decor_logo.png"}
          alt="logo"
          width={70}
          height={70}
        ></Image>
        <p className="text-[#30628B] font-['Poppins', sans-serif] font-[500] tracking-[.25em]">
          HOMEDECOR
        </p>
      </div>
    </Link>
  );
}
