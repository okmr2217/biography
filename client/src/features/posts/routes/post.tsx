import { toast } from "@/components/ui/use-toast"
import { CreatePostForm } from "@/features/posts/components/create-post-form"
import { PostCard } from "@/features/posts/components/post-card"
import { PostsList } from "@/features/posts/components/posts-list"
import { PostType } from "@/features/posts/types"
import { api } from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

type DataType = {
  post: PostType,
  children: PostType[]
}

export const PostRoute = () => {
  const { postId } = useParams();
  
  const { data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => api.get<DataType>(`/posts/${postId}`).then(res => res.data)
  })

  const invalidate = () => queryClient.invalidateQueries({queryKey: ["post", postId]});

  return data ? (
    <div className="">
      <div className="p-4">
        <PostCard post={data.post} invalidate={invalidate} />
      </div>
      <CreatePostForm onSuccess={() => {
        toast({description: "返信を投稿しました"})
        queryClient.invalidateQueries({queryKey: ["post", postId]})
      }} parentId={data.post.id} />
      <PostsList posts={data.children} invalidate={invalidate} />
    </div>
  ) : "loading"
}