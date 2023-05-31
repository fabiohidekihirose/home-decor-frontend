import InputField from "@/components/InputField";
import Button from "@/components/Button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col max-w-[500px] m-auto mt-[100px] bg-[#ffffff] p-6 rounded-[20px]">
      <h1 className="m-auto text-[30px] my-[20px]">Login</h1>
      <label className="mt-[15px]">Username</label>
      <InputField />
      <label className="mt-[15px]">Password</label>
      <InputField />
      <Button text={"Login"} className="my-[30px]" />
      <Link href={"/forgot-password"}>Forgot Password?</Link>
      <div>
        <p>Do not have an account?</p>
        <Link href={"/sign-up"}>Sign up</Link>
      </div>
    </div>
  );
}
