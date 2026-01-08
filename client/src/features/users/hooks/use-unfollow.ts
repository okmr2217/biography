import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useUnfollow = (onSuccess: () => void) => {
  const mutation = useMutation({
    mutationFn: ({followeeId, followerId}: {
      followeeId: string,
      followerId: string
    }) => api.post(`/users/${followerId}/unfollow`, {
      followee_id: followeeId
    }),
    onSuccess: onSuccess
  })

  return mutation
}