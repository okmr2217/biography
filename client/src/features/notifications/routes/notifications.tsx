import { PageHeading } from "@/components/ui/page-heading";
import { NotificationsList } from "@/features/notifications/components/notifications-list";
import { NotificationType } from "@/features/notifications/types";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const NotificationsRoute = () => {
  const { userId } = useParams();
  
  const { data: notifications } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => api.get<NotificationType[]>(`/users/${userId}/notifications`).then(res => {
      queryClient.invalidateQueries({queryKey: ["loginUser"]})
      return res.data
    })
  })

  return notifications ? (
    <div className="p-4">
      <PageHeading>通知</PageHeading>
      <NotificationsList notifications={notifications} />
    </div>
  ) : <>loading...</>
}