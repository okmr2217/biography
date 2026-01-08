import { UserType } from "@/features/users/types"

export type PostType = {
  id: string,
  text: string,
  user: UserType,
  children_count: number,
  likers_count: number,
  like?: LikeType,
  image_file?: string,
  parent?: PostType,
  children?: PostType[],
  created_at: string
}

export type LikeType = {
  id: string,
  user_id: string,
  post_id: string
}
