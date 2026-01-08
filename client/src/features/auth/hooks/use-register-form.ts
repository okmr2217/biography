import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  password_confirmation: z.string().min(1)
}).refine(data => data.password === data.password_confirmation, {
  message: "再入力のパスワードが異なります",
  path: ["password_confirmation"]
})

type Inputs = z.infer<typeof formSchema>

export const useRegisterForm = (onSuccess: () => void) => {
  const form = useForm<Inputs>({
    defaultValues: {
      name: "", email: "", password: "", password_confirmation: ""
    },
    resolver: zodResolver(formSchema)
  });
  
  const mutation = useMutation({
    mutationFn: async (data: Inputs) => {
      await api.get('../sanctum/csrf-cookie')
      return api.post("../register", data)
    },
    onSuccess: onSuccess
  })
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  }

  return { form, onSubmit }
}
