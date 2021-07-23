"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCSocket = void 0;
var uuid_1 = require("uuid");
var MCSocket = /** @class */ (function () {
    function MCSocket(connection) {
        this.connection = connection;
    }
    /**
     * マイクラのイベントをsubscribeする
     * @param eventName イベント
     */
    MCSocket.prototype.subscribeEvent = function (eventName) {
        var data = JSON.stringify({
            "header": {
                "requestId": uuid_1.v4(),
                "messagePurpose": "subscribe",
                "version": 1,
                "messageType": "commandRequest"
            },
            "body": {
                eventName: eventName
            }
        });
        this.connection.send(data);
    };
    /**
     * マイクラのイベントをunsubscribeする
     * @param eventName イベント
     */
    MCSocket.prototype.unsubscribeEvent = function (eventName) {
        var data = JSON.stringify({
            "header": {
                "requestId": uuid_1.v4(),
                "messagePurpose": "unsubscribe",
                "version": 1,
                "messageType": "commandRequest"
            },
            "body": {
                eventName: eventName
            }
        });
        this.connection.send(data);
    };
    /**
     * コマンドを送信する
     * @param command コマンド
     */
    MCSocket.prototype.commandRequest = function (command) {
        var data = JSON.stringify({
            "header": {
                "requestId": uuid_1.v4(),
                "messagePurpose": "commandRequest",
                "version": 1,
                "messageType": "commandRequest"
            },
            "body": {
                "origin": {
                    "type": "player"
                },
                "commandLine": command,
                "version": 1
            }
        });
        this.connection.send(data);
    };
    return MCSocket;
}());
exports.MCSocket = MCSocket;
