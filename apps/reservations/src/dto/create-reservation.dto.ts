import { IsDate, IsDefined, IsNotEmpty, IsNumber, IsString, ValidateNested  } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateChargeDto } from '@app/common';
export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
