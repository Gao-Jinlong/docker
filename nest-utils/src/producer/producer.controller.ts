import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ProducerService } from './producer.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('producer')
export class ProducerController {
  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  constructor(private readonly producerService: ProducerService) {}

  @Post()
  create(@Body() createProducerDto: CreateProducerDto) {
    return this.producerService.create(createProducerDto);
  }

  @Get()
  findAll() {
    this.eventEmitter.emit('message', {
      message: 'Hello from producer.findAll event!',
    });
    this.eventEmitter.emit('hello.aaa', {
      message: 'Hello aaa.',
    });
    this.eventEmitter.emit('hello.bbb', {
      message: 'Hello bbb',
    });
    return this.producerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.producerService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return this.producerService.update(+id, updateProducerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.producerService.remove(+id);
  }
}
