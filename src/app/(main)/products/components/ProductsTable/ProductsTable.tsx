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
import Style from "./ProductsTable.module.css";
import { useModal } from "@/contexts/ModalContext";
import DeleteModal from "@/components/modals/deleteModal/DeleteModal";
import DeleteButton from "@/assets/svgComponents/DeleteButton";
import EditButton from "@/assets/svgComponents/EditButton";
// import ProductModal from "@/components/modals/productModal/ProductModal";

// Types
type ProductTypes = {
  id: string;
  images: string[];
  productDescription: string;
  productInventory: number;
  productName: string;
  productColor: string;
  productPrice: number;
  selectedCategories: string[];
};

type ProductsTableProps = {
  products: ProductTypes[];
};

const ProductsTable: React.FC<ProductsTableProps> = ({ products }) => {
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

  // should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<ProductTypes>[]>(
    () => [
      {
        accessorKey: "productDetails",
        header: "Product",
        size: 300,
        Cell: ({ cell }) => {
          const { productName, selectedCategories, images } = cell.row.original;
          return (
            <div className={Style.productColumn}>
              <img src={images[0]} alt={productName} />
              <div>
                <div className={Style.productName}>{productName}</div>
                <div className={Style.productCategories}>
                  {selectedCategories[0]}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "productDescription",
        header: "Description",
        size: 300,
        Cell: ({ cell }) => {
          return (
            <div className={Style.productDescription}>
              {cell.row.original.productDescription}
            </div>
          );
        },
      },
      {
        accessorKey: "productInventory",
        header: "Inventory",
        size: 100,
        Cell: ({ cell }) => {
          return cell.row.original.productInventory > 0 ? (
            <div>{cell.row.original.productInventory + " in stock"}</div>
          ) : (
            <div className={Style.outOfStock}>Out of Stock</div>
          );
        },
      },
      {
        accessorKey: "productPrice",
        header: "Price",
        size: 120,
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        accessorKey: "selectedCategories",
        header: "Categories",
        size: 200,
        Cell: ({ cell }) => cell.row.original.selectedCategories.join(", "),
      },
      {
        accessorKey: "color",
        header: "Color(s)",
        size: 150,
        Cell: ({ cell }) => cell.row.original.productColor,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: products.reverse(),
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
        openModal(<DeleteModal ids={ids} tableName="products" />);
      };

      const handleActivate = () => {
        // openModal(<ProductModal updateId={ids[0]} />);
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
              disabled={
                true
                // !table.getIsSomeRowsSelected() || ids.length > 1
              }
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

export default ProductsTable;
