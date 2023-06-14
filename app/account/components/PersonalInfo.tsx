import InputField from "@/components/InputField";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentToken } from "@/redux/slicers/authSlice";

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    mobile: "",
  });
  const token = useAppSelector(selectCurrentToken);

  const baseUrl = "http://localhost:8000";

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

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex flex-col p-10 pt-4">
      <h3 className="text-[20px] mb-[20px]">Personal Info</h3>
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
    </div>
  );
}
