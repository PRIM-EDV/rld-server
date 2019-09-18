import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { Model } from 'mongoose';
import { MapObject } from '../models/map-object/map-object.interface';
import { LoggingService } from 'src/utils/logging.service';
import { InjectModel } from '@nestjs/mongoose';

@WebSocketGateway()
export class MapObjectGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private _server: Server;

    constructor(@InjectModel('MapObject') private readonly _mapObject: Model<MapObject>, private _log: LoggingService) {
        console.log('server started');
    }

    async handleConnection(client: Client){
        const data = {
            action: "set",
            objects: await this._mapObject.find().exec()
        }
        console.log('connected')
        this._server.emit('map-object', data)
        return
    }

    async handleDisconnect(){
        console.log('disconnected');
    }

    @SubscribeMessage('map-object')
    async identity(client: Client, data: any): Promise<any> {
        console.log('setmapobject')
        
        if(data.action == 'set') {
            await this._mapObject.update({uid: data.object.uid}, data.object, { upsert : true });
        } else {

        }

        return;
    }
}