import { Post } from "../../../domain/model/post";
import type { PostRepository } from "../../../domain/repository/post-repository";
import { ID } from "../../../domain/value-object/id";

export class MemoryPostRepositoryImpl implements PostRepository {
  private memory: Post[];

  constructor() {
    this.memory = [
      new Post({
        id: new ID("1"),
        content: "This is first",
        authorId: new ID("a"),
        createdAt: new Date(),
      }),
      new Post({
        id: new ID("2"),
        content: "This is second",
        authorId: new ID("b"),
        createdAt: new Date(),
      }),
      new Post({
        id: new ID("3"),
        content: "This is third",
        authorId: new ID("c"),
        createdAt: new Date(),
      }),
    ];
  }

  async list(limit: number, authorId: ID, start?: Post): Promise<Post[]> {
    const found = this.memory.filter((v) => v.authorId.equals(authorId));
    return found;
  }

  async findBy(id: ID): Promise<Post | null> {
    const found = this.memory.find((v) => v.identity().equals(id));
    return found ?? null;
  }

  async save(post: Post): Promise<void> {
    this.memory.push(post);
  }
  async delete(post: Post): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
