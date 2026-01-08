import { Button } from "@/components/ui/button"
import { FieldWrapper } from "@/components/ui/field-wrapper"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRegisterForm } from "@/features/auth/hooks/use-register-form"
import { Link } from "react-router-dom"

export const RegisterForm = ({onSuccess}: {
  onSuccess: () => void
}) => {
  const { form, onSubmit } = useRegisterForm(onSuccess);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
            <FieldWrapper label="ユーザー名">
              <Input {...field} />
            </FieldWrapper>
          )}
        />
        <FormField control={form.control} name="email" render={({ field }) => (
            <FieldWrapper label="メールアドレス">
              <Input {...field} />
            </FieldWrapper>
          )}
        />
        <FormField control={form.control} name="password" render={({ field }) => (
            <FieldWrapper label="パスワード">
              <Input type="password" {...field} />
            </FieldWrapper>
          )}
        />
        <FormField control={form.control} name="password_confirmation" render={({ field }) => (
            <FieldWrapper label="パスワード（再入力）">
              <Input type="password" {...field} />
            </FieldWrapper>
          )}
        />
        <div className="flex justify-between items-end">
          <Button type="submit">登録</Button>
          <Link to="/login" className="text-sm font-medium text-blue-600 underline">ログイン</Link>
        </div>
      </form>
    </Form>
  )
}