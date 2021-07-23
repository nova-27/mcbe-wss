"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.McbeWsServer = void 0;
var ws_1 = __importDefault(require("ws"));
var MCSocket_1 = require("./MCSocket");
var Response_1 = require("./response/Response");
var McbeWsServer = /** @class */ (function () {
    function McbeWsServer(options) {
        var _this = this;
        this.wsserver = new ws_1.default.Server(options);
        this.onReceivedCommandResponse = new Set();
        this.onReceivedPlayerMessage = new Set();
        this.wsserver.on('connection', function (connection) {
            var socket = new MCSocket_1.MCSocket(connection);
            socket.connection.on("message", function (packet) {
                var res = JSON.parse(packet);
                if (res.header.messagePurpose == 'commandResponse') {
                    _this.onReceivedPlayerMessage.forEach(function (element) {
                        element(res, socket);
                    });
                    return;
                }
                var mc_event_response = res;
                switch (mc_event_response.body.eventName) {
                    case Response_1.Events.PlayerMessage:
                        _this.onReceivedPlayerMessage.forEach(function (element) {
                            element(mc_event_response.body.properties, socket);
                        });
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
    McbeWsServer.prototype.getMCEventHandlers = function (eventName) {
        switch (eventName) {
            case Response_1.Events.PlayerMessage:
                return this.onReceivedPlayerMessage;
        }
    };
    /**
     * Minecraftのイベントハンドラを登録する
     * @param eventName イベント名
     * @param handler ハンドラ
     */
    McbeWsServer.prototype.addMCEventHandler = function (eventName, handler) {
        var handlers = this.getMCEventHandlers(eventName);
        handlers.add(handler);
    };
    /**
     * Minecraftのイベントハンドラを削除する
     * @param eventName イベント名
     * @param handler ハンドラ
     */
    McbeWsServer.prototype.removeMCEventHandler = function (eventName, handler) {
        var handlers = this.getMCEventHandlers(eventName);
        handlers.delete(handler);
    };
    /**
     * Minecraftのコマンド応答ハンドラを追加する
     * @param handler ハンドラ
     */
    McbeWsServer.prototype.addMCCommandResponseHandler = function (handler) {
        this.onReceivedCommandResponse.add(handler);
    };
    /**
     * Minecraftのコマンド応答ハンドラを削除する
     * @param handler ハンドラ
     */
    McbeWsServer.prototype.removeMCCommandResponseHandler = function (handler) {
        this.onReceivedCommandResponse.delete(handler);
    };
    /**
     * Websocketサーバーを停止する
     */
    McbeWsServer.prototype.close = function () {
        this.wsserver.close();
    };
    return McbeWsServer;
}());
exports.McbeWsServer = McbeWsServer;
