import { LoginForm } from "@/features/auth/components/login-form"

export const LoginRoute = () => {
  return (
    <>
      <div className="font-medium text-xl mb-4">ログイン</div>
      <LoginForm />
    </>
  )
}