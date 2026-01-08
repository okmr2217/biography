import { toast } from "@/components/ui/use-toast"
import { UserType } from "@/features/users/types"
import { api } from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosRequestConfig } from "axios"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1),
  bio: z.string().optional(),
  icon_file: z.custom<FileList>(),
  _method: z.string()
})

type Inputs = z.infer<typeof formSchema>

const requestConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  }
}

export const useEditUserForm = (user: UserType) => {
  const form = useForm<Inputs>({
    defaultValues: {
      name: user.name, bio: user.bio, icon_file: undefined, _method: "PUT"
    },
    resolver: zodResolver(formSchema)
  });
  
  const mutation = useMutation({
    mutationFn: async (data: Inputs) => api.post(`/users/${user.id}`, data, requestConfig),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["loginUser"]})
      toast({description: "保存しました"})
    }
  })
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    mutation.mutate(data);
  }

  return { form, onSubmit }
}
