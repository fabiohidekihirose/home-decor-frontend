import Link from "next/link";
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="px-24 py-10 border-t-2 flex space-between">
      <div className="w-[50%] space-y-[30px]">
        <h2 className="font-[500] tracking-[.25em] text-[20px]">HOMEDECOR</h2>
        <p className="text-[14px]">
          HomeDecor is a premier furniture and home decor company dedicated to
          helping customers create stylish and comfortable living spaces. With a
          wide selection of high-quality furniture pieces and accessories,
          HomeDecor offers comprehensive solutions for every room in the home.{" "}
        </p>
        <div className="text-[16px]">Copyright 2023. All Rights Reserved</div>
      </div>
      <div className="w-[50%] flex flex-col space-y-[70px]">
        <div className="space-x-[20px] flex justify-end">
          <Link href={""}>Home</Link>
          <Link href={""}>Products</Link>
          <Link href={""}>About</Link>
          <Link href={""}>Contact</Link>
        </div>
        <div className="flex space-x-[20px] justify-end">
          <a target="_blank" href="https://www.instagram.com/">
            <BsInstagram size={30}></BsInstagram>
          </a>
          <a target="_blank" href="https://www.twitter.com/">
            <BsTwitter size={30}></BsTwitter>
          </a>
          <a target="_blank" href="https://www.facebook.com/">
            <BsFacebook size={30}></BsFacebook>
          </a>
        </div>
      </div>
    </div>
  );
}