import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import CityResolver from "./resolvers/CityResolver";
import * as jwt from "jsonwebtoken";
import {UserToken} from "./types/Context";
import { Role } from "./entities/User";
import RateResolver from "./resolvers/RateResolver";

const port = 3000;

async function startServer() {
    await dataSource.initialize();
    const schema = await buildSchema({
        resolvers: [UserResolver, CityResolver, RateResolver],
        authChecker: ({context: { user } }, neededRoles: Role[]) => {
            // si pas authentifié, on retourne false
            if (!user) return false;
            // si neededRoles est vide, on retourne true
            if (!neededRoles.length) return true;
            // si user a ADMIN, on retourne true
            if (user.roles.includes(Role.ADMIN)) return true;
            // si user a au moins un role inclus dans neededRoles, on retourne true
            // sinon on retourne false
            return neededRoles.some(user.roles.includes);
        }
    });
    const apolloServer = new ApolloServer({ schema });
    const { url } = await startStandaloneServer(apolloServer, {
        listen: { port },
        context: async ({ req, res }) => {
            let user: string | jwt.JwtPayload | null = null;
            const match = req.headers.cookie?.match(/cityGuide-auth=([^;]+)/);

            if (match && process.env.JWT_SECRET) {
                const token = match[1]
                // verify renvoie une string si invalide, un payload si valide
                user = jwt.verify(token, process.env.JWT_SECRET);
                if (typeof user === "string") user = null;
            }

            return { req, res, user: user as UserToken };
        },
    });
    console.info("Server started on " + url);
}
startServer();