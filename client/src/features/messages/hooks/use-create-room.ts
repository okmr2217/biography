import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query"

export const useCreateRoom = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({userId, users}: {
      userId: string,
      users: string[]
    }) => api.post(`/users/${userId}/rooms`, {
      users: users
    }),
    onSuccess: onSuccess
  })
}