export type NotificationType = {
  id: string,
  type: "App\\Notifications\\Followed"|"App\\Notifications\\Liked",
  notifiable_id: string,
  data: Followed&Liked,
  read_at: string,
  created_at: string
}

type Followed = {
  follower_id: string,
  follower_name: string,
  follower_icon_file: string
}

type Liked = {
  user_id: string,
  user_name: string,
  user_icon_file: string,
  post_id: string,
  post_text: string
}