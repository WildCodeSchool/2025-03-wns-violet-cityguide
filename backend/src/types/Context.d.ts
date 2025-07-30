import {IncomingMessage, ServerResponse} from "http";

export type UserToken = {
    id: number;
};

type Context = {
    req: IncomingMessage;
    res: ServerResponse;
    user?: UserToken;
};