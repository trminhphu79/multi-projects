import { Body, Controller, Inject , Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateDto } from './dto/create.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post()
    createPayment(@Body() createDto: CreateDto) {
      this.natsClient.emit('createPayment', createDto);
    }
}
