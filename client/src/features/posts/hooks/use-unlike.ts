import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useUnlike = (onSuccess: () => void) => {
  const mutation = useMutation({
    mutationFn: ({postId, userId}: {
      postId: string,
      userId: string
    }) => api.post(`/users/${userId}/unlike`, {post_id: postId}),
    onSuccess: onSuccess
  })
  
  return mutation
}
