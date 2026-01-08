import { useUser } from "@/features/auth/hooks/use-user"
import { Navigate, Outlet } from "react-router-dom"

export const Protected = () => {
  const { isError } = useUser()

  return isError ? <Navigate to="/login" /> : <Outlet />
}