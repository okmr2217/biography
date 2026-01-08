import { api } from "@/lib/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  text: z.string().min(1),
  image_file: z.custom<FileList>(),
  parent_id: z.number().optional()
})

type Inputs = z.infer<typeof formSchema>

const requestConfig = {
  headers: {
    "Content-Type": "multipart/form-data"
  }
}

export const useCreatePostForm = (onSuccess: () => void, parentId?: string) => {
  const form = useForm<Inputs>({
    defaultValues: {
      text: "", image_file: undefined, parent_id: parentId ? Number(parentId) : undefined
    },
    resolver: zodResolver(formSchema)
  });
  
  const mutation = useMutation({
    mutationFn: async (data: Inputs) => api.post("/posts", data, requestConfig),
    onSuccess: () => {
      onSuccess();
      form.reset();
      form.resetField("image_file");
    }
  })
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    mutation.mutate(data);
  }

  return { form, onSubmit }
}
