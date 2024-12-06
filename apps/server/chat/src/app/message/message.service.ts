import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  send() {
    console.log('hehe');
  }

  paging() {
    console.log('hehe');
  }

  delete() {
    console.log('hehe');
  }
}
