"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Carousel, { CarouselItem } from "@/components/Carousel";

const carouselItems = [{}];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Carousel infiniteLoop={true} showArrows={true} className="w-[30%]">
        <div className="w-full h-full object-fill">
          <img src="/images/products/sofa1.jpg"></img>
        </div>
        <div>
          <img src="/images/products/sofa2.jpg"></img>
        </div>
        <div>
          <img src="/images/products/sofa3.jpg"></img>
        </div>
      </Carousel>
      {/* <div className="w-[49%]">
        <Carousel>
          <CarouselItem>
            <Image
              alt="sofa1"
              src={"/images/products/sofa1.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            ></Image>
          </CarouselItem>
          <CarouselItem>
            <Image
              alt="sofa2"
              src={"/images/products/sofa2.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            ></Image>
          </CarouselItem>
          <CarouselItem>
            <Image
              alt="sofa3"
              src={"/images/products/sofa3.jpg"}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            ></Image>
          </CarouselItem>
        </Carousel> */}
      {/* </div> */}
      <div className="w-[49%]">
        <Image
          alt="sofa4"
          src={"/images/products/sofa4.jpg"}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        ></Image>
        <div></div>
      </div>
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
    </main>
  );
}
