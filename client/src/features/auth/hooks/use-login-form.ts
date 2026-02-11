import { toast } from "@/components/ui/use-toast"
import { api, setToken } from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { UserType } from "@/features/users/types"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.string()
})

type Inputs = z.infer<typeof formSchema>

type LoginResponse = {
  user: UserType
  token: string
}

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
      return api.post<LoginResponse>("../login", data)
    },
    onSuccess: (response) => {
      const { user, token } = response.data
      // トークンを保存
      setToken(token)
      // ユーザー情報をキャッシュに設定
      queryClient.setQueryData(["loginUser"], user)
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
