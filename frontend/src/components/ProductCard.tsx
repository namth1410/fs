import { Button, Card } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../lib/utils";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  currentPrice: string;
  oldPrice: string;
  discount: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  currentPrice,
  oldPrice,
  discount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = generateSlug(name);
    navigate(`/product-details/${id}/${slug}`);
  };

  return (
    <Card className="max-w-sm" imgSrc={image}>
      <div className="p-4">
        <h2 className="text-white text-lg font-bold">{name}</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-blue-500 text-xl font-semibold">
            {Number(currentPrice).toLocaleString("vi-VN")}₫
          </span>
          <span className="text-gray-500 line-through">
            {Number(oldPrice).toLocaleString("vi-VN")}₫
          </span>
        </div>
        <div className="text-right text-green-500 text-sm">-{discount}%</div>
      </div>
      <Button onClick={handleClick}>
        Xem chi tiết
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
};

export default ProductCard;
