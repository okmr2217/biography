import { PostsList } from "@/features/posts/components/posts-list"
import { PostType } from "@/features/posts/types"
import { SearchForm } from "@/features/search/components/search-form"
import { api } from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"

export const SearchPosts = () => {
  const [searchParasms] = useSearchParams()

  const text = searchParasms.get("text") ?? "";

  const { data: posts } = useQuery({
    queryFn: () => api.get<PostType[]>(`/posts?text=${text}`).then(res => res.data),
    queryKey: ["posts", text]
  })

  const invalidate = () => queryClient.invalidateQueries({queryKey: ["posts"]})

  return posts ? (
    <div className="">
      <SearchForm />
      <PostsList posts={posts} invalidate={invalidate} />
    </div>
  ): <>loading...</>
}