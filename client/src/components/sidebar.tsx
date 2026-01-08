import { SidebarMenu } from "@/components/sidebar-menu"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icon } from "@/features/users/components/icon"
import { cn } from "@/lib/utils"
import { Link, NavLink } from "react-router-dom"
import { Bell, Home, MessageSquare, Search, User } from "lucide-react"
import { useUser } from "@/features/auth/hooks/use-user"

export const Sidebar = () => {
  const { data: loginUser } = useUser();

  const navLinks = [
    {
      title: "ホーム",
      to: "/",
      icon: <Home />
    },
    {
      title: "プロフィール",
      to: `/users/${loginUser?.id}`,
      icon: <User />,
      end: true
    },
    {
      title: loginUser?.unread_notifications_count
        ? `通知[${loginUser?.unread_notifications_count}]`
        : "通知",
      to: `/users/${loginUser?.id}/notifications`,
      icon: (
        <div className="relative">
          <Bell />
          {!!loginUser?.unread_notifications_count && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          )}
        </div>
      )
    },
    {
      title: loginUser?.unread_messages_count
        ? `メッセージ[${loginUser?.unread_messages_count}]`
        : "メッセージ",
      to: `/users/${loginUser?.id}/messages`,
      icon: (
        <div className="relative">
          <MessageSquare />
          {!!loginUser?.unread_messages_count && (
            <span className="absolute top-0 right-0 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          )}
        </div>
      )
    },
    {
      title: "検索",
      to: `/search/posts`,
      icon: <Search />
    },
  ]

  return loginUser && (
    <div className="hidden sm:flex fixed top-0 h-screen w-[280px] border-r px-2 py-8 flex-col justify-between">
      <div className="">
        <div className="text-3xl font-semibold mb-8">
          <Link to="/">Biography5</Link>
        </div>
        <div className="space-y-4">
          {navLinks.map((navLink, index) => (
            <NavLink end={navLink.end} to={navLink.to} key={index} className={({isActive}) => buttonVariants({
              variant: "link",
              className: cn(["!justify-normal w-full text-xl", isActive ? "font-bold underline" : "font-normal"])
            })}>
              <span className="me-2">{navLink.icon}</span>
              {navLink.title}
            </NavLink>
          ))}
        </div>
      </div>
      <SidebarMenu>
        <Button variant="ghost" className="w-full h-14 gap-4 justify-normal">
          <Icon icon_file={loginUser.icon_file} className="w-10 h-10" />
          {loginUser.name}
        </Button>
      </SidebarMenu>
    </div>
  )
}