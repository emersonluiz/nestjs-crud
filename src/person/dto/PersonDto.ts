import { IsNotEmpty } from 'class-validator';

export class PersonDto {

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly age: number;
}