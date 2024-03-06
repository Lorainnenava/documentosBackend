import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class DocumentRequestDto {
  @IsNotEmpty()
  @IsOptional()
  Body?: Buffer | ArrayBuffer;

  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  method?: string;
}
