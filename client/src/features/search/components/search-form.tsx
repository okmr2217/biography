import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSearchForm } from "@/features/search/hooks/use-search-form"
import { useSearchParams } from "react-router-dom"

export const SearchForm = () => {
  const [_, setSearchParams] = useSearchParams()
  const { form, onSubmit } = useSearchForm(setSearchParams)

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField control={form.control} name="text" render={({ field }) => (
            <Input {...field} placeholder="テキストを入力して検索" />
          )} />
          <div className="text-end">
            <Button size="sm" type="submit">検索</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}