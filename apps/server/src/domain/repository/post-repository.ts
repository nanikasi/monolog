import type { Post } from "../model/post";
import type { ID } from "../value-object/id";

export interface PostRepository {
  list(limit: number, postedBy: ID, start?: Post): Promise<Post[]>;
  findBy(id: ID): Promise<Post | null>;
  save(post: Post): Promise<void>;
  delete(post: Post): Promise<void>;
}
