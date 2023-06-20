import Link from "next/link";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="px-6 md:px-24 py-10 border-t-2 flex max-md:flex-col-reverse space-between">
      <div className="md:w-[50%] space-y-[30px]">
        <h2 className="font-[500] tracking-[.25em] text-[20px] max-md:mt-[30px]">
          HOMEDECOR
        </h2>
        <p className="text-[14px]">
          HomeDecor is a premier furniture and home decor company dedicated to
          helping customers create stylish and comfortable living spaces. With a
          wide selection of high-quality furniture pieces and accessories,
          HomeDecor offers comprehensive solutions for every room in the home.{" "}
        </p>
        <div className="text-[16px]">Copyright 2023. All Rights Reserved</div>
      </div>
      <div className="md:w-[50%] flex flex-col space-y-[70px] max-md:space-y-[30px]">
        <div className="space-x-[20px] flex max-md:justify-center justify-end">
          <Link href={""} className="hover:text-[#30628b]">
            Home
          </Link>
          <Link
            href={{ pathname: "/products", query: { department: "all" } }}
            className="hover:text-[#30628b]"
          >
            Products
          </Link>
          <Link href={"/about-us"} className="hover:text-[#30628b]">
            About
          </Link>
          <Link href={""} className="hover:text-[#30628b]">
            Contact
          </Link>
        </div>
        <div className="flex space-x-[20px] max-md:justify-center justify-end">
          <a
            target="_blank"
            href="https://www.instagram.com/"
            className="hover:text-[#30628b]"
          >
            <BsInstagram size={30}></BsInstagram>
          </a>
          <a
            target="_blank"
            href="https://www.twitter.com/"
            className="hover:text-[#30628b]"
          >
            <BsTwitter size={30}></BsTwitter>
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/"
            className="hover:text-[#30628b]"
          >
            <BsFacebook size={30}></BsFacebook>
          </a>
        </div>
      </div>
    </div>
  );
}
