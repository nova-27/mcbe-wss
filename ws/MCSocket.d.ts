import WebSocket from 'ws';
import { Events } from './response/Response';
export declare class MCSocket {
    connection: WebSocket;
    constructor(connection: WebSocket);
    /**
     * マイクラのイベントをsubscribeする
     * @param eventName イベント
     */
    subscribeEvent(eventName: Events): void;
    /**
     * マイクラのイベントをunsubscribeする
     * @param eventName イベント
     */
    unsubscribeEvent(eventName: Events): void;
    /**
     * コマンドを送信する
     * @param command コマンド
     */
    commandRequest(command: String): void;
}
