/* eslint-disable react/no-unescaped-entities */
"use client";
import ProductsSearchInput from "@/components/ProductsSearchInput";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/service";
import { CircularProgress, Grid, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage({}) {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [loading, setLoading] = useState(false);
  const [routePages, setRoutePages] = useState([]);
  const [products, setProducts] = useState([]);
  const [resultTitle, setResultTitle] = useState(query);

  const handleSearch = async () => {
    router.push(`/products?query=${value}`);
  };

  const handleDetail = async (id) => {
    router.push(`/detail?query=${id}`);
  };

  const handlePage = async (url) => {
    try {
      setLoading(true);
      const result = await fetchProducts(url, "page");
      setProducts(result.products);
      setRoutePages(result.route_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSearchProducts = async (query) => {
      try {
        setLoading(true);
        const result = await fetchProducts(query, "keyword");

        setResultTitle(query);
        setProducts(result.products);
        setRoutePages(result.route_pages);
      } catch (err) {
        console.error(err);
        // setResultTitle("");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchProducts(query);
  }, [query]);

  return (
    <div className="flex items-center flex-col">
      <ProductsSearchInput
        value={value}
        setValue={setValue}
        handleSearch={handleSearch}
      />
      {loading && <CircularProgress className="mt-[8em]" size={120} />}
      {!loading && resultTitle && (
        <>
          <Stack className="flex flex-col items-center">
            <p className="text-[24px] font-[700] text-color-blue_80 mt-[2em]">
              "{resultTitle}" 검색결과
            </p>
            <Grid className="mt-[3em]" container>
              {products.map((product, index) => (
                <Grid xs={12} md={6} key={product.id}>
                  <Stack
                    onClick={() => handleDetail(product.id)}
                    className="h-[70px] text-color-grey_50 font-[500] text-[20px] hover:text-color-blue_80 cursor-pointer"
                  >
                    {product.title}
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Stack
              sx={{
                margin: "auto",
                display: "flex",
                flexDirection: "row",
                gap: 3,
              }}
            >
              {routePages.map((item) => {
                return (
                  <Stack
                    onClick={() => handlePage(item.url)}
                    className="h-[55px] text-color-grey_50 font-[500] text-[20px] hover:text-color-blue_80 cursor-pointer"
                    key={item.id}
                  >
                    {item.title}
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
}
