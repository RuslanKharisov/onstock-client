// "use client"

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/shared/ui/form"
// import { Input } from "@/shared/ui/input"
// import { Textarea } from "@/shared/ui/textarea"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/shared/ui/button"
// import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card"
// import { createProductFormSchema } from "@/entities/stock/_domain/schemas"
// import { addOrUpdateProductCommand } from "@/entities/producrts-list/_domain/types"
// import { Supplier } from "@/entities/supplier/_domain/types"
// import { useAddOrUpdateProduct } from "@/entities/stock-personal.ts/api/personal-stock.queries"
// import { FormEroor } from "@/shared/ui/form-error"
// import { FormSuccess } from "@/shared/ui/form-success"
// import { addOrUpdateProductDto } from "@/entities/stock-personal.ts/dto/add-stock-item.dto"

// export function UpdateFromForm({
//   supplier,
//   accessToken,
// }: {
//   supplier: Supplier
//   accessToken: string
// }) {
//   const {
//     mutate: addOrUpdateProduct,
//     isPending,
//     isError,
//     error: resError,
//     data,
//   } = useAddOrUpdateProduct()

//   const form = useForm({
//     resolver: zodResolver(createProductFormSchema),
//     defaultValues: {
//       sku: "",
//       name: "",
//       description: "",
//       quantity: "",
//     },
//   })

//   const onSubmit = (values: addOrUpdateProductCommand) => {
//     const data: addOrUpdateProductDto = [
//       {
//         ...values,
//       },
//     ]

//     addOrUpdateProduct({ data, accessToken })
//   }

//   return (
//     <Card className="w-[320px] ">
//       <CardHeader>
//         <CardTitle>Добавить товар на склад</CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-col gap-y-3">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//             <FormField
//               control={form.control}
//               name="sku"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel htmlFor="skuInput">Артикул </FormLabel>
//                   <FormControl>
//                     <Input id="skuInput" placeholder="артикул..." {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel htmlFor="nameInput">Название </FormLabel>
//                   <FormControl>
//                     <Input
//                       id="nameInput"
//                       placeholder="название..."
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel htmlFor="descInput">Описание</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       id="descInput"
//                       placeholder="описание..."
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="quantity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel htmlFor="qtyInput">Количество </FormLabel>
//                   <FormControl>
//                     <Input
//                       id="qtyInput"
//                       type="number"
//                       placeholder="0"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {data?.messages?.[0]?.property === "ok" && (
//               <p className="mb-2 rounded-lg bg-green-300 px-3 py-3 text-center text-xs ">
//                 {data?.messages?.[0]?.message}
//               </p>
//             )}
//             {data?.messages?.[0]?.property === "warning" ? (
//               <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
//                 {data?.messages?.[0]?.message}
//               </p>
//             ) : isError ? (
//               <p className="rounded-lg bg-red-200 px-3 py-3 text-center text-xs ">
//                 {resError.message}
//               </p>
//             ) : (
//               ""
//             )}
//             <Button className="w-full" type="submit" disabled={isPending}>
//               Добавить
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   )
// }
