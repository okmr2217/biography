import { useUser } from "@/features/auth/hooks/use-user"
import { Navigate, Outlet } from "react-router-dom"

export const Public = () => {
  const { isSuccess } = useUser()

  return isSuccess ? <Navigate to="/posts/create" /> : <Outlet />
}