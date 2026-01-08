import { toast } from "@/components/ui/use-toast"
import { RegisterForm } from "@/features/auth/components/register-form"
import { useNavigate } from "react-router-dom"

export const RegisterRoute = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="font-medium text-xl mb-4">新規登録</div>
      <RegisterForm onSuccess={() => {
        toast({description: "登録しました"})
        navigate("/login")
      }} />
    </>
  )
}