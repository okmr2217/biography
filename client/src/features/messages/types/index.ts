import { UserType } from "@/features/users/types"

export type RoomType = {
  id: string,
  created_at: string,
  users: UserType[],
  unread_messages_count: number
}

export type MessageType = {
  id: string,
  text: string,
  created_at: string,
  user: UserType,
  read_at: string
}