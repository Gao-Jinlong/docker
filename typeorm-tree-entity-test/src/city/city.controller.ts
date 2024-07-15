import { Controller, Get } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll() {
    return this.cityService.findAll();
  }
  @Get('root')
  async findRoot() {
    return this.cityService.findRoot();
  }
  @Get('descendants')
  async findDescendants() {
    return this.cityService.findDescendants();
  }
  @Get('ancestors')
  async findAncestors() {
    return this.cityService.findAncestorsTree();
  }
}
