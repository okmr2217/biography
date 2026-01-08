import { toast } from "@/components/ui/use-toast"
import { api } from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()
  
  const mutation = useMutation({
    mutationFn: () => api.post("../logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["loginUser"]})
      toast({description: "ログアウトしました"})
      navigate("/login")
    }
  })
  
  return mutation
}
