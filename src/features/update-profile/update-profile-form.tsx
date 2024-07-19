"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { profileSettings } from "../user/_actions/profile-settings"
import { useTransition } from "react"
import { useCurrentUser } from "@/entities/user/_vm/use-current-user-session"
import { useSession } from "next-auth/react"

const UpdateProfileForm = () => {
  const [isPending, startTransition] = useTransition()
  const { update } = useSession()

  const clientSession = useCurrentUser()
  const user = clientSession.data?.user

  const onClick = () => {
    startTransition(() => {
      profileSettings({
        name: "Ruslan",
      })
      .then(()=>{
        update()
      })
    })
  }
  return (
    <>
      <Card>
        <CardHeader>
          <h2> Данные пользователя</h2>
        </CardHeader>
        <CardContent>
          <Button disabled={isPending} onClick={onClick}>
            Обновить данные пользователя
          </Button>
        </CardContent>
      </Card>
      <br />
      <h3>Client session is</h3>
      <p>
        <span className=" font-semibold">Имя: </span>
        {user?.name}
      </p>
      <p>
        <span className=" font-semibold">Почта: </span>
        {user?.email}
      </p>
      <p>
        <span className=" font-semibold">Роль: </span>
        {user?.role}
      </p>
      <p>
        <span className=" font-semibold">Image: </span>
        {user?.image}
      </p>
    </>
  )
}

export default UpdateProfileForm
