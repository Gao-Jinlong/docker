import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AaaGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly aaaService: AaaService) {}

  @WebSocketServer()
  server: Server;

  handleDisconnect(client: any) {
    console.log('client disconnect');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('client connect');
  }
  afterInit(server: Server) {
    console.log('server init');
  }

  @SubscribeMessage('createAaa')
  create(@MessageBody() createAaaDto: CreateAaaDto) {
    this.server.emit('ginlon', { msg: 'hello create' });
    return this.aaaService.create(createAaaDto);
  }

  @SubscribeMessage('findAllAaa')
  findAll() {
    return new Observable((observer) => {
      observer.next({ event: 'ginlon', data: { msg: 'aaa' } });

      setTimeout(() => {
        observer.next({ event: 'ginlon', data: { msg: 'bbb' } });
      }, 2000);

      setTimeout(() => {
        observer.next({ event: 'ginlon', data: { msg: 'ccc' } });
      }, 5000);
    });
  }

  @SubscribeMessage('findOneAaa')
  findOne(@MessageBody() id: number, @ConnectedSocket() server: Server) {
    server.emit('ginlon', { msg: 'hello' });
    return this.aaaService.findOne(id);
  }

  @SubscribeMessage('updateAaa')
  update(@MessageBody() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(updateAaaDto.id, updateAaaDto);
  }

  @SubscribeMessage('removeAaa')
  remove(@MessageBody() id: number) {
    return this.aaaService.remove(id);
  }
}
