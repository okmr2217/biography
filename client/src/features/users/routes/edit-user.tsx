import { useUser } from "@/features/auth/hooks/use-user"
import { EditUserForm } from "@/features/users/components/edit-user-form"

export const EditUserRoute = () => {
  // const { userId } = useParams();
  
  const { data: loginUser } = useUser();

  return loginUser ? (
    <EditUserForm user={loginUser} />
  ) : "loading"
}