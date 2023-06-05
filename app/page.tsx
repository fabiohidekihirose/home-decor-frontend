"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const carouselItems = [{}];

const cards = [
  {
    src: "/images/products/sofa4.jpg",
  },
  {
    src: "/images/products/sofa4.jpg",
  },
  {
    src: "/images/products/sofa4.jpg",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24 pt-28">
      <div className="w-full space-y-[50px]">
        <div className="flex space-x-[1.8%]">
          <Carousel
            infiniteLoop={true}
            showArrows={true}
            className="w-[100%] rounded-[10px] overflow-hidden"
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={5000}
          >
            <div>
              <img src="/images/carousel-item-1.png"></img>
            </div>
            <div>
              <img src="/images/carousel-item-2.png"></img>
            </div>
            <div>
              <img src="/images/carousel-item-1.png"></img>
            </div>
          </Carousel>

          <div className="w-[51.5%] flex flex-col space-y-[4.5%]">
            <Image
              alt="sofa4"
              src={"/images/products/sofa4.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-[10px]"
            ></Image>
            <Image
              alt="sofa4"
              src={"/images/products/sofa4.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-[10px]"
            ></Image>
          </div>
        </div>
        <div className="flex w-full flex">
          <Link
            href={"/home"}
            className="rounded-[10px] overflow-hidden border-[2px] p-[10px] border-[#ffffff] hover:border-[#7f7f7f]"
          >
            <Image
              alt="sofa4"
              src={"/images/products/sofa4.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-[10px] "
            ></Image>
          </Link>
          <Link href={"/home"}>
            <Image
              alt="sofa4"
              src={"/images/products/sofa4.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-[10px] border-[2px] p-[10px] border-[#ffffff]"
            ></Image>
          </Link>
          <Link href={"/home"}>
            <Image
              alt="sofa4"
              src={"/images/products/sofa4.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-[10px] border-[2px] p-[10px] border-[#ffffff]"
            ></Image>
          </Link>
        </div>
      </div>
    </main>
  );
}
