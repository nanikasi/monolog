import type { User } from "../model/user";
import type { UserRepository } from "../repository/user-repository";

export class UserService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async exists(user: User): Promise<boolean> {
    const userFindByID = await this._userRepository.findBy(user.identity());
    if (userFindByID) {
      return true;
    }

    const userFindByEmail = await this._userRepository.findBy(user.email);
    if (userFindByEmail) {
      return true;
    }

    return false;
  }
}
