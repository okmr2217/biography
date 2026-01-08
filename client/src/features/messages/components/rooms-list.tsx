import { useUser } from "@/features/auth/hooks/use-user"
import { RoomType } from "@/features/messages/types"
import { Icon } from "@/features/users/components/icon"
import { Link } from "react-router-dom"

export const RoomsList = ({rooms}: {
  rooms: RoomType[]
}) => {
  const { data: loginUser } = useUser();

  return loginUser && (
    <div className="space-y-4">
      {rooms.map(room => (
        <div key={room.id} className="relative">
          <Link to={`/rooms/${room.id}`}>
            <div className="flex gap-2 items-center">
              <Icon
                className="w-10 h-10"
                icon_file={room.users.filter(user => user.id !== loginUser.id).map(user => user.icon_file)[0]}
              />
              <div className="font-medium">
                {room.users.filter(user => user.id !== loginUser.id).map(user => user.name)}
                {!!room.unread_messages_count && `[${room.unread_messages_count}]`}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}