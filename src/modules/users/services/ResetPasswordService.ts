import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppErrors';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// import User from '../infra/typeorm/entities/User';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
