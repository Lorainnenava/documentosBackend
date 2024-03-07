import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DocumentRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string;
}
