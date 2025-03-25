"use client"

import { SupplierSchema } from "@/entities/supplier/_domain/schemas"
import {
  useCreateSupplier,
  useGetSupplier,
  useUpdateSupplier,
} from "@/entities/supplier/api/supplier.queries"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form"
import { FormEroor } from "@/shared/ui/form-error"
import { FormSuccess } from "@/shared/ui/form-success"
import { Input } from "@/shared/ui/input"
import { Spinner } from "@/shared/ui/spinner"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { z } from "zod"
import { useMask } from "@react-input/mask"
import CityInput from "../update-profile/_ui/city-input"
import RegionInput from "../update-profile/_ui/region-input"
import CountryInput from "../update-profile/_ui/country-input"
import { ChangeSupplierDto } from "@/entities/supplier/dto"
import { SquareArrowOutUpRightIcon } from "@/shared/icons/square-arrow-out-up-right-icon"

const UpdateSupplierForm = ({
  userId,
  accessToken,
}: {
  userId: string
  accessToken: string
}) => {
  const siteUrlRef = useMask({
    mask: "https://_____________________________________",
    replacement: { _: /[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]/ },
  })

  const vkUrlRef = useMask({
    mask: "https://_____________________________________",
    replacement: { _: /[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=%-]/ },
  })

  const phoneWorkRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  })

  const phoneMobileRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  })

  const whatsappRef = useMask({
    mask: "+7 (___) ___-__-__",
    replacement: { _: /\d/ },
  })

  const {
    mutate: createSupplier,
    isPending: isCreateLoading,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
  } = useCreateSupplier()

  const {
    mutate: updateSupplier,
    isPending: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useUpdateSupplier()

  const { data: supplier, isPending } = useGetSupplier(userId, accessToken)
  console.log("supplier ==> ", supplier)

  const form = useForm<z.infer<typeof SupplierSchema>>({
    resolver: zodResolver(SupplierSchema),
    defaultValues: {
      name: supplier?.name || "",
      email: supplier?.email || "",
      siteUrl: supplier?.siteUrl || "",
      phoneWork: supplier?.phoneWork || "", // Новые поля
      phoneMobile: supplier?.phoneMobile || "",
      telegramAccount: supplier?.telegramAccount || "",
      whatsappNumber: supplier?.whatsappNumber || "",
      vkProfile: supplier?.vkProfile || "",
      logoUrl: supplier?.logoUrl || "",
      address: {
        street: supplier?.address?.street || "",
        house: supplier?.address?.house || "",
        city: {
          name: supplier?.address?.city.name || "",
          id: supplier?.address?.city.id,
          region: {
            name: supplier?.address?.city.region.name || "",
            country: {
              name: supplier?.address?.city.region.country.name || "",
            },
          },
        },
      },
    },
  })

  useEffect(() => {
    form.reset({
      name: supplier?.name || "",
      email: supplier?.email || "",
      siteUrl: supplier?.siteUrl || "",
      phoneWork: supplier?.phoneWork || "",
      phoneMobile: supplier?.phoneMobile || "",
      telegramAccount: supplier?.telegramAccount || "",
      whatsappNumber: supplier?.whatsappNumber || "",
      vkProfile: supplier?.vkProfile || "",
      logoUrl: supplier?.logoUrl || "",
      address: {
        street: supplier?.address?.street || "",
        house: supplier?.address?.house || "",
        city: {
          name: supplier?.address?.city.name || "",
          id: supplier?.address?.city.id,
          region: {
            name: supplier?.address?.city.region.name || "",
            country: {
              name: supplier?.address?.city.region.country.name || "",
            },
          },
        },
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier])

  const onSubmit = (values: z.infer<typeof SupplierSchema>) => {
    console.log("values ==> ", values)
    const requestData: ChangeSupplierDto = {
      ...values,
      address: {
        street: values?.address?.street,
        house: values?.address?.house,
        city: {
          name: values?.address?.city?.name || "",
          id: values?.address?.city?.id || 0,
        },
      },
    }

    if (supplier) {
      updateSupplier({ userId, accessToken, values: requestData })
    } else {
      createSupplier({ userId, accessToken, values })
    }
  }

  const onError = (errors: any) => {
    console.error("Form errors:", errors)
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          {isPending ? (
            <div className="flex items-center justify-center">
              <Spinner />
              {/* <span>Загрузка...</span> */}
            </div>
          ) : !supplier ? (
            <div>
              <h3 className="text-center text-lg font-bold text-destructive">
                Поставщик не найден!
              </h3>
              <p className="text-center text-xs">
                Укажите данные вашей компании и нажмите на кнопку
                &quot;Сохранить&quot;
              </p>
            </div>
          ) : (
            <div>
              <h3 className="mb-2 text-center text-lg font-bold">
                {supplier.name}
              </h3>
              <p className="text-center text-sm ">
                Активный тариф:{" "}
                <span>{supplier?.subscription?.tariff.name}</span>{" "}
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
              <div className="mb-5 grid gap-x-3 gap-y-8 lg:grid-cols-2 xl:grid-cols-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Поставщик</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Укажите вашу фирму "
                          disabled={isCreateLoading || isUpdateLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Почта для запросов</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Куда отправлять заявки?"
                          disabled={isCreateLoading || isUpdateLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="siteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Адрес сайта</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          ref={siteUrlRef}
                          type="text"
                          placeholder="site.ru (опционально)"
                          disabled={isCreateLoading || isUpdateLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {supplier && (
                  <>
                    <FormField
                      control={form.control}
                      name="phoneWork"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон рабочий</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              ref={phoneWorkRef}
                              placeholder="+7 (000) 000-00-00 (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneMobile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Телефон мобильный</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              ref={phoneMobileRef}
                              placeholder="+7 (000) 000-00-00 (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telegramAccount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Аккаунт Telegram</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Telegram аккаунт (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsappNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Номер WhatsApp</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              ref={whatsappRef}
                              placeholder="+7 (000) 000-00-00 (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vkProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Профиль VK</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              ref={vkUrlRef}
                              placeholder="Ссылка на VK (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.city.region.country.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Страна</FormLabel>
                          <FormControl>
                            <CountryInput field={field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.city.region.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Регион</FormLabel>
                          <FormControl>
                            <RegionInput field={field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Город</FormLabel>
                          <FormControl>
                            <CityInput
                              field={field}
                              // placeholder=" (опционально)"
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Улица</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Улица (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.house"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>№ дома</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="№ дома (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ссылка на изображение</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Ссылка (опционально)"
                              disabled={isCreateLoading || isUpdateLoading}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormEroor
                  message={
                    isCreateError || isUpdateError ? "Что-то пошло не так" : ""
                  }
                />
                <FormSuccess
                  message={isCreateSuccess || isUpdateSuccess ? "Успешно" : ""}
                />
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={isCreateLoading || isUpdateLoading}
                className="w-[120px]"
              >
                {isCreateLoading
                  ? "Создание..."
                  : isUpdateLoading
                    ? "Обновление..."
                    : "Сохранить"}
              </Button>
            </form>
          </FormProvider>
          {isCreateSuccess || isUpdateSuccess ? (
            <Link
              className="flex w-fit items-center text-destructive transition-colors hover:text-primary"
              href="/personal-stock"
            >
              {" "}
              <SquareArrowOutUpRightIcon className="mr-2" />
              <span className="my-5">Редактировать склад</span>
            </Link>
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateSupplierForm
