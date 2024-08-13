import { User } from "../domain/model/user";
import type { UserRepository } from "../domain/repository/user-repository";

type CreateUserInput = {
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

  return await repositories.userRepository.save(newUser);
}
