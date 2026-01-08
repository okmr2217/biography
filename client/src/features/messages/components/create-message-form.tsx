import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useCreateMessageForm } from "@/features/messages/hooks/use-create-message-form"

export const CreateMessageForm = ({onSuccess, roomId}: {
  roomId: string,
  onSuccess: () => void
}) => {
  const { form, onSubmit } = useCreateMessageForm(onSuccess, roomId)

  return (
    <div className="fixed bottom-[calc(60px)] sm:bottom-0 left-0 right-0 sm:ml-[280px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-2 bg-white border-t">
          <FormField control={form.control} name="text" render={({ field }) => (
            <Textarea cols={32} rows={1} {...field} className="" placeholder="テキスト" />
          )} />
          <div className="text-end">
            <Button size="sm" type="submit">送信</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}