import { UsersList } from "@/features/users/components/users-list";
import { UserType } from "@/features/users/types";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const Followings = ({userId}: {
  userId: string
}) => {
  const { data: followings } = useQuery({
    queryKey: ["followings", userId],
    queryFn: () => api.get<UserType[]>(`/users/${userId}/followings`).then(res => res.data)
  })

  return followings ? (
    <UsersList users={followings} />
  ) : <>loading...</>
}