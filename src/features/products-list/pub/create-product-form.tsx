// "use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/shared/ui/form";
// import { Input } from "@/shared/ui/input";
// import { Textarea } from "@/shared/ui/textarea";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useTransition } from "react";
// import { createProductAction } from "../actions";
// import { Button } from "@/shared/ui/button";
// import { cn } from "@/shared/ui/utils";

// // interface FormData {
// //   sku: string;
// //   name: string;
// //   description: string;
// //   quantity: string;
// //   supplierId?: string ;
// // }

// const createProductFormSchema = z.object({
//   sku: z.string(),
//   name: z.string(),
//   description: z.string(),
//   quantity: z.string(),
//   supplierId: z.number(),
// });

// export function CreateProductForm({
//   className,
//   supplier,
//   revalidatePagePath,
// }: {
//   className: string;
//   supplier: getSupplier;
//   revalidatePagePath: string;
// }) {
//    const [isCreateTransiton, startCreateTransition] = useTransition();
//   const form = useForm({
//     resolver: zodResolver(createProductFormSchema),
//     defaultValues: {
//       sku: "",
//       name: "",
//       description: "",
//       quantity: "",
//       supplierId: supplier.id,
//     },
//   });

//   const onSubmit = (data: any) => {
//      startCreateTransition(async () => {
//       createProductAction(data, revalidatePagePath);
//      });
//   };


//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className={cn(className, "space-y-4")}
//       >
//         <FormField
//           control={form.control}
//           name="supplierId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Поставщик: {supplier.name} </FormLabel>
//               <FormControl>
//                 {/* <Input placeholder="555" {...field} /> */}
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="sku"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Артикул </FormLabel>
//               <FormControl>
//                 <Input placeholder="артикул..." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Название </FormLabel>
//               <FormControl>
//                 <Input placeholder="название..." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Описание</FormLabel>
//               <FormControl>
//                 <Textarea placeholder="описание..." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="quantity"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Количество </FormLabel>
//               <FormControl>
//                 <Input type="number" placeholder="0" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button 
//         className="mt-8" 
//         type="submit" 
//          disabled={isCreateTransiton}
//         >
//           Добавить
//         </Button>
//       </form>
//     </Form>
//   );
// }
