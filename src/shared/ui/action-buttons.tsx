import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Button } from "./button"
import { MoreHozontalIcon } from "../icons/more-horizontal-icon"
import { TrashIcon } from "../icons/trash-icon"

const ActionButtons = ({ onDelete }: { onDelete: VoidFunction }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHozontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="border-none">
        <DropdownMenuItem onClick={onDelete} className="cursor-pointer">
          <TrashIcon className="mr-2 size-4" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ActionButtons }
