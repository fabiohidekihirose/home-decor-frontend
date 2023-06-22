"use client";

import InputField from "@/components/InputField";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useAppDispatch } from "@/redux/hooks";
import { removeAllItens } from "@/redux/slicers/cartSlice";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const cartItems = useAppSelector((state) => state.cartReducer.cart);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({});

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const finishOrderHandler = () => {
    dispatch(removeAllItens([]));

    router.push("/account");
  };

  const getTotal = () => {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      totalItems += cartItem.inCart;
      totalPrice += cartItem.inCart * cartItem.price;
    });

    return { totalItems, totalPrice };
  };

  return (
    <div className="max-md:flex-col max-md:space-y-[5%] max-md:p-6 p-24 max-md:pt-36 md:pt-44 xl:pt-36 flex md:space-x-[2%] shadow-[0_4px_30px_rgba(157,157,157,0.25)]">
      <div className="md:w-[59%] flex flex-col space-y-[10px] rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)] p-8">
        <h3 className="text-[30px] font-[500] mb-[20px]">Customer Info</h3>
        <div className="flex flex-col">
          <label>First Name</label>
          <InputField
            type="text"
            name="first_name"
            changeHandler={changeHandler}
            required={true}
          />
        </div>
        <div className="flex flex-col">
          <label>Last Name</label>
          <InputField
            type="text"
            name="last_name"
            changeHandler={changeHandler}
            required={true}
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <InputField
            type="text"
            name="email"
            changeHandler={changeHandler}
            required={true}
          />
        </div>
        <div className="flex flex-col">
          <label>Mobile</label>
          <InputField
            type="text"
            name="mobile"
            changeHandler={changeHandler}
            required={true}
          />
        </div>
        <div className="flex flex-col">
          <label>Address</label>
          <InputField
            type="text"
            name="address"
            changeHandler={changeHandler}
            required={true}
          />
        </div>
        <h3 className="text-[30px] font-[500] py-[20px]">Payment Info</h3>
        <div className="flex flex-col">
          <label>Credit Card Number</label>
          <InputField
            type="text"
            name="first_name"
            changeHandler={changeHandler}
            required={true}
          />
        </div>
        <div className="flex space-x-[30px]">
          <div className="flex flex-col w-[100px]">
            <label>Month</label>
            <InputField
              type="number"
              name="month"
              changeHandler={changeHandler}
              maxLength={2}
              required={true}
            />
          </div>
          <div className="flex flex-col w-[100px]">
            <label>Year</label>
            <InputField
              type="number"
              name="year"
              changeHandler={changeHandler}
              maxLength={2}
              required={true}
            />
          </div>
          <div className="flex flex-col w-[100px]">
            <label>CVC</label>
            <InputField
              type="number"
              name="cvc"
              changeHandler={changeHandler}
              required={true}
            />
          </div>
        </div>
      </div>
      <div className="md:w-[39%] space-y-[20px] p-8 rounded-[10px] shadow-[0_4px_30px_rgba(157,157,157,0.25)] h-min">
        <h3 className="text-[30px] font-[500] mb-[20px]">Current Cart</h3>
        {cartItems.map((item) => (
          <div className="flex justify-between">
            <div>
              <p className="text-[20px]">{item.name}</p>
              <p>{item.inCart} item(s)</p>
            </div>
            <p>
              ¥{" "}
              {(item.price * item.inCart)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
          </div>
        ))}
        <hr></hr>
        <div className="flex justify-between">
          <p className="text-[25px] font-[700]">Total</p>
          <p className="text-[25px] font-[700]">
            ¥{" "}
            {getTotal()
              .totalPrice.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
        <button
          className="bg-[#30628b] text-[#ffffff] p-4 rounded-[10px] hover:bg-[#4186BE] w-full"
          onClick={finishOrderHandler}
        >
          Finish Order
        </button>
      </div>
    </div>
  );
}
