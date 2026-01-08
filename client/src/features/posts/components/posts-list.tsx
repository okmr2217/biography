import { PostCard } from "@/features/posts/components/post-card"
import { PostType } from "@/features/posts/types"

export const PostsList = ({posts, invalidate}: {
  posts: PostType[],
  invalidate: () => Promise<void>,
}) => {
  return (
    <div className="p-4 space-y-6">
      {posts.map(post => (
        <PostCard
          post={post}
          key={post.id}
          invalidate={invalidate}
        />
      ))}
    </div>
  )
}