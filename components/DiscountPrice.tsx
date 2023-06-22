interface DiscountPriceProps {
  price: number;
  discount: number;
  textSize: number;
}

export default function DiscountPrice({
  price,
  discount,
  textSize,
}: DiscountPriceProps) {
  return (
    <div className={"flex items-center"}>
      <p className={`text-[${textSize}px] mr-[5px]`}>
        ¥
        {(price * (1 - discount / 100))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </p>
      <p className={`text-[${textSize - 10}px] line-through text-[#757575]`}>
        ¥{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </p>
    </div>
  );
}
