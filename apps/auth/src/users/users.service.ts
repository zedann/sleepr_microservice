import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';
import { use } from 'passport';
import { UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    console.log(createUserDto);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }
  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.userRepository.findOne({ email: createUserDto.email });
    } catch (_err) {
      return;
    }
    throw new UnprocessableEntityException('email already in use');
  }
  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) throw new UnauthorizedException('user not exists');
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid)
      throw new UnauthorizedException('credentials are not valid');
    return user;
  }
  async getUser(getUserDto: GetUserDto) {
    console.log('getUser called with:', getUserDto);
    const user = await this.userRepository.findOne(getUserDto);
    console.log('getUser found:', user);

    if (!user)
      throw new NotFoundException(`user with id ${getUserDto._id} not exists`);
    return user;
  }
}
