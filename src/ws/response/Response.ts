export enum Events {
  PlayerMessage = "PlayerMessage"
}

export type MCResponseHeader = {
  messagePurpose: 'commandResponse' | 'event',
  requestId: String;
  version: number;
};

type MCEventResponseBody = {
  eventName: Events,
  measurements: null,
  properties: any;
};

export type MCCommandResponse = {
  header: MCResponseHeader;
  body: any;
};
export type MCEventResponse = {
  header: MCResponseHeader;
  body: MCEventResponseBody;
};