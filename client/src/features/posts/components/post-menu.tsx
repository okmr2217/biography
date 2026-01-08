import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@/features/auth/hooks/use-user"
import { useDeletePost } from "@/features/posts/hooks/use-delete-post"
import { PostType } from "@/features/posts/types"
import { Ellipsis } from "lucide-react"

export const PostMenu = ({post, invalidate}: {
  post: PostType,
  invalidate: () => Promise<void>
}) => {
  const { mutate: deleteFn } = useDeletePost(() => {
    toast({description: "投稿を削除しました"})
    invalidate()
  }, post.id)

  const { data: loginUser } = useUser()
  
  return loginUser && (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis className="w-4 h-4 sm:w-6 sm:h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>メニュー</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {post.user.id === loginUser.id && (
          <DropdownMenuItem onClick={() => deleteFn()}>削除</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}