import { Module, Global } from '@nestjs/common';
import { SerialService } from './serial.service';

@Global()
@Module({
    providers: [SerialService],
    exports: [SerialService]
})
export class SerialModule {}
