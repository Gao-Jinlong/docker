import { Controller, Get, Version } from '@nestjs/common';
import { AaaService } from './aaa.service';

@Controller({
  path: 'aaa',
  version: '2',
})
export class AaaV2Controller {
  constructor(private readonly aaaService: AaaService) {}

  @Get()
  @Version('2')
  findAllV2() {
    return this.aaaService.findAll() + '-V2';
  }
}
