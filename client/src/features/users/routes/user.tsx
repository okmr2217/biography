import { PostsList } from "@/features/posts/components/posts-list"
import { PostType } from "@/features/posts/types"
import { UserProfile } from "@/features/users/components/user-profile"
import { UserType } from "@/features/users/types"
import { api } from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

type DataType = {
  user: UserType,
  posts: PostType[]
}

export const UserRoute = () => {
  const { userId } = useParams();
  
  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.get<DataType>(`/users/${userId}`).then(res => res.data)
  })

  const invalidate = () => queryClient.invalidateQueries({queryKey: ["user", userId]})

  return data ? (
    <div className="">
      <UserProfile user={data.user} invalidate={invalidate} />
      <PostsList posts={data.posts} invalidate={invalidate} />
    </div>
  ) : "loading"
}