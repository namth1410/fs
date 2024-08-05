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
    <div className="inline-block bg-gray-900 p-4 rounded-lg transition-transform transform hover:scale-105">
      <div className="relative w-full h-48 mb-2">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
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
        <button
          onClick={handleClick}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
