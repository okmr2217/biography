import { PageHeading } from "@/components/ui/page-heading";
import { UsersList } from "@/features/users/components/users-list";
import { UserType } from "@/features/users/types";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const LikersRoute = () => {
  const { postId } = useParams()

  const { data: likers } = useQuery({
    queryKey: ["likers", postId],
    queryFn: () => api.get<UserType[]>(`/posts/${postId}/likers`).then(res => res.data)
  })

  return likers ? (
    <div className="p-4">
      <PageHeading>いいねした人</PageHeading>
      <UsersList users={likers} />
    </div>
  ) : <>loading...</>
}