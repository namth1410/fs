import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../appdata/productsSlice";
import { useAppDispatch, useAppSelector } from "../../appdata/store";
import { PaginationCustom } from "../../components/PaginationCustom";
import ProductCard from "../../components/ProductCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Skeleton } from "../../components/ui/skeleton";

function Iphone() {
  const dispatch = useAppDispatch();

  const { productType = "" } = useParams<{ productType?: string }>();

  const products = useAppSelector((state) => state.productsRedux.products);
  const pagination = useAppSelector((state) => state.productsRedux.pagination);
  const status = useAppSelector((state) => state.productsRedux.status);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("price:asc");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(getProducts({ productType, page, sortBy }));
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    dispatch(getProducts({ productType, page: currentPage, sortBy: value }));
  };

  useEffect(() => {
    if (productType) {
      dispatch(getProducts({ productType, page: currentPage, sortBy }));
    }
    // eslint-disable-next-line
  }, [productType]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Danh sách sản phẩm {productType}
      </h1>

      <div className="mb-4">
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Thứ tự hiển thị" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="price:asc">Giá thấp đến cao</SelectItem>
              <SelectItem value="price:desc">Giá cao đến thấp</SelectItem>
              <SelectItem value="name:asc">Tên: A đến Z</SelectItem>
              <SelectItem value="name:desc">Tên: Z đến A</SelectItem>
              <SelectItem value="publishedAt:desc">Mới nhất</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-6 auto-rows-min sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {status === "loading"
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                image={
                  product.attributes.images.data?.[0].attributes.url
                    ? `${process.env.REACT_APP_API_URL}${product.attributes.images.data?.[0].attributes.url}`
                    : "/logo512.png"
                }
                id={product.id}
                name={product.attributes.name}
                currentPrice={product.attributes.price}
                oldPrice={product.attributes.price}
                discount={20}
              />
            ))}
      </div>
      {pagination && (
        <div className="flex justify-center mt-4">
          <PaginationCustom
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Iphone;
