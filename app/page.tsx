"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { carouselItems, cards1, cards2, departments } from "@/data";

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
            {carouselItems.map((item) => (
              <div>
                <img src={item.src}></img>
              </div>
            ))}
          </Carousel>

          <div className="w-[51.5%] flex flex-col space-y-[4.5%]">
            {cards1.map((card, index) => (
              <Link href={""}>
                <Image
                  alt={`card${index}`}
                  src={card.src}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto rounded-[10px]"
                ></Image>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex">
          {cards2.map((card, index) => (
            <Link
              href={"/"}
              className="rounded-[10px] overflow-hidden border-[1px] p-[10px] border-[#ffffff] hover:border-[#7f7f7f]"
            >
              <Image
                alt={`card${index}`}
                src={card.src}
                width="0"
                height="0"
                sizes="100vw"
                className="w-full h-auto rounded-[10px] "
              ></Image>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-[20px]">
          <h2 className="text-[30px] text-[#000000] font-[800]">
            Shop by Department
          </h2>
          <div className="w-full flex flex-wrap">
            {departments.map((department, index) => (
              <Link
                href={"/"}
                className="w-[20%] rounded-[10px] overflow-hidden border-[1px] p-[10px] border-[#ffffff] hover:border-[#7f7f7f]"
              >
                <div className="flex flex-col items-center">
                  <img src={department.image} className="rounded-[10px]"></img>
                  <p className="text-center text-[#000000] pt-[10px]">
                    {department.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
