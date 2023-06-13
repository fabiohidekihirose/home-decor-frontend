interface InputFieldProps {
  type: string;
  name: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
  required: boolean;
  defaultValue?: string;
}

export default function InputField({
  type,
  name,
  changeHandler,
  required,
  defaultValue,
}: InputFieldProps) {
  return (
    <input
      className="border h-[40px] rounded-[10px] px-[10px]"
      type={type}
      name={name}
      onChange={changeHandler}
      required={required ? true : false}
      defaultValue={defaultValue}
    ></input>
  );
}
