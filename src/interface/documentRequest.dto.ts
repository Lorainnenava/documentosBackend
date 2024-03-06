import { IsString, IsNotEmpty } from 'class-validator';

export class DocumentRequestDto {
  @IsNotEmpty()
  Body?: Buffer | ArrayBuffer;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  method: string;
}
