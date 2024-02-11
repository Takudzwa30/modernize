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
import Style from "./OrdersTable.module.css";

// Types
type RecentTypes = {
  order: string;
  percentage: number;
  date: Date;
  customer: string;
  paymentStatus: boolean;
  orderStatus: string;
  amount: number;
};

// Data
const data: RecentTypes[] = [
  {
    order: "12512B",
    percentage: 55,
    date: new Date("2015-07-20T08:30:00Z"),
    customer: "Violet Phillips",
    paymentStatus: true,
    orderStatus: "ready",
    amount: 124.97,
  },
  {
    order: "35622A",
    percentage: 55,
    date: new Date("2015-07-20T08:30:00Z"),
    customer: "Takudzwa Allen Mushai",
    paymentStatus: false,
    orderStatus: "shipped",
    amount: 97,
  },
  {
    order: "76543E",
    percentage: 55,
    date: new Date("2012-03-18T12:00:00Z"),
    customer: "Francisco Henry",
    paymentStatus: true,
    orderStatus: "ready",
    amount: 1024.97,
  },
  {
    order: "47238B",
    percentage: 55,
    date: new Date("2007-09-28T09:20:00Z"),
    customer: "Nettie Palmer",
    paymentStatus: true,
    orderStatus: "received",
    amount: 17.43,
  },
  {
    order: "12437B",
    percentage: 55,
    date: new Date("2018-04-10T17:00:00Z"),
    customer: "Nettie Tyler",
    paymentStatus: false,
    orderStatus: "ready",
    amount: 9.9,
  },
];

const OrdersTable: React.FC = () => {
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
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    let hour: number = date.getHours();
    const minute: number = date.getMinutes();
    const amPM: string = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    const minuteStr: string = minute < 10 ? `0${minute}` : `${minute}`;
    return `${month} ${day}, ${hour}:${minuteStr} ${amPM}`;
  }

  function orderStatusClassName(status: string) {
    if (status === "ready") {
      return Style.ready;
    } else if (status === "shipped") {
      return Style.shipped;
    } else {
      return Style.received;
    }
  }

  // should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<RecentTypes>[]>(
    () => [
      {
        accessorKey: "order",
        header: "Order",
        size: 200,
        Cell: ({ cell }) => `#${cell.row.original.order}`,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 200,
        Cell: ({ cell }) => formatDate(cell.row.original.date),
      },
      {
        accessorKey: "customer",
        header: "Customer",
        size: 200,
        Cell: ({ cell }) => cell.row.original.customer,
      },
      {
        accessorKey: "paymentStatus",
        header: "Payment Status",
        size: 100,
        Cell: ({ cell }) => (
          <div
            className={
              cell.row.original.paymentStatus ? Style.paid : Style.pending
            }
          >
            {cell.row.original.paymentStatus ? "Paid" : "Pending"}{" "}
          </div>
        ),
      },
      {
        accessorKey: "orderStatus",
        header: "Order Status",
        size: 100,
        Cell: ({ cell }) => (
          <div
            className={
              orderStatusClassName(cell.row.original.orderStatus)
              //   cell.row.original.orderStatus ? Style.paid : Style.pending
            }
          >
            {cell.row.original.orderStatus}
          </div>
        ),
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    muiSearchTextFieldProps: {
      placeholder: "Search...",
      //   sx: { minWidth: "300px", color: "red !important" },
      variant: "outlined",
    },
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
    },
    positionGlobalFilter: "left",
    enableColumnPinning: true,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: true,
    enableColumnActions: true,
    enableDensityToggle: false,
    enableRowSelection: true,
    enableFullScreenToggle: false,
    enableTopToolbar: true,
    enableBottomToolbar: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
  });

  return (
    <Card>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </Card>
  );
};

export default OrdersTable;
