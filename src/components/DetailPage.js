"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductDetail, fetchProductAnalytics } from "@/service";
import {
  CircularProgress,
  Grid,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Ingredients from "./Ingredients";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "ingredient",
    headerName: "Ingredients Inside",
    minWidth: 150,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
    hideSortIcons: true,
    renderCell: ({ row }) => {
      return (
        <Stack sx={{ textAlign: "left" }}>
          <p
            style={{
              color: row.not_safe_description.length > 0 ? "red" : "#141D57",
            }}
          >
            {row.ingredient_name}
          </p>
          <div>
            <p style={{ color: "yellow" }}>{row.caution_description}</p>
          </div>
          <div>
            <p style={{ color: "red" }}> {row.not_safe_description}</p>
          </div>
        </Stack>
      );
    },
  },
  {
    field: "Role",
    headerName: "EWG CIR Cosmetic Roles",
    minWidth: 150,
    disableColumnMenu: true,
    flex: 0.5,
    sortable: false,
    hideSortIcons: true,
    renderCell: ({ row }) => {
      return (
        <Stack sx={{ textAlign: "left" }}>
          <Stack flexDirection={"row"} display={"flex"} gap={1}>
            {row.cir && <Chip label={row.cir} />}
            {row.ewg && <Chip label={row.ewg} />}
          </Stack>
          <p>{row.cosmetic_roles}</p>
        </Stack>
      );
    },
  },
];

export default function ProductDetailPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  const [loading, setLoading] = useState(false);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const [productDetail, setProductDetail] = useState();
  const [productAnalytics, setProductAnalytics] = useState();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchSearchProductDetail = async (query) => {
      try {
        setLoading(true);
        const res = await fetchProductDetail(query);
        setProductDetail(res);
      } catch (err) {
        console.error(err);
        // setproductDetailTitle("");
      } finally {
        setLoading(false);
      }
    };
    fetchSearchProductDetail(query);
  }, [query]);

  useEffect(() => {
    const fetchSearchProductAnalytics = async (ingredients) => {
      try {
        setAnalyticsLoading(true);
        const res = await fetchProductAnalytics(ingredients);

        setProductAnalytics(res);
      } catch (err) {
        console.error(err);
        // setproductDetailTitle("");
      } finally {
        setAnalyticsLoading(false);
      }
    };

    if (productDetail) {
      fetchSearchProductAnalytics(productDetail.ingredients);
    }
  }, [productDetail]);

  console.log("info:", productDetail);
  console.log("analytics:", productAnalytics);
  return (
    <div className="flex items-center flex-col mt-[4em]">
      {loading && <CircularProgress className="mt-[8em]" size={120} />}
      {!loading && productDetail && (
        <Stack display={"flex"} justifyContent={"center"}>
          <div className="flex md:flex-row flex-col items-center mb-[40px]">
            <img
              className="md:w-[418px] w-[120px] md:h-[418px] h-[120px] flex-[0.5] object-contain"
              src={productDetail.img_url}
              alt={productDetail.title}
            />
            <Stack sx={{ textAlign: "left", flex: 0.5 }}>
              <span
                className="md:text-[24px] text-[20px] font-[700]"
                style={{
                  color: "#7580C8",
                }}
              >
                {productDetail.brand_name}
              </span>
              <span
                className="md:text-[32px] text-[24px] font-[700]"
                style={{
                  marginTop: "30px",
                  color: "#141D57",

                  marginBottom: "40px",
                }}
              >
                {productDetail.title}
              </span>

              <span
                className="md:text-[20px] text-[18px] font-[500]"
                style={{
                  color: "#515151",

                  lineHeight: "100%",
                  marginBottom: "10px",
                }}
              >
                {productDetail.prouduct_description}
              </span>
            </Stack>
          </div>
          <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          >
            <AccordionSummary
              expandIcon={
                expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <span
                style={{
                  color: "#66697D",

                  fontWeight: 700,
                }}
              >
                Ingredients overview
              </span>
            </AccordionSummary>
            <AccordionDetails>
              <Ingredients ingredients={productDetail.ingredients} />
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
      {analyticsLoading && <CircularProgress className="mt-[8em]" size={120} />}
      {!analyticsLoading && productAnalytics && (
        <>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              sx={{
                borderRadius: "10px",
                my: "20px",
                border: "1px solid #A4B0FF",
                padding: "12px 14px",
                fontWeight: 700,
                color: "#141D57",
                fontSize: "16px",
              }}
            >
              <div>
                Found{" "}
                {
                  <span
                    style={{
                      color: "#FF4627",
                      fontWeight: "800",
                    }}
                  >
                    {productAnalytics.danger_count}
                  </span>
                }{" "}
                number of ingredients that are known Malassezia/Fungal Acne
                Triggers
              </div>
            </Stack>
          </Stack>
          <Stack className="md:px-[24px] px-[4px] mb-[40px] w-[100%]">
            <DataGrid
              rowHeight={200}
              hideFooter
              disableRowSelectionOnClick
              rows={productAnalytics.ingredients_info}
              getRowId={(row) => row.ingredient_name}
              columns={columns}
            />
          </Stack>
        </>
      )}
    </div>
  );
}
