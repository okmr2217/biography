import { Bottombar } from "@/components/bottombar"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <Bottombar />
      <div className="relative py-[calc(60px+0.5rem)] sm:py-0 sm:ml-[280px] sm:w-[600px]">
        <Outlet />
      </div>
    </div>
  )
}