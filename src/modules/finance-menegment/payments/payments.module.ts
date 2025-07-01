import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/users/user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Payment, User])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
