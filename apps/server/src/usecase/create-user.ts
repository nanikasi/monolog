import { User } from "../domain/model/user";
import type { UserRepository } from "../domain/repository/user-repository";
import { ID } from "../domain/value-object/id";

type CreateUserInput = {
  oauthID: string;
  name: string;
  bio: string;
};

export async function CreateUser(
  repositories: {
    userRepository: UserRepository;
  },
  input: CreateUserInput,
): Promise<void> {
  const newUser = User.new({ name: input.name, bio: input.bio });

  const saveUserinput = {
    user: newUser,
    oauthID: new ID(input.oauthID),
  };

  return await repositories.userRepository.save(saveUserinput);
}
