import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const replServer = await repl(AppModule);
  // 记录历史命令，下次启动可以通过上下键调用
  replServer.setupHistory('./.repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}

bootstrap();
