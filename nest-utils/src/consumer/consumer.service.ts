import { Injectable } from '@nestjs/common';
import { CreateConsumerDto } from './dto/create-consumer.dto';
import { UpdateConsumerDto } from './dto/update-consumer.dto';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class ConsumerService {
  @OnEvent('message')
  handleMessage(payload: { message: string }) {
    console.log('ConsumerService received:', payload);
  }

  @OnEvent('hello.*')
  handleWildcard(payload: any) {
    console.log('ConsumerService received wildcard:', payload);
  }

  create(createConsumerDto: CreateConsumerDto) {
    return 'This action adds a new consumer';
  }

  findAll() {
    return `This action returns all consumer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumer`;
  }

  update(id: number, updateConsumerDto: UpdateConsumerDto) {
    return `This action updates a #${id} consumer`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumer`;
  }
}
