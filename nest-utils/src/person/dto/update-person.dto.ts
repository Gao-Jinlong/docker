import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  // PartialType 会在继承的属性上添加 @IsOptional() 装饰器, 使其可选，因此非空验证会被忽略
}

export class UpdatePersonDto2 extends PickType(CreatePersonDto, [
  'name',
  'age',
]) {}

export class UpdatePersonDto3 extends OmitType(CreatePersonDto, [
  'name',
  'age',
]) {}

export class UpdatePersonDto4 extends IntersectionType(
  UpdatePersonDto2,
  UpdatePersonDto3,
) {}

export class UpdatePersonDto5 extends IntersectionType(
  PickType(CreatePersonDto, ['name', 'age']),
  PartialType(OmitType(CreatePersonDto, ['email', 'sex'])),
) {}
