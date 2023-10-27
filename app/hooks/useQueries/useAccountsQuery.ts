import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { useStores } from "app/models"
import { User } from "app/models/users/user"
import { QueriesKeys } from "./queriesKeys"

export function useSystemsQuery(option?: UseQueryOptions<User[]>) {
  const { usersStore } = useStores()
  return useQuery<User[], Error>({
    queryKey: QueriesKeys.fetchAccounts,
    queryFn: usersStore.fetchAccounts,
    staleTime: 0, // 3 mins
    ...option,
  })
}
