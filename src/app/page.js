import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <main className="max-w-[1044px] m-auto w-[100%] md:pt-[47px] md:px-[10px] px-[16px] pt-[24px]">
      <Header />
      <SearchInput />
    </main>
  );
}
