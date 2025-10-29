export type UserToken = {
    id: number;
    roles: Role[];
};

type Context = {
    req: IncomingMessage;
    res: ServerResponse;
    user?: UserToken;
};