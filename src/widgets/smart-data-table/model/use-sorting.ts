import { useState } from "react";

export const useSorting = () => {
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);

  const onSortingChange = (field: string, order: "asc" | "desc") => {
    setSortBy(`${order === "desc" ? "-" : ""}${field}`);
  };

  return {
     sortBy,
     onSortingChange
    };
};
