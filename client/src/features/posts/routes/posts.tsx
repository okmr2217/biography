import { toast } from "@/components/ui/use-toast"
import { CreatePostForm } from "@/features/posts/components/create-post-form"
import { PostsList } from "@/features/posts/components/posts-list"
import { queryClient } from "@/lib/queryClient"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { PostType } from "@/features/posts/types"
import { useUser } from "@/features/auth/hooks/use-user"

export const PostsRoute = () => {
  const { data: loginUser } = useUser();
  
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get<PostType[]>(`/posts`).then(res => res.data)
  })

  const invalidate = () => queryClient.invalidateQueries({queryKey: ["posts"]})

  return (
    <div className="">
      <CreatePostForm onSuccess={() => {
        toast({description: "投稿しました"})
        invalidate()
      }} />
      {posts && loginUser
      ? <PostsList posts={posts} invalidate={invalidate} />
      : "loading"}
    </div>
  )
}