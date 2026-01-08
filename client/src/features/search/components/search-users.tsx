import { UsersList } from "@/features/users/components/users-list"
import { UserType } from "@/features/users/types"
import { SearchForm } from "@/features/search/components/search-form"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const SearchUsers = () => {
  const [searchParasms] = useSearchParams()

  const text = searchParasms.get("text") ?? "";

  const { data: users } = useQuery({
    queryFn: () => api.get<UserType[]>(`/users?name=${text}`).then(res => res.data),
    queryKey: ["users", text]
  })

  return users ? (
    <div className="">
      <SearchForm />
      <UsersList users={users} />
    </div>
  ): <>loading...</>
}