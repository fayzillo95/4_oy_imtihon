import { Module } from '@nestjs/common';
import { MailerCounterService } from './mailer.counter.service';

@Module({
  providers: [MailerCounterService],
  exports : [MailerCounterService]
})
export class MailerCounterModule {}
