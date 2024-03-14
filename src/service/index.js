import axios from "axios";

const client = axios.create({
  baseURL: "https://14tu647t23.execute-api.ap-northeast-2.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async (keyword, type) => {
  try {
    const response = await client.get(
      `${
        type === "keyword"
          ? `/dev/products?query=${keyword}`
          : `/dev/products?query=${keyword}`
      }`
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
