"use client";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    mobile: 0,
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(`${baseUrl}/users/sign-up`, formData);
      setError("");

      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex mx-auto space-x-[10%] h-[100vh]">
      <div className="w-[40%] bg-[#30628b] flex flex-col space-y-[190px] text-[#ffffff] px-[60px]">
        <Link href={"/"} className="flex w-[50%]">
          <img src="/images/home_decor_logo_login.png"></img>
        </Link>
        <div className="text-[35px]">Create your HomeDecor account</div>
        <div className="text-[10px] grow">
          Copyright 2023. All Rights Reserved
        </div>
      </div>
      <form
        className="flex flex-col justify-center w-[30%]"
        onSubmit={submitHandler}
      >
        <h1 className="m-auto text-[30px] my-[20px]">Sign Up</h1>
        <label className="mt-[15px]">Email</label>
        <InputField
          type="email"
          name="email"
          changeHandler={changeHandler}
          required={true}
        />
        <label className="mt-[15px]">First Name</label>
        <InputField
          type="text"
          name="first_name"
          changeHandler={changeHandler}
          required={true}
        />
        <label className="mt-[15px]">Last Name</label>
        <InputField
          type="text"
          name="last_name"
          changeHandler={changeHandler}
          required={true}
        />
        <label className="mt-[15px]">Mobile</label>
        <InputField
          type="number"
          name="mobile"
          changeHandler={changeHandler}
          required={true}
        />
        <label className="mt-[15px]">Address</label>
        <InputField
          type="text"
          name="address"
          changeHandler={changeHandler}
          required={true}
        />
        <label className="mt-[15px]">Password</label>
        <InputField
          type="password"
          name="password"
          changeHandler={changeHandler}
          required={true}
        />
        {error && <p>{error}</p>}
        <Button text={"Sign Up"} className="my-[30px]" />
      </form>
    </div>
  );
}
