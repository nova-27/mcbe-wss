import WebSocket from 'ws';
import { MCSocket } from './MCSocket';
import { PlayerMessageProperties } from './response/PlayerMessage';
import { MCEventResponse, MCResponseHeader, Events, MCCommandResponse } from './response/Response';

type MCCommandResponseHandler = (data: MCCommandResponse, socket: MCSocket) => void;
type MCEventResponseHandler = (properties: any, socket: MCSocket) => void;

export class McbeWsServer {
  public wsserver: WebSocket.Server;

  private onReceivedCommandResponse: Set<MCCommandResponseHandler>;
  private onReceivedPlayerMessage: Set<(properties: PlayerMessageProperties, socket: MCSocket) => void>;

  constructor(options: WebSocket.ServerOptions) {
    this.wsserver = new WebSocket.Server(options);

    this.onReceivedCommandResponse = new Set();
    this.onReceivedPlayerMessage = new Set();
    
    this.wsserver.on('connection', (connection: WebSocket) => {
      const socket = new MCSocket(connection);

      socket.connection.on("message", (packet: string) => {
        const res = JSON.parse(packet);

        if ((res as {header: MCResponseHeader}).header.messagePurpose == 'commandResponse') {
          this.onReceivedPlayerMessage.forEach(element => {
             element(res, socket);
          });
          return;
        }

        const mc_event_response: MCEventResponse = res;
        switch(mc_event_response.body.eventName) {
          case Events.PlayerMessage:
            this.onReceivedPlayerMessage.forEach(element => {
              element(mc_event_response.body.properties, socket);
            })
            break;
        }
      });
    });
  }

  /**
   * イベント名から既存のイベントハンドラを取得する
   * @param eventName イベント名
   * @returns イベントハンドラ
   */
  private getMCEventHandlers(eventName: Events): Set<MCEventResponseHandler> {
    switch(eventName) {
      case Events.PlayerMessage:
        return this.onReceivedPlayerMessage;
    }
  }

  /**
   * Minecraftのイベントハンドラを登録する
   * @param eventName イベント名
   * @param handler ハンドラ
   */
  addMCEventHandler(eventName: Events, handler: MCEventResponseHandler) {
    const handlers = this.getMCEventHandlers(eventName);
    handlers.add(handler);
  }

  /**
   * Minecraftのイベントハンドラを削除する
   * @param eventName イベント名
   * @param handler ハンドラ
   */
  removeMCEventHandler(eventName: Events, handler: MCEventResponseHandler) {
    const handlers = this.getMCEventHandlers(eventName);
    handlers.delete(handler);
  }

  /**
   * Minecraftのコマンド応答ハンドラを追加する
   * @param handler ハンドラ
   */
  addMCCommandResponseHandler(handler: MCCommandResponseHandler) {
    this.onReceivedCommandResponse.add(handler);
  }

  /**
   * Minecraftのコマンド応答ハンドラを削除する
   * @param handler ハンドラ
   */
  removeMCCommandResponseHandler(handler: MCCommandResponseHandler) {
    this.onReceivedCommandResponse.delete(handler);
  }

  /**
   * Websocketサーバーを停止する
   */
  close() {
    this.wsserver.close();
  }
}