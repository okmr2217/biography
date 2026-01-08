import { UsersList } from "@/features/users/components/users-list";
import { UserType } from "@/features/users/types";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Followers = ({userId}: {
  userId: string
}) => {
  const { data: followers } = useQuery({
    queryKey: ["followers", userId],
    queryFn: () => api.get<UserType[]>(`/users/${userId}/followers`).then(res => res.data)
  })

  return followers ? (
    <UsersList users={followers} />
  ) : <>loading...</>
}