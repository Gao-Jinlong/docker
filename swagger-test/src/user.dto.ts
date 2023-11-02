import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    name: 'name',
    description: 'user name',
    example: 'ginlon',
    maxLength: 30,
    minLength: 2,
    required: true,
  })
  name: string;

  @ApiPropertyOptional({
    name: 'age',
    description: 'user age',
    example: 18,
    maximum: 2 ** 8,
  }) // 可选 等价于 @ApiProperty({ name: 'age', description: 'user age', example: 18, required: false })
  age: number;

  @ApiProperty({
    name: 'hobby',
    description: 'user hobby',
    example: ['coding', 'reading'],
  })
  hobby: string[];
}
