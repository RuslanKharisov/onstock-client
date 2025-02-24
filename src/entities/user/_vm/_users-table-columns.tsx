"use client"

import { UsersListElementWithRelations } from "../_domain/types"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const UsersTableColumns: ColumnDef<UsersListElementWithRelations>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("id")}</i>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("name")}</i>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("role")}</i>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("email")}</i>
      </div>
    ),
  },
  {
    accessorKey: "emailVerified",
    header: "EmailVerified",
    cell: ({ row, column }) => (
      <div data-title={column.columnDef.header as string}>
        <i>{row.getValue("emailVerified")}</i>
      </div>
    ),
  },
  {
    accessorKey: "Supplier",
    header: "Supplier",
    cell: ({ row, column }) => {
      const user = row.original
      return (
        <div data-title={column.columnDef.header as string} className="">
          <Link
            className="font-semibold text-primary hover:text-destructive"
            href={`/supplier/${user.Supplier.id}`}
          >
            {user.Supplier.name}
          </Link>
        </div>
      )
    },
  },
]
