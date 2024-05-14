import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

import { allProducts } from "@/data/products";
import { ProductCard } from "@/components/global/product-card";
import { ProductsSearch } from "@/components/global/products-search";
import { CartDrower } from "@/components/global/cart-drower";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("");
  const [rangeOption, setRangeOption] = useState<string>("");

  const [productsAfterFilter, setProductsAfterFilter] = useState<
    {
      id: number;
      title: string;
      description: string;
      price: number;
      oldPrice: number;
    }[]
  >(allProducts);

  useEffect(() => {
    handleFilteration();
  }, [searchFilter, filterOption, rangeOption]);

  const handleFilteration = () => {
    if (filterOption === "price") {
      setProductsAfterFilter(
        allProducts
          .filter(
            (item) =>
              item.title.toLowerCase().includes(searchFilter) &&
              item.price >= +rangeOption
          )
          .sort((a, b) => a.price - b.price)
      );
      console.log(
        allProducts
          .filter(
            (item) =>
              item.title.toLowerCase().includes(searchFilter) &&
              item.price >= +rangeOption
          )
          .sort((a, b) => a.price - b.price)
      );
    } else if (filterOption == "name") {
      setProductsAfterFilter(
        allProducts
          .filter(
            (item) =>
              item.title.toLowerCase().includes(searchFilter) &&
              item.price >= +rangeOption
          )
          .sort((a, b) => a.title.localeCompare(b.title))
      );
    } else {
      setProductsAfterFilter(
        allProducts.filter(
          (item) =>
            item.title.toLowerCase().includes(searchFilter) &&
            item.price >= +rangeOption
        )
      );
    }
  };

  return (
    <main className={inter.className}>
      <div className="container mx-auto px-1.5 ">
        <ProductsSearch
          setSearchFilter={setSearchFilter}
          setFilterOption={setFilterOption}
          setRangeOption={setRangeOption}
          rangeOption={rangeOption}
        />
        <div className="flex gap-1.5 flex-wrap">
          {productsAfterFilter.map((item) => (
            <ProductCard
              key={item?.id}
              id={item?.id}
              title={item?.title}
              description={item?.description}
              price={item?.price}
              oldPrice={item?.oldPrice}
            />
          ))}
        </div>
        <div className="fixed bottom-5 right-5">
          <CartDrower />
        </div>
      </div>
    </main>
  );
}
