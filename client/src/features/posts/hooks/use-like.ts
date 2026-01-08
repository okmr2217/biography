import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useLike = (onSuccess: () => void) => {
  const mutation = useMutation({
    mutationFn: ({postId, userId}: {
      postId: string,
      userId: string
    }) => api.post(`/users/${userId}/like`, {post_id: postId}),
    onSuccess: onSuccess
  })
  
  return mutation
}
