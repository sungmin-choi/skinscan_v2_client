"use client";
import InputBase from "@mui/material/InputBase";
import { Stack } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProducts } from "@/service";

export default function ProductsSearchInput({ value, setValue, handleSearch }) {
  return (
    <div className="mt-[4em] w-[100%] flex justify-center">
      <Stack
        sx={{
          display: "flex",
          width: "80%",

          flexDirection: "row",
          borderBottom: "3px solid #141D57",
        }}
      >
        <InputBase
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              handleSearch(value, "keyword");
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
