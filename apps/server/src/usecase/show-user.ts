import type { UserRepository } from "../domain/repository/user-repository";
import { ID } from "../domain/value-object/id";
import { UsecaseError } from "./usecase-error";

type ShowUserInput = {
  id: string;
};

type ShowUserOutput = {
  id: string;
  name: string;
  bio: string;
};

export async function showUser(
  repositories: {
    userRepository: UserRepository;
  },
  input: ShowUserInput,
): Promise<ShowUserOutput> {
  const user = await repositories.userRepository.findBy(new ID(input.id));
  if (!user) {
    throw new UsecaseError(400, "User Not Found");
  }

  const showUserOutput = {
    id: user.identity().value(),
    name: user.name,
    bio: user.bio,
  };

  return showUserOutput;
}
