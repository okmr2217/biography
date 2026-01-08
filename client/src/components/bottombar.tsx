import { NavLink } from "react-router-dom"
import { Bell, Home, MessageSquare, Search, User } from "lucide-react"
import { useUser } from "@/features/auth/hooks/use-user"

export const Bottombar = () => {
  const { data: loginUser } = useUser();

  const navLinks = [
    {
      to: "/",
      icon: <Home size={24} />
    },
    {
      to: `/users/${loginUser?.id}`,
      icon: <User size={24} />,
    },
    {
      to: `/users/${loginUser?.id}/notifications`,
      icon: (
        <div className="relative">
          <Bell size={24} />
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
      to: `/users/${loginUser?.id}/messages`,
      icon: (
        <div className="relative">
          <MessageSquare size={24} />
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
      to: `/search/posts`,
      icon: <Search />
    },
  ]

  return loginUser && (
    <div className="z-10 flex sm:hidden fixed bottom-0 w-full px-2 h-[60px] bg-white border-t justify-around items-center">
      {navLinks.map((navLink, index) => (
        <NavLink to={navLink.to} key={index} className="p-3">
          {navLink.icon}
        </NavLink>
      ))}
    </div>
  )
}