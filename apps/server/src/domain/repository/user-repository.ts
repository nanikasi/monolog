import type { User } from "../model/user";
import type { ID } from "../value-object/id";

export type SaveUserInput = {
  user: User;
  oauthID: ID;
};

export interface UserRepository {
  findBy(id: ID): Promise<User | null>;
  findByOauth(oauthID: ID): Promise<User | null>;

  save(input: SaveUserInput): Promise<void>;
  delete(user: User): Promise<void>;
}
