import { Supplier } from "@/entities/supplier/_domain/types";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

function SupplierInfo({ supplier }: { supplier: Supplier }) {
  return (
    <section className="mb-8">
      <h1 className="">Склад: {supplier?.name} </h1>
      <p className="text-sm font-semibold">
        Текущий тариф:
        <span className="ms-2">
          {supplier?.supplierTariff.name}
        </span>
        <span>
          <Button size="sm" variant="link">
            <Link
              className="font-bold uppercase text-secondary"
              href={`/profile`}
            >
              Изменить
            </Link>
          </Button>
        </span>
      </p>
      <p className="text-sm font-semibold">
        Максимальное количество по текущему тарифу:
        <span className="ms-2">
          {supplier?.supplierTariff.maxProducts}
        </span>
      </p>
    </section>
  );
}

export { SupplierInfo };