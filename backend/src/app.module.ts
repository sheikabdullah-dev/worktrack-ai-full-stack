import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogsModule } from './logs/logs.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // ✅ makes it available everywhere
      envFilePath: '.env', // ✅ reads from backend/.env
    }),
    LogsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}