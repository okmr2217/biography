import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useLogout } from "@/features/auth/hooks/use-logout"
import { useUser } from "@/features/auth/hooks/use-user"
import { useNavigate } from "react-router-dom"

export const SidebarMenu = ({children}: {
  children: React.ReactNode
}) => {
  const { mutate: logout } = useLogout()

  const { data: loginUser } = useUser()

  const navigate = useNavigate()

  return loginUser ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>メニュー</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate(`/users/${loginUser.id}/edit`)}>プロフィールを編集</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>ログアウト</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : 'loading'
}