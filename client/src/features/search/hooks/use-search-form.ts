import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { SetURLSearchParams } from "react-router-dom"
import { z } from "zod"

const formSchema = z.object({
  text: z.string().min(1)
})

type FromDataType = z.infer<typeof formSchema>

export const useSearchForm = (setSearchParams: SetURLSearchParams) => {
  const form = useForm<FromDataType>({
    defaultValues: { text: "" },
    resolver: zodResolver(formSchema)
  })

  const onSubmit: SubmitHandler<FromDataType> = (formData) => {
    setSearchParams({text: formData.text})
  }

  return { form, onSubmit }
}