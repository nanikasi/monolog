import { User } from "../../../domain/model/user";
import type { UserRepository } from "../../../domain/repository/user-repository";
import { ID } from "../../../domain/value-object/id";

export class MemoryUserRepositoryImpl implements UserRepository {
  private memory: User[];

  constructor() {
    this.memory = [
      new User({
        id: new ID("a"),
        name: "yamada taro a",
        bio: "I live in Australia",
      }),
      new User({
        id: new ID("b"),
        name: "tanaka zirou b",
        bio: "I live in Tokyo",
      }),
      new User({
        id: new ID("c"),
        name: "tanaka zirou c",
        bio: "I live in Tokyo",
      }),
    ];
  }
  async findBy(id: ID): Promise<User | null> {
    const found = this.memory.find((v) => v.identity().equals(id));
    return found ?? null;
  }
  async findByOauth(id: ID): Promise<User | null> {
    const found = this.memory[0];
    return found ?? null;
  }
  async save(user: User): Promise<void> {
    this.memory.push(user);
  }
  async delete(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
