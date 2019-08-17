import { Module, Global } from '@nestjs/common';
import { LoggingService } from 'src/utils/logging.service';

@Global()
@Module({
    providers: [LoggingService],
    exports: [LoggingService]
})
export class LoggingModule {}
