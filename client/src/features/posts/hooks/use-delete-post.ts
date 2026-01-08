import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useDeletePost = (onSuccess: () => void, postId: string) => {
  const mutation = useMutation({
    mutationFn: () => api.delete(`/posts/${postId}`),
    onSuccess: onSuccess
  })
  
  return mutation
}
