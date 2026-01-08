import { AuthLayout } from "@/features/auth/routes/auth-layout";
import { LoginRoute } from "@/features/auth/routes/login";
import { RegisterRoute } from "@/features/auth/routes/register";
import { PostRoute } from "@/features/posts/routes/post";
import { PostsRoute } from "@/features/posts/routes/posts";
import { UserRoute } from "@/features/users/routes/user";
import { EditUserRoute } from "@/features/users/routes/edit-user";
import { Layout } from "@/routes/layout";
import { Protected } from "@/routes/protected";
import { Public } from "@/routes/public";
import { createBrowserRouter } from "react-router-dom";
import { FollowersFollowingsRoute } from "@/features/users/routes/followers-followings";
import { NotificationsRoute } from "@/features/notifications/routes/notifications";
import { MessagesRoute } from "@/features/messages/routes/messages";
import { RoomRoute } from "@/features/messages/routes/room";
import { LikersRoute } from "@/features/posts/routes/likers";
import { SearchRoute } from "@/features/search/routes/search";

export const router = createBrowserRouter([
  {
    element: <Public />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterRoute />
          },
          {
            path: "/login",
            element: <LoginRoute />
          },
        ]
      }
    ]
  },
  {
    element: <Protected />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/users/:userId",
            children: [
              {
                path: "",
                element: <UserRoute />,
              },
              {
                path: "edit",
                element: <EditUserRoute />
              },
              {
                path: "followers",
                element: <FollowersFollowingsRoute />
              },
              {
                path: "followings",
                element: <FollowersFollowingsRoute />
              },
              {
                path: "notifications",
                element: <NotificationsRoute />
              },
              {
                path: "messages",
                element: <MessagesRoute />
              },
            ]
          },
          {
            path: "/search/posts",
            element: <SearchRoute />
          },
          {
            path: "/search/users",
            element: <SearchRoute />
          },
          {
            path: "/rooms/:roomId",
            element: <RoomRoute />
          },
          {
            path: "/posts/:postId",
            children: [
              {
                path: "",
                element: <PostRoute />,
              },
              {
                path: "likers",
                element: <LikersRoute />
              },
            ]
          },
          {
            path: "/",
            element: <PostsRoute />
          },
        ]
      }
    ]
  }
])
