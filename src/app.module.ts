import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../src/infrastructure/controllers/app.controller';
import { UserController } from './infrastructure/controllers/user.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { AppService } from './infrastructure/services/app.service';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { PrismaUserRepository } from './infrastructure/prisma/user.repository.impl';
import { USER_REPOSITORY, AUTH_REPOSITORY } from './application/tokens/tokens';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { AuthRepositoryImpl } from './infrastructure/prisma/auth.repository.impl';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { ValidateUserUseCase } from './application/use-cases/validateUser.usecase';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [
    AppService,
    CreateUserUseCase,
    LoginUseCase,
    ValidateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: AUTH_REPOSITORY,
      useClass: AuthRepositoryImpl,
    },
  ],
})
export class AppModule {}