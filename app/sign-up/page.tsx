import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function SignUp() {
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
      <div className="flex flex-col justify-center w-[30%]">
        <h1 className="m-auto text-[30px] my-[20px]">Sign Up</h1>
        <label className="mt-[15px]">Email</label>
        <InputField />
        <label className="mt-[15px]">First Name</label>
        <InputField />
        <label className="mt-[15px]">Last Name</label>
        <InputField />
        <label className="mt-[15px]">Mobile</label>
        <InputField />
        <label className="mt-[15px]">Address</label>
        <InputField />
        <label className="mt-[15px]">Password</label>
        <InputField />
        <Button text={"Sign Up"} className="my-[30px]" />
      </div>
    </div>
  );
}
