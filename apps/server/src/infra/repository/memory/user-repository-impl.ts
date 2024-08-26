import { User } from "../../../domain/model/user";
import type {
  SaveUserInput,
  UserRepository,
} from "../../../domain/repository/user-repository";
import { ID } from "../../../domain/value-object/id";

type MemoryUser = {
  user: User;
  oauthID: ID;
};

export class MemoryUserRepositoryImpl implements UserRepository {
  private memory: MemoryUser[];

  constructor() {
    this.memory = [
      {
        user: new User({
          id: new ID("a"),
          name: "yamada taro a",
          bio: "I live in Australia",
        }),
        oauthID: new ID("yamada"),
      },
      {
        user: new User({
          id: new ID("b"),
          name: "tanaka zirou b",
          bio: "I live in Tokyo",
        }),
        oauthID: new ID("tanaka"),
      },
      {
        user: new User({
          id: new ID("c"),
          name: "tanaka zirou c",
          bio: "I live in Tokyo",
        }),
        oauthID: new ID(""),
      },
    ];
  }
  async findBy(id: ID): Promise<User | null> {
    const found = this.memory.find((v) => v.user.identity().equals(id));
    return found?.user ?? null;
  }
  async findByOauth(id: ID): Promise<User | null> {
    const found = this.memory[0].user;
    return found ?? null;
  }
  async save(input: SaveUserInput): Promise<void> {
    this.memory.push({
      user: input.user,
      oauthID: new ID("aaa"),
    });
  }
  async delete(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
