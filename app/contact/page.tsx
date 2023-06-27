"use client";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slicers/authSlice";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userData = await axios.post(`${baseUrl}/login`, formData);

      dispatch(
        setCredentials({
          user: userData.data.id,
          token: userData.data.accessToken,
        })
      );
      setError("");

      router.push("/account");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return (
    <div className="flex mx-auto md:space-x-[10%] h-[100vh] max-md:flex-col">
      <div className="md:w-[40%] bg-[#30628b] flex flex-col md:space-y-[190px] text-[#ffffff] max-md:px-[30px] max-md:pb-[30px] px-[60px]">
        <Link href={"/"} className="flex w-[50%]">
          <img src="/images/home_decor_logo_login.png"></img>
        </Link>
        <div className="text-[35px] max-md:text-[25px]">
          Login to your HomeDecor account
        </div>
        <div className="text-[10px] grow max-md:hidden">
          Copyright 2023. All Rights Reserved
        </div>
      </div>
      <form
        className="flex flex-col justify-center md:w-[40%] xl:w-[30%] max-md:p-6"
        onSubmit={submitHandler}
      >
        <h1 className="m-auto text-[30px] my-[20px]">Login</h1>
        <label className="mt-[15px]">Email</label>
        <InputField
          type="email"
          name="email"
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
        <Link
          href={"/forgot-password"}
          className="underline hover:text-[#30628b]"
        >
          Forgot Your Password?
        </Link>
        {error && <p className="text-[#FF0000] mt-[10px]">{error}</p>}
        <Button text={"Login"} className="my-[30px]" />
        <div className="flex space-x-[5px]">
          <p>Do not have a HomeDecor account yet?</p>
          <Link href={"/sign-up"} className="underline hover:text-[#30628b]">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
