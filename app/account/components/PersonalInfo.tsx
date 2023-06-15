import InputField from "@/components/InputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/slicers/authSlice";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const token = useAppSelector(selectCurrentToken);

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    (async () => {
      const personalInfo = await axios.get(`${baseUrl}/profile`, {
        headers: {
          Authorization: token,
        },
      });
      setFormData(personalInfo.data);
    })();
  }, []);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(`${baseUrl}/users`, formData);
      setError("");

      router.push("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form className="flex flex-col p-10 pt-4" onSubmit={submitHandler}>
      <h3 className="text-[20px] mb-[20px]">Personal Info</h3>
      <label className="mt-[15px]">Email</label>
      <InputField
        type="email"
        name="email"
        changeHandler={changeHandler}
        required={true}
        defaultValue={formData.email}
      />
      <label className="mt-[15px]">First Name</label>
      <InputField
        type="text"
        name="first_name"
        changeHandler={changeHandler}
        required={true}
        defaultValue={formData.first_name}
      />
      <label className="mt-[15px]">Last Name</label>
      <InputField
        type="text"
        name="last_name"
        changeHandler={changeHandler}
        required={true}
        defaultValue={formData.last_name}
      />
      <label className="mt-[15px]">Mobile</label>
      <InputField
        type="number"
        name="mobile"
        changeHandler={changeHandler}
        required={true}
        defaultValue={formData.mobile}
      />
      <label className="mt-[15px]">Address</label>
      <InputField
        type="text"
        name="address"
        changeHandler={changeHandler}
        required={true}
        defaultValue={formData.address}
      />
      <label className="mt-[15px]">Password</label>
      <InputField
        type="password"
        name="password"
        changeHandler={changeHandler}
        required={true}
      />
      {error && <p>{error}</p>}
      <Button text={"Save"} className="my-[30px]" />
    </form>
  );
}
