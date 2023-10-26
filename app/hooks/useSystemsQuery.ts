import { UseQueryOptions, useQuery } from "@tanstack/react-query"
import { useStores } from "app/models"
import { System } from "app/models/system/system"

export const SystemsQueryKeys = {
  fetchSystems: ["fetch-system"] as const,
}

export function useSystemsQuery(option?: UseQueryOptions<System[]>) {
  const { systemStore } = useStores()
  return useQuery<System[], Error>({
    queryKey: SystemsQueryKeys.fetchSystems,
    queryFn: systemStore.fetchSystems,
    staleTime: 0, // 3 mins
    ...option,
  })
}
