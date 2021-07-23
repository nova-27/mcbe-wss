export declare enum Events {
    PlayerMessage = "PlayerMessage"
}
export declare type MCResponseHeader = {
    messagePurpose: 'commandResponse' | 'event';
    requestId: String;
    version: number;
};
declare type MCEventResponseBody = {
    eventName: Events;
    measurements: null;
    properties: any;
};
export declare type MCCommandResponse = {
    header: MCResponseHeader;
    body: any;
};
export declare type MCEventResponse = {
    header: MCResponseHeader;
    body: MCEventResponseBody;
};
export {};
