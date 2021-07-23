import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { Events } from './response/Response';

export class MCSocket {
  public connection: WebSocket;

  constructor(connection: WebSocket) {
    this.connection = connection;
  }

  /**
   * マイクラのイベントをsubscribeする
   * @param eventName イベント
   */
  subscribeEvent(eventName: Events) {
    const data = JSON.stringify({
      "header": {
        "requestId": uuidv4(),
        "messagePurpose": "subscribe",
        "version": 1,
        "messageType": "commandRequest"
      },
      "body": {
          eventName
      }
    });

    this.connection.send(data);
  }

  /**
   * マイクラのイベントをunsubscribeする
   * @param eventName イベント
   */
   unsubscribeEvent(eventName: Events) {
    const data = JSON.stringify({
      "header": {
        "requestId": uuidv4(),
        "messagePurpose": "unsubscribe",
        "version": 1,
        "messageType": "commandRequest"
      },
      "body": {
          eventName
      }
    });

    this.connection.send(data);
  }

  /**
   * コマンドを送信する
   * @param command コマンド
   */
  commandRequest(command: String) {
    const data = JSON.stringify({
      "header":{
         "requestId": uuidv4(),
         "messagePurpose": "commandRequest",
         "version": 1,
         "messageType": "commandRequest"
      },
      "body":{
         "origin":{
            "type": "player"
         },
         "commandLine": command,
         "version": 1
      }
   });

    this.connection.send(data);
  }
}