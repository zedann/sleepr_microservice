import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @IsString({ message: 'id must be integer value' })
  @IsNotEmpty()
  _id: string;
}
