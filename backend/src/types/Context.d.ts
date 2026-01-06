export type UserToken = {
	id: number;
	firstname: string;
	roles: Role[];
};

type Context = {
	req: IncomingMessage;
	res: ServerResponse;
	user?: UserToken;
};