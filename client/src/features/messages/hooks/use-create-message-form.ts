import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  text: z.string().min(1)
})

type FromDataType = z.infer<typeof formSchema>

export const useCreateMessageForm = (onSuccess: () => void, roomId: string) => {
  const form = useForm<FromDataType>({
    defaultValues: { text: "" },
    resolver: zodResolver(formSchema)
  })

  const mutation = useMutation({
    mutationFn: async ({formData, roomId}: {
      formData: FromDataType,
      roomId: string
    }) => api.post(`/rooms/${roomId}/messages`, formData),
    onSuccess: () => {
      onSuccess()
      form.reset()
    }
  })

  const onSubmit: SubmitHandler<FromDataType> = (formData) => {
    mutation.mutate({formData, roomId})
  }

  return { form, onSubmit }
}