"use server"

import { supplierRepository } from "../_repositories/supplier.repository"

export const getSupplier = (userId:string) => {
  return supplierRepository.getSupplierByUserId(userId)
}