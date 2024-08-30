import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { redirect, useLoaderData } from "@remix-run/react";
import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Heading,
  InfiniteScrollArea,
  Loading,
  Stack,
  Text,
} from "@yamada-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { authenticator } from "~/service/auth.server";
import { getEnv } from "~/service/contextEnv";

export const meta: MetaFunction = () => {
  return [
    { title: "みんなひとりごと" },
    {
      name: "description",
      content: "Welcome to monolog",
    },
  ];
};

export async function loader({ params, request, context }: LoaderFunctionArgs) {
  const env = getEnv(context);
  const user = await authenticator(env).isAuthenticated(request);
  if (!user) {
    return redirect("/");
  }

  const response = await fetch(
    `${context.cloudflare.env.SERVER_URL}/api/user/${params.id}/posts?start=1&limit=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.idToken}`,
      },
    },
  );

  if (!response.ok) {
    return { initialPosts: [], user: user };
  }

  const initialPosts = (await response.json()) as Post[];
  return { initialPosts: initialPosts, user: user };
}

export type Post = {
  id: string;
  content: string;
  authorID: string;
  createdAt: string;
};

export default function Index() {
  const { initialPosts, user } = useLoaderData<typeof loader>();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  dayjs.extend(relativeTime);

  return (
    <Stack direction="column">
      <Flex direction="column">
        <Flex pt="sm" justify="center">
          <Avatar size="sm" name="Hirotomo Yamada" mr="sm">
            <AvatarBadge bg="secondary" placement="top-start" />
          </Avatar>
          <Heading as="h3" size="lg">
            {user.id}
          </Heading>
        </Flex>
        <Divider pt="sm" />
      </Flex>
      <InfiniteScrollArea
        onLoad={async ({ index, finish }) => {
          const response = await fetch(
            `/api/user/${user.id}/posts/load?limit=${50}&start=${posts[posts.length - 1].id}`,
          );

          if (!response.ok) {
            finish();
            return;
          }
          const newPosts = (await response.json()) as Post[];
          if (!newPosts || newPosts.length === 0) {
            finish();
            return;
          }

          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
          // finish();
        }}
        loading={<Loading fontSize="2xl" />}
      >
        {posts.map((post, index) => (
          <Box key={post.id} mx="lg">
            <Text fontSize="sm" color="gray.300">
              {dayjs(post.createdAt).fromNow()}
            </Text>
            <Text fontSize="lg">{post.content}</Text>
          </Box>
        ))}
      </InfiniteScrollArea>
    </Stack>
  );
}
