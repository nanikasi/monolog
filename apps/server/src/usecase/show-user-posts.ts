import type { PostRepository } from "../domain/repository/post-repository";
import { ID } from "../domain/value-object/id";

type ShowUserPostsInput = {
  id: string;
  start?: string;
  limit?: number;
};

type ShowUserPostsOutput = {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}[];

export async function showUserPosts(
  repositories: {
    postRepository: PostRepository;
  },
  input: ShowUserPostsInput,
): Promise<ShowUserPostsOutput> {
  const posts = await repositories.postRepository.list(
    input.limit ?? 50,
    new ID(input.id),
    input.start ? new ID(input.start) : undefined,
  );

  const showUserPostsOutput = posts.map((post) => {
    return {
      id: post.identity().value(),
      content: post.content,
      authorId: post.authorId.value(),
      createdAt: post.createdAt.toISOString(),
    };
  });

  return showUserPostsOutput;
}
