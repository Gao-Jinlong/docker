import { ApiProperty } from '@nestjs/swagger';

export class UserVo {
  @ApiProperty({ name: 'name', description: 'user name', example: 'ginlon' })
  name: string;
  @ApiProperty({ name: 'age', description: 'user age', example: 18 })
  age: number;
}
