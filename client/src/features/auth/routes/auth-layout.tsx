import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <div className="grid place-items-center h-screen bg-gradient-to-r from-indigo-500">
      <div className="bg-white p-4 w-[360px] shadow-lg rounded">
        <Outlet />
      </div>
    </div>
  )
}