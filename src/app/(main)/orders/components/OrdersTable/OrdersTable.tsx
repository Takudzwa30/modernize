"use client";

// Libraries
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_GlobalFilterTextField,
} from "material-react-table";

// Components
import Card from "@/components/ui/card/Card";

// Styles
import Style from "./OrdersTable.module.css";
import { useModal } from "@/contexts/ModalContext";
import DeleteModal from "@/components/modals/deleteModal/DeleteModal";
import DeleteButton from "@/assets/svgComponents/DeleteButton";
import EditButton from "@/assets/svgComponents/EditButton";
import OrderModal from "@/components/modals/orderModal/OrderModal";

// Types
type RecentTypes = {
  orderNumber: string;
  date: Date;
  customer: string;
  paymentStatus: string;
  orderStatus: string;
  amount: number;
  id: string;
};

type OrdersTableProps = {
  orders: RecentTypes[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const globalTheme = useTheme();
  const { openModal } = useModal();
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

  function formatDate(unformattedDate: Date): string {
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

    const date = new Date(unformattedDate);

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
        accessorKey: "orderNumber",
        header: "Order",
        size: 200,
        Cell: ({ cell }) => `#${cell.row.original.orderNumber}`,
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
              cell.row.original.paymentStatus === "paid"
                ? Style.paid
                : Style.pending
            }
          >
            {cell.row.original.paymentStatus === "paid" ? "Paid" : "Pending"}
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
    data: orders.reverse(),
    muiSearchTextFieldProps: {
      placeholder: "Search...",
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
    renderTopToolbar: ({ table }) => {
      const selectedRows = table.getSelectedRowModel().flatRows;
      const ids = selectedRows.map((row) => row.original.id);

      const handleDeactivate = async () => {
        openModal(<DeleteModal ids={ids} tableName="orders" />);
      };

      const handleActivate = () => {
        openModal(<OrderModal updateId={ids[0]} />);
        // alert("activating " + ids[0]);
      };

      return (
        <div className={Style.tableFilters}>
          <MRT_GlobalFilterTextField
            table={table}
            sx={{ input: { color: "black" } }}
          />
          <div className={Style.actions}>
            <button
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
            >
              <DeleteButton />
            </button>
            <button
              disabled={!table.getIsSomeRowsSelected() || ids.length > 1}
              onClick={handleActivate}
            >
              <EditButton />
            </button>
          </div>
        </div>
      );
    },
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
