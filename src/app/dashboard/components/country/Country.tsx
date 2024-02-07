"use client";

// Libraries
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

// Components
import Card from "@/components/ui/card/Card";
import Image, { StaticImageData } from "next/image";

// Images
import usFlag from "@/assets/images/US.png";

// Styles
import Style from "./Country.module.css";

// Types
type RecentTypes = {
  country: {
    name: string;
    flag: StaticImageData;
  };
  percentage: number;
};

// Data
const data: RecentTypes[] = [
  {
    country: { name: "United States", flag: usFlag },
    percentage: 55,
  },
  {
    country: { name: "United States", flag: usFlag },
    percentage: 20,
  },
  {
    country: { name: "United States", flag: usFlag },
    percentage: 15,
  },
  {
    country: { name: "United States", flag: usFlag },
    percentage: 6,
  },
  {
    country: { name: "United States", flag: usFlag },
    percentage: 4,
  },
];

const Country: React.FC = () => {
  const globalTheme = useTheme();
  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#90caf9",
          },
          background: {
            default: "#66000000",
            paper: "#1e1e1e",
          },
          text: {
            secondary: "#fff",
            primary: "#fff",
          },
        },
      }),
    []
  );

  function formatDate(date: Date): string {
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    const dayStr: string = String(day).padStart(2, "0");
    const monthStr: string = String(month).padStart(2, "0");
    return `${dayStr}.${monthStr}.${year}`;
  }

  // should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<RecentTypes>[]>(
    () => [
      {
        accessorKey: "country",
        header: "Country",
        size: 200,
        Cell: ({ cell }) => (
          <div className={Style.country}>
            <Image
              src={cell.row.original.country.flag.src}
              alt="Country Logo"
              width={100}
              height={100}
            />
            <p>{cell.row.original.country.name}</p>
          </div>
        ),
      },
      {
        accessorKey: "percentage",
        header: "Percentage",
        size: 100,
        Cell: ({ cell }) => (
          <div className={Style.wrapperPercentage}>
            <>{cell.row.original.percentage}%</>
            <div className={Style.completionWrapper}>
              <div
                style={{ width: `${cell.row.original.percentage}%` }}
                className={Style.completion}
              />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableHeadCellProps: {
      sx: {
        color: "#5A607F",
        fontSize: "0.9rem",
        fontWeight: 400,
      },
    },
    muiTableBodyCellProps: {
      sx: {
        color: "#131523",
      },
    },

    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [2, 4, 6, 8, 10],
      shape: "rounded",
      variant: "outlined",
    },
    enableColumnPinning: true,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableColumnActions: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
  });

  return (
    <Card>
      <h6 className={Style.title}> Recent Transactions</h6>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </Card>
  );
};

export default Country;
