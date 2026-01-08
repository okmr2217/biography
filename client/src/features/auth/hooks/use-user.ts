import { UserType } from "@/features/users/types"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
  return useQuery({
    queryKey: ["loginUser"],
    queryFn: () => api.get<UserType>(`/user`).then(res => res.data),
    staleTime: Infinity,
    retry: false
  })
}