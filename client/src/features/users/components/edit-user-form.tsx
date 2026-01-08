import { Button } from "@/components/ui/button"
import { FieldWrapper } from "@/components/ui/field-wrapper"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icon } from "@/features/users/components/icon"
import { useEditUserForm } from "@/features/users/hooks/use-edit-user-form"
import { UserType } from "@/features/users/types"
import { useImagePreview } from "@/hooks/useImagePreview"

export const EditUserForm = ({user}: {
  user: UserType
}) => {
  const { form, onSubmit } = useEditUserForm(user);

  const { preview, handleImageChange } = useImagePreview(user.icon_file);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
            <FieldWrapper label="ユーザー名">
              <Input {...field} />
            </FieldWrapper>
          )}
        />
        <FormField control={form.control} name="bio" render={({ field }) => (
            <FieldWrapper label="プロフィール文">
              <Input {...field} />
            </FieldWrapper>
          )}
        />
        <FormField control={form.control} name="icon_file" render={({ field: {onChange} }) => (
            <FieldWrapper label="アイコン">
              <>
                <Icon className="w-16 h-16" icon_file={preview} />
                <Input type="file" accept="image/*" onChange={(e) => {
                  onChange(e.target.files)
                  handleImageChange(e)
                }} />
              </>
            </FieldWrapper>
          )}
        />
        <Button type="submit">保存</Button>
      </form>
    </Form>
  )
}