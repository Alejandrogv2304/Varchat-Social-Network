import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../src/infrastructure/controllers/app.controller';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { AppService } from './infrastructure/services/app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaUserRepository } from './infrastructure/prisma/user.repository.impl';
import { USER_REPOSITORY } from './application/tokens/tokens';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
  ],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
})
export class AppModule {}