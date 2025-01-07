import { Category } from "../_domain/types";

export function flattenCategories(categories: Category[]): number[] {
  const ids: number[] = [];
  const traverse = (cats: Category[]) => {
    cats.forEach((cat) => {
      ids.push(cat.id);
      if (cat.children) {
        traverse(cat.children);
      }
    });
  };
  traverse(categories);
  return ids;
}