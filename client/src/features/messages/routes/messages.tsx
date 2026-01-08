import { PageHeading } from "@/components/ui/page-heading"
import { RoomsList } from "@/features/messages/components/rooms-list";
import { RoomType } from "@/features/messages/types";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export const MessagesRoute = () => {
  const { userId } = useParams()

  const { data: rooms } = useQuery({
    queryKey: ["rooms", userId],
    queryFn: () => api.get<RoomType[]>(`/users/${userId}/rooms`).then(res => res.data)
  })

  return rooms && (
    <div className="p-4">
      <PageHeading>メッセージ</PageHeading>
      <RoomsList rooms={rooms} />
    </div>
  )
}