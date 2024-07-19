"use client"
 
import { UserEntity } from "@/entities/user/_domain/types"
import { Actions } from "@/features/stock/ui/Actions"
import { TableCell } from "@/shared/ui/table"
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const UsersTableColumns: ColumnDef<UserEntity>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({row}) => <i>{row.getValue("id")}</i>,
  },
  {
    header: "Наименование",
    accessorKey: "name",
    cell: ({row}) => <i>{row.getValue("name")}</i>,
  },
  {
    header: () => "Роль",
    accessorKey: "role",
    cell: ({row}) => <i>{row.getValue("role")}</i>,
  },
  {
    header: () => "Email",
    accessorKey: "email",
    cell: ({row}) => <i>{row.getValue("email")}</i>,
  },
  {
    header: () => "Еmail подтвержден",
    accessorKey: "emailVerified",
    cell: ({row}) => {
      const data = row.getValue('emailVerified')
      if (!data) {
        return <i>Не подтвержден</i>
      } 
      return (
        <i> {new Date((row.getValue('emailVerified'))).toDateString()} </i>
      )
    }, 
  }
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const stock = row.original
 
  //     return ( 
  //       <Actions id={stock.id} />
  //     )
  //   },
  // },
]
