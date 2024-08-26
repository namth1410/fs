import { Carousel } from "flowbite-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../appdata/productDetailsSlice";
import { useAppDispatch, useAppSelector } from "../../appdata/store";
import { ImageData } from "../../models/product.model";

const CustomLeftControl = () => (
  <button
    type="button"
    className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700"
  >
    <ChevronLeft className="h-6 w-6" />
  </button>
);

const CustomRightControl = () => (
  <button
    type="button"
    className="flex items-center justify-center w-10 h-10 bg-gray-800 text-white rounded-full hover:bg-gray-700"
  >
    <ChevronRight className="h-6 w-6" />
  </button>
);
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { product, loading, error } = useAppSelector(
    (state) => state.productDetailsRedux
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const images: ImageData[] = product.attributes.images.data ?? [];
  const thumbnails = images.map((img) => img.attributes.url);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 flex flex-col items-center shadow-lg border border-gray-300 rounded-lg p-4">
          <Carousel
            slideInterval={1000}
            leftControl={<CustomLeftControl />}
            rightControl={<CustomRightControl />}
            className="h-50vh lg:h-full"
          >
            {thumbnails.map((thumbnail) => (
              <img
                key={thumbnail}
                src={`http://localhost:1337${thumbnail}`}
                alt={product.attributes.name}
                className="w-full h-full object-contain"
              />
            ))}
          </Carousel>
        </div>

        <div className="lg:w-1/2 lg:pl-8">
          <h1 className="text-2xl font-bold mb-2">{product.attributes.name}</h1>
          <div className="flex items-center mb-4">
            <span className="text-blue-500 text-2xl font-semibold mr-4">
              {Number(product.attributes.price).toLocaleString("vi-VN")}₫
            </span>
            <span className="text-gray-500 line-through">
              {/* Giả sử oldPrice được tính từ giá cũ */}
              {(Number(product.attributes.price) * 1.5).toLocaleString("vi-VN")}
              ₫
            </span>
          </div>
          <div className="mb-4">
            <span className="mr-2">Màn hình:</span>
            {/* Thay đổi theo dữ liệu thực tế */}
            {["40mm", "44mm"].map((size) => (
              <button
                key={size}
                className="px-4 py-2 border rounded mr-2 hover:bg-gray-200"
              >
                {size}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <span className="mr-2">Màu sắc:</span>
            {/* Thay đổi theo dữ liệu thực tế */}
            {["Trắng", "Đen", "Vàng"].map((color) => (
              <button
                key={color}
                className="w-8 h-8 border rounded-full mr-2 hover:bg-gray-200"
                style={{ backgroundColor: color.toLowerCase() }}
              ></button>
            ))}
          </div>
          <div className="p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-2">Ưu đãi</h2>
            <ul className="list-disc list-inside">
              {/* Thay đổi theo dữ liệu thực tế */}
              {[
                "Trải nghiệm Apple Watch tại ShopDunk nhận Voucher giảm 200,000₫ (SL có hạn - Áp dụng mua Apple Watch SE 2022)",
                "Ưu đãi trả góp (1/8 - 31/8)",
                "Ưu đãi tới 5% giá trị sản phẩm khi thanh toán trả góp",
                "Mua kèm giảm giá phụ kiện ưu đãi tới 1.000.000₫",
                "Giảm 20% khi mua Bảo hành kim cương, Bảo hành VIP (Rơi vỡ, vào nước)",
              ].map((promotion, index) => (
                <li key={index} className="mb-2">
                  {promotion}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-4">
            <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Mua Ngay
            </button>
            <button className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300">
              Trả Góp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
