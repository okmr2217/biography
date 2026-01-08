import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchPosts } from "@/features/search/components/search-posts"
import { SearchUsers } from "@/features/search/components/search-users";
import { useMatch, useNavigate } from "react-router-dom";

export const SearchRoute = () => {
  const navigate = useNavigate();

  const tabDefaultValue = useMatch("/search/posts") ? "posts" : "users"

  const tabOnValueChange = (value: string) => {
    if (value === "posts") {
      navigate(`/search/posts`);
    } else {
      navigate(`/search/users`);
    }
  }

  return (
    <div className="">
      <Tabs onValueChange={tabOnValueChange} defaultValue={tabDefaultValue}>
        <div className="p-4">
          <TabsList className="flex">
            <TabsTrigger value="posts">投稿</TabsTrigger>
            <TabsTrigger value="users">ユーザー</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="posts">
          <SearchPosts />
        </TabsContent>
        <TabsContent value="users">
          <SearchUsers />
        </TabsContent>
      </Tabs>
    </div>
  )
}