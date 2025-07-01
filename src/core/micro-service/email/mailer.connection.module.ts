import { Global, Module } from '@nestjs/common';
import { MailerConnectionService } from './mailer.connection.service';

@Global()
@Module({
  providers: [MailerConnectionService],
  exports: [MailerConnectionService],
})
export class MailerConnectionModule {}
