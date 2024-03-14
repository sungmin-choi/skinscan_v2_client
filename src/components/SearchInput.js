"use client";
import InputBase from "@mui/material/InputBase";
import { Stack } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProducts } from "@/service";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const handleSearch = () => {
    router.push(`/products?query=${value}`);
  };
  return (
    <div>
      <p className="text-color-blue_80 md:text-[36px] text-[20px] font-[700] mb-[16px] mt-[3em]">
        어떤 화장품의 어떤 성분이 궁금하신가요?
      </p>
      <Stack
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          borderBottom: "3px solid #141D57",
        }}
      >
        <InputBase
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              handleSearch();
            }
          }}
          value={value}
          onChange={(v) => setValue(v.target.value)}
          className="ml-1 flex-1 md:text-[24px] text-[18px]"
          placeholder="영어로 입력해주세요. ex) skin food"
        />
        <SearchIcon fontSize="large" />
      </Stack>
    </div>
  );
}
