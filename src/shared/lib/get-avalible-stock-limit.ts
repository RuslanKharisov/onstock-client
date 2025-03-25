export function getAvalibleStockLimits({
  supplier,
  stockLenght,
}: {
  supplier: Supplier
  stockLenght: number
}) {
  const tariffLimit = supplier?.subscription.tariff.maxProducts
  const freeSpace = tariffLimit - stockLenght

  return {
    stockLenght,
    tariffLimit,
    freeSpace,
  }
}
