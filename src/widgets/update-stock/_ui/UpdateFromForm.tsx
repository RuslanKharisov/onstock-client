"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState, useTransition } from "react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/ui/utils";
import { createProductAction } from "@/features/products-list/actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card";

const createProductFormSchema = z.object({
    sku: z.string(),
    name: z.string(),
    description: z.string(),
    quantity: z.string(),
    supplierId: z.number(),
});

export function UpdateFromForm({
    supplier,
    revalidatePagePath,
}: {
    supplier: getSupplier;
    revalidatePagePath: string;
}) {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
    const [isCreateTransiton, startCreateTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(createProductFormSchema),
        defaultValues: {
            sku: "",
            name: "",
            description: "",
            quantity: "",
            supplierId: supplier.id,
        },
    });

    const onSubmit = (data: any) => {
      startTransition(() => {
         createProductAction(data, revalidatePagePath)
         .then((data) => {
          if (data?.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
          }
        })
        .catch(() => setError("Что-то пошло не так"))
        
      })
    }

    return (
        <Card className="w-[320px] ">
            <CardHeader>
                <CardTitle>Добавить товар на склад</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-3">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="supplierId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="supplierImput" >Поставщик: {supplier.name} </FormLabel>
                                    <FormControl>
                                        <Input id="supplierImput" className=" hidden" placeholder="555" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="skuInput" >Артикул </FormLabel>
                                    <FormControl>
                                        <Input id="skuInput" placeholder="артикул..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nameInput" >Название </FormLabel>
                                    <FormControl>
                                        <Input id="nameInput" placeholder="название..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="descInput" >Описание</FormLabel>
                                    <FormControl>
                                        <Textarea id="descInput" placeholder="описание..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="qtyInput" >Количество </FormLabel>
                                    <FormControl>
                                        <Input id="qtyInput" type="number" placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isCreateTransiton}
                        >
                            Добавить
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardContent>
        { success && <h2 className="text-center bg-green-300 text-xs rounded-lg px-3 py-3 mb-2 ">{success}</h2> }
        { error && <h2 className="text-center bg-red-200 text-xs rounded-lg px-3 py-3 ">{error}</h2> }
      </CardContent>
        </Card>
    );
}
