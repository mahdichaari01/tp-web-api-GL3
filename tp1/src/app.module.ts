import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PremierModule } from './premier/premier.module';
import { TodoModuleModule } from './todo-module/todo-module.module';
import { CommonModuleModule } from './common-module/common-module.module';

@Module({
	imports: [PremierModule, TodoModuleModule, CommonModuleModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
