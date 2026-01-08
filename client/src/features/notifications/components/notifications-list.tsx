import { Badge } from "@/components/ui/badge"
import { NotificationType } from "@/features/notifications/types"
import { Icon } from "@/features/users/components/icon"
import { Link } from "react-router-dom"

export const NotificationsList = ({notifications}: {
  notifications: NotificationType[]
}) => {
  return (
    <div className="space-y-4">
      {notifications.map(notification => (
        <div key={notification.id} className="relative">
          <Notification notification={notification} />
          <div className="text-end text-sm">
            {notification.created_at}
          </div>
          {notification.read_at ? null : (
            <div className="absolute top-0 right-0 p-2">
              <Badge>新着</Badge>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const Notification = ({notification}: {
  notification: NotificationType
}) => {
  if (notification.type === "App\\Notifications\\Followed") {
    return (
      <Link to={`/users/${notification.notifiable_id}/followers`}>
        <Link to={`/users/${notification.data.follower_id}`}>
          <Icon className="w-10 h-10 mb-2" icon_file={notification.data.follower_icon_file} />
        </Link>
        <div className="font-medium">
          <b>{notification.data.follower_name}</b>が<b>あなた</b>をフォローしました
        </div>
      </Link>  
    )
  } else if (notification.type === "App\\Notifications\\Liked") {
    return (
      <Link to={`/posts/${notification.data.post_id}`}>
        <Link to={`/users/${notification.data.user_id}`}>
          <Icon className="w-10 h-10 mb-2" icon_file={notification.data.user_icon_file} />
        </Link>
        <div className="font-medium">
          <b>{notification.data.user_name}</b>があなたの投稿をいいねしました
        </div>
        <div className="text-sm">{notification.data.post_text}</div>
      </Link> 
    )
  }
}