import { IsNumber, IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  readonly field1: string;
  @IsNumber()
  readonly field2: number;

  //pake argument {each:true} di decorator buat validate each element of array
}
