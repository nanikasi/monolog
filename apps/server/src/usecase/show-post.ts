import type { PostRepository } from "../domain/repository/post-repository";
import { ID } from "../domain/value-object/id";
import { UsecaseError } from "./usecase-error";

type ShowPostInput = {
  id: string;
};

type ShowPostOutput = {
  id: string;
  content: string;
  createdAt: Date;
};

export async function showPost(
  repositories: {
    postRepository: PostRepository;
  },
  input: ShowPostInput,
): Promise<ShowPostOutput> {
  const post = await repositories.postRepository.findBy(new ID(input.id));
  if (!post) {
    throw new UsecaseError(400, "Post Not Found");
  }

  const showPostOutput = {
    id: post.identity().value(),
    content: post.content,
    createdAt: post.createdAt,
  };

  return showPostOutput;
}
