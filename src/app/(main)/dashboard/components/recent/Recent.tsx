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

// Styles
import Style from "./Recent.module.css";

// Types
type RecentTypes = {
  name: string;
  date: Date;
  status: boolean;
  amount: number;
};

// Data
const data: RecentTypes[] = [
  {
    name: "Jessica S.",
    date: new Date(),
    amount: 124.97,
    status: true,
  },
  {
    name: "Andrew S.",
    date: new Date(),
    amount: 55.42,
    status: false,
  },
  {
    name: "Kevin S.",
    date: new Date(),
    amount: 89.9,
    status: true,
  },
  {
    name: "Jack S.",
    date: new Date(),
    amount: 144.94,
    status: false,
  },
  {
    name: "Arthur S.",
    date: new Date(),
    amount: 70.52,
    status: true,
  },
];

const Recent: React.FC = () => {
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

  const columns = useMemo<MRT_ColumnDef<RecentTypes>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 100,
        Cell: ({ cell }) => cell.row.original.name,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 100,
        Cell: ({ cell }) => formatDate(cell.row.original.date),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 100,
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
        Cell: ({ cell }) => (
          <>
            {cell.row.original.status ? (
              <div className={Style.paid}>Paid</div>
            ) : (
              <div className={Style.pending}>Pending</div>
            )}
          </>
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

export default Recent;
