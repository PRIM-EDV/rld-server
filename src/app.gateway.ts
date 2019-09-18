import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer, SubscribeMessage } from "@nestjs/websockets";
import { Server, Client, Socket } from "socket.io";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LoggingService } from "./utils/logging.service";
import { MapObjectDocument, RadioOperatorDocument, SquadDocument } from "./models";


@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    private _server: Server;

    constructor(
        @InjectModel('MapObject') private readonly _mapObject: Model<MapObjectDocument>,
        @InjectModel('RadioOperator') private readonly _radioOperator: Model<RadioOperatorDocument>,
        @InjectModel('Squad') private readonly _squad: Model<SquadDocument>,
        private _log: LoggingService) {
    }

    public async handleConnection(client: Socket){

        client.emit('map-object', { action: "set", objects: await this._mapObject.find().exec()});
        client.emit('radio-operator', { action: "set", objects: await this._radioOperator.find().exec()});
        client.emit('squad', { action: "set", objects: await this._squad.find().exec()});

        return
    }

    public async handleDisconnect(){
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