import Header from "@/components/Header";
import ProductsPage from "@/components/ProductsPage";
import { Suspense } from "react";
// import { useRouter } from "next/navigation";

export default function Page() {
  return (
    <main className="max-w-[1044px] m-auto w-[100%] md:pt-[47px] md:px-[10px] px-[16px] pt-[24px]">
      <Header />
      <Suspense fallback={<>Loading...</>}>
        <ProductsPage />
      </Suspense>
    </main>
  );
}
