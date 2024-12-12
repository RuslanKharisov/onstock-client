"use client"

import { UserEntity } from "@/entities/user/types/types"
import { ColumnDef } from "@tanstack/react-table"

export const UsersTableColumns: ColumnDef<UserEntity>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => <i>{row.getValue("id")}</i>,
  },
  {
    header: "Наименование",
    accessorKey: "name",
    cell: ({ row }) => <i>{row.getValue("name")}</i>,
  },
  {
    header: () => "Роль",
    accessorKey: "role",
    cell: ({ row }) => <i>{row.getValue("role")}</i>,
  },
  {
    header: () => "Email",
    accessorKey: "email",
    cell: ({ row }) => <i>{row.getValue("email")}</i>,
  },
  {
    header: () => "Еmail подтвержден",
    accessorKey: "emailVerified",
    cell: ({ row }) => {
      const data = row.getValue("emailVerified")
      if (!data) {
        return <i>Не подтвержден</i>
      }
      return <i> {new Date(row.getValue("emailVerified")).toDateString()} </i>
    },
  },
]
