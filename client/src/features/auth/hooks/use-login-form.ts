import { toast } from "@/components/ui/use-toast"
import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.string()
})

type Inputs = z.infer<typeof formSchema>

export const useLoginForm = () => {
  const navigate = useNavigate()

  const form = useForm<Inputs>({
    defaultValues: {
      email: "", password: "", remember: "1"
    },
    resolver: zodResolver(formSchema)
  });
  
  const mutation = useMutation({
    mutationFn: async (data: Inputs) => {
      await api.get('../sanctum/csrf-cookie')
      return api.post("../login", data)
    },
    onSuccess: () => {
      toast({description: "ログインしました"})
      navigate("/")
    },
    onError: () => {
      toast({variant: "destructive", description: "ログインできませんでした"})
    }
  })
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  }

  return { form, onSubmit }
}
