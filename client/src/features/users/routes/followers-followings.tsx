import { useMatch, useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Followings } from "@/features/users/components/followings";
import { Followers } from "@/features/users/components/followers.";

export const FollowersFollowingsRoute = () => {
  const { userId } = useParams()
  const navigate = useNavigate();

  const tabDefaultValue = useMatch("/users/:userId/followers") ? "followers" : "followings"

  const tabOnValueChange = (value: string) => {
    if (value === "followers") {
      navigate(`/users/${userId}/followers`);
    } else {
      navigate(`/users/${userId}/followings`);
    }
  }

  return userId && (
    <div className="">
      <Tabs onValueChange={tabOnValueChange} defaultValue={tabDefaultValue}>
        <div className="p-4">
          <TabsList className="flex">
            <TabsTrigger value="followers">フォロワー</TabsTrigger>
            <TabsTrigger value="followings">フォロー中</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="followers"><Followers userId={userId} /></TabsContent>
        <TabsContent value="followings"><Followings userId={userId} /></TabsContent>
      </Tabs>
    </div>
  )
}