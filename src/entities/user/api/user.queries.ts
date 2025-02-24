import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

import { updateUser } from "./update-user"
import { UpdateUserDto } from "../dto/update-user.dto"
import { getUserById } from "./get-user-by-id"
import { getAllUsers } from "./get-all-users"
import { getAllUsersDto } from "../dto/get-all-users.dto"

export const useGetAllUsers = ({ accessToken, data }: {
  accessToken: string,
  data: getAllUsersDto
}) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers({ accessToken, data }),
    placeholderData: keepPreviousData,
  })
}

export const useUpdateUser = () =>
  useMutation({
    mutationFn: ({ data, accessToken }: { data: UpdateUserDto; accessToken: string }) =>
      updateUser(data, accessToken),
  })


export const useGetUser = (
  userId: string,
  accessToken: string,
) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserById(userId, accessToken),
    placeholderData: keepPreviousData,
  })
}