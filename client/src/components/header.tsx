import { SidebarMenu } from "@/components/sidebar-menu"
import { Icon } from "@/features/users/components/icon"
import { useUser } from "@/features/auth/hooks/use-user";
import { HideOnScrollDown } from "@/components/ui/hide-on-scroll-down";

export const Header = () => {
  const { data: loginUser } = useUser();

  return loginUser && (
    <HideOnScrollDown>
      <header className="z-10 sm:hidden fixed top-0 bg-white w-full h-[60px] px-4 border-b flex justify-between items-center">
        <div className="text-2xl font-bold">Biography</div>
        <div className="shrink-0">
          <SidebarMenu>
            <div className="p-2">
              <Icon icon_file={loginUser.icon_file} className="w-8 h-8" />
            </div>
          </SidebarMenu>
        </div>
      </header>
    </HideOnScrollDown>
  )
}