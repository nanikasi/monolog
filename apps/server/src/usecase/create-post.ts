import { Post } from "../domain/model/post";
import type { PostRepository } from "../domain/repository/post-repository";
import type { UserRepository } from "../domain/repository/user-repository";
import { ID } from "../domain/value-object/id";
import { UsecaseError } from "./usecase-error";

type CreatePostInput = {
  authorId: string;
  content: string;
};

type CreatePostOutput = {
  id: string;
};

export async function createPost(
  repositories: {
    userRepository: UserRepository;
    postRepository: PostRepository;
  },
  input: CreatePostInput,
): Promise<CreatePostOutput> {
  const author = await repositories.userRepository.findBy(
    new ID(input.authorId),
  );
  if (!author) {
    throw new UsecaseError(400, "Author Not Found");
  }

  const newPost = Post.new({
    content: input.content,
    authorId: new ID(input.authorId),
  });
  repositories.postRepository.save(newPost);

  return { id: newPost.identity().value() };
}
