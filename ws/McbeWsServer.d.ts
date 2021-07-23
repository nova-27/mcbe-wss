import WebSocket from 'ws';
import { MCSocket } from './MCSocket';
import { Events, MCCommandResponse } from './response/Response';
declare type MCCommandResponseHandler = (data: MCCommandResponse, socket: MCSocket) => void;
declare type MCEventResponseHandler = (properties: any, socket: MCSocket) => void;
export declare class McbeWsServer {
    wsserver: WebSocket.Server;
    private onReceivedCommandResponse;
    private onReceivedPlayerMessage;
    constructor(options: WebSocket.ServerOptions);
    /**
     * イベント名から既存のイベントハンドラを取得する
     * @param eventName イベント名
     * @returns イベントハンドラ
     */
    private getMCEventHandlers;
    /**
     * Minecraftのイベントハンドラを登録する
     * @param eventName イベント名
     * @param handler ハンドラ
     */
    addMCEventHandler(eventName: Events, handler: MCEventResponseHandler): void;
    /**
     * Minecraftのイベントハンドラを削除する
     * @param eventName イベント名
     * @param handler ハンドラ
     */
    removeMCEventHandler(eventName: Events, handler: MCEventResponseHandler): void;
    /**
     * Minecraftのコマンド応答ハンドラを追加する
     * @param handler ハンドラ
     */
    addMCCommandResponseHandler(handler: MCCommandResponseHandler): void;
    /**
     * Minecraftのコマンド応答ハンドラを削除する
     * @param handler ハンドラ
     */
    removeMCCommandResponseHandler(handler: MCCommandResponseHandler): void;
    /**
     * Websocketサーバーを停止する
     */
    close(): void;
}
export {};
