import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

export default function Login() {
  return (
    <div className="flex mx-auto space-x-[10%] h-[100vh]">
      <div className="w-[40%] bg-[#30628b] flex flex-col space-y-[190px] text-[#ffffff] px-[60px]">
        <Link href={"/"} className="flex w-[50%]">
          <img src="/images/home_decor_logo_login.png"></img>
        </Link>
        <div className="text-[35px]">Login to your HomeDecor account</div>
        <div className="text-[10px] grow">
          Copyright 2023. All Rights Reserved
        </div>
      </div>
      <div className="flex flex-col justify-center w-[30%]">
        <h1 className="m-auto text-[30px] my-[20px]">Login</h1>
        <label className="mt-[15px]">Username</label>
        <InputField />
        <label className="mt-[15px]">Password</label>
        <InputField />
        <Link
          href={"/forgot-password"}
          className="underline hover:text-[#30628b]"
        >
          Forgot Your Password?
        </Link>
        <Button text={"Login"} className="my-[30px]" />
        <div className="flex space-x-[5px]">
          <p>Do not have a HomeDecor account yet?</p>
          <Link href={"/sign-up"} className="underline hover:text-[#30628b]">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
