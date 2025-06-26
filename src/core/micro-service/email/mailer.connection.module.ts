import { Module } from '@nestjs/common';
import { MailerConnectionService } from './mailer.connection.service';

@Module({
  providers: [MailerConnectionService],
  exports: [MailerConnectionService],
})
export class MailerConnectionModule {}
