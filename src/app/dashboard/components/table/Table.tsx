"use client";

// Libraries
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

// Icons
import adobeLogo from "@/assets/icons/adobeLogo.svg";
import members5 from "@/assets/icons/members5.svg";

// Components
// import CardWrapper from "@/components/ui/cardWrapper/CardWrapper";
import Image, { StaticImageData } from "next/image";

// Styles
import Style from "./Table.module.css";

// Types
type Project = {
  company: {
    logo: StaticImageData;
    name: string;
  };
  members: StaticImageData;
  budget?: Number;
  completion: Number;
};

// Data
const data: Project[] = [
  {
    company: {
      logo: adobeLogo,
      name: "Chakra Soft UI Version",
    },
    members: members5,
    budget: 14000,
    completion: 60,
  },
  {
    company: {
      logo: adobeLogo,
      name: "Chakra Soft UI Version",
    },
    members: members5,
    budget: 14000,
    completion: 60,
  },
  {
    company: {
      logo: adobeLogo,
      name: "Chakra Soft UI Version",
    },
    members: members5,
    budget: 14000,
    completion: 60,
  },
  {
    company: {
      logo: adobeLogo,
      name: "Chakra Soft UI Version",
    },
    members: members5,
    budget: 14000,
    completion: 60,
  },
  {
    company: {
      logo: adobeLogo,
      name: "Chakra Soft UI Version",
    },
    members: members5,
    budget: 14000,
    completion: 60,
  },
  {
    company: {
      logo: adobeLogo,
      name: "Chakra Soft UI Version",
    },
    members: members5,
    budget: 14000,
    completion: 60,
  },
];

const Table = () => {
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

  // should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Project>[]>(
    () => [
      {
        accessorKey: "company",
        header: "Company",
        size: 300,
        Cell: ({ cell }) => (
          <div className={Style.tableCompany}>
            <Image
              src={cell.row.original.company.logo.src}
              alt="Company Logo"
              width={100}
              height={100}
            />
            <p>{cell.row.original.company.name}</p>
          </div>
        ),
      },
      {
        accessorKey: "members",
        header: "Members",
        size: 200,
        Cell: ({ cell }) => (
          <Image
            src={cell.row.original.members.src}
            alt="Company Logo"
            width={100}
            height={100}
            className={Style.membersImage}
          />
        ),
      },
      {
        accessorKey: "budget",
        header: "Budget",
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue<number>().toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }),
      },
      {
        accessorKey: "completion",
        header: "Completion",
        size: 150,
        Cell: ({ cell }) => (
          <>
            {cell.row.original.completion}%
            <div className={Style.completionWrapper}>
              <div
                style={{ width: `${cell.row.original.completion}%` }}
                className={Style.completion}
              />
            </div>
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
        color: "#fff",
        fontSize: "1.1rem",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        color: "#fff",
      },
    },

    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [2, 4, 6, 8, 10],
      shape: "rounded",
      variant: "outlined",
    },
    enableColumnFilterModes: false,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableRowSelection: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
  });

  return (
    <>
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable table={table} />
      </ThemeProvider>
    </>
  );
};

export default Table;
