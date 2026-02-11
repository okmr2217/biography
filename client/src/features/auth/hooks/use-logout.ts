import { toast } from "@/components/ui/use-toast"
import { api, removeToken } from "@/lib/api"
import { queryClient } from "@/lib/queryClient"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () => api.post("../logout"),
    onSuccess: () => {
      // トークンを削除
      removeToken()
      // キャッシュをクリア
      queryClient.setQueryData(["loginUser"], null)
      queryClient.invalidateQueries({queryKey: ["loginUser"]})
      toast({description: "ログアウトしました"})
      navigate("/login")
    },
    onError: () => {
      // エラーが発生してもトークンを削除してログアウト
      removeToken()
      queryClient.setQueryData(["loginUser"], null)
      navigate("/login")
    }
  })

  return mutation
}
