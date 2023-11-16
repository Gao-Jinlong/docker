import { Controller, Get } from '@nestjs/common';
import { GrpcServerService } from './grpc-server.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class GrpcServerController {
  constructor(private readonly grpcServerService: GrpcServerService) {}

  @Get()
  getHello(): string {
    return this.grpcServerService.getHello();
  }

  @GrpcMethod('BookService', 'findBook')
  findOne(data: { id: number }) {
    const items = [
      { id: 1, name: 'Item 1', desc: 'This is item 1' },
      {
        id: 2,
        name: 'Item 2',
        desc: 'This is item 2',
      },
    ];

    return items.find(({ id }) => id === data.id);
  }
}
