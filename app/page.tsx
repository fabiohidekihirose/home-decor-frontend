"use client";

import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { carouselItems, cards1, cards2 } from "@/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { DepartmentProps } from "@/types";

export default function Home() {
  const [departments, setDepartments] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    (async () => {
      const departmentsData = await axios.get(`${baseUrl}/departments`);
      const departmentsSorted = departmentsData.data.sort(
        (a: DepartmentProps, b: DepartmentProps) => a.id - b.id
      );
      setDepartments(departmentsSorted);
    })();
  });

  return (
    <main className="flex flex-col items-center justify-between p-24 pt-36 shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="w-full space-y-[50px]">
        <div className="flex w-full space-x-[1.5%]">
          <Carousel
            infiniteLoop={true}
            showArrows={true}
            className="w-full rounded-[10px] overflow-hidden m-[10px]"
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={5000}
          >
            {carouselItems.map((item) => (
              <Link href={item.url} className="hover:cursor-auto">
                <img src={item.src}></img>
              </Link>
            ))}
          </Carousel>

          <div className="w-[49.5%] flex flex-col space-y-[3.2%]">
            {cards1.map((banner, index) => (
              <Link
                href={banner.url}
                className="rounded-[10px] overflow-hidden border-[1px] p-[10px] border-[#ffffff] hover:border-[#9d9e9f] hover:shadow-[0_4px_30px_rgba(157,157,157,0.25)]"
              >
                <Image
                  alt={`card${index}`}
                  src={banner.src}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="w-full h-auto rounded-[10px]"
                ></Image>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full">
          {cards2.map((banner, index) => (
            <Link
              href={banner.url}
              className="rounded-[10px] overflow-hidden border-[1px] p-[10px] border-[#ffffff] hover:border-[#9d9e9f] hover:shadow-[0_4px_30px_rgba(157,157,157,0.25)]"
            >
              <Image
                alt={`card${index}`}
                src={banner.src}
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
            {departments.map((department: DepartmentProps) => (
              <Link
                href={{
                  pathname: `/products`,
                  query: { department: department.department },
                }}
                className="w-[20%] rounded-[10px] overflow-hidden border-[1px] p-[10px] border-[#ffffff] hover:border-[#9d9e9f] hover:shadow-[0_4px_30px_rgba(157,157,157,0.25)]"
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
