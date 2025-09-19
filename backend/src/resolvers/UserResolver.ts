import {
  Arg,
  Field,
  Ctx,
  ID, 
  InputType,
  Mutation,
  Query,
  Resolver,
  ObjectType,
} from "type-graphql";
import { User, Role } from "../entities/User";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { Context, UserToken } from "../types/Context";
import { UserInfo } from "../entities/UserInfo";


@InputType()
class NewUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}


@ObjectType()
class UserResponse {
  @Field(() => String)
  token: string;
  
  @Field(() => User, { nullable: true })
  user?: User;
  
  @Field(() => String, { nullable: true })
  message?: string;
}

function setCookie(ctx: Context, token: string) {
  ctx.res.setHeader(
    "Set-Cookie",
    `cityGuide-auth=${token};secure;HttpOnly;SameSite=Strict;expires=${new Date(
      Date.now() + 1000 * 60 * 60 * 24
    ).toUTCString()};`
  );
}

function createJwt(payload: UserToken) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("Missing env variable : JWT_SECRET");
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

function createUserToken(user: User): UserToken {
  const profile: UserToken = {
    id: user.userId,
    roles: user.roles,
  };
  return profile;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await User.find({
      relations: ["userInfo"]
    });
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Arg("userId", () => ID) userId: number) {
    return await User.findOne({
      where: { userId },
      relations: ["userInfo"]
    });
  }

  @Mutation(() => UserResponse)
  async signup(@Arg("data") data: NewUserInput, @Ctx() ctx: Context) {
    try {

      if (!data.email.includes('@')) throw new Error("Invalid email format");
      if (data.password.length < 8) throw new Error("Password must be at least 8 characters");
      
 
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (existingUser) throw new Error("Email already in use");
      
      const hashedPassword = await argon2.hash(data.password);
      const user = User.create({ ...data, hashedPassword });
      await user.save();
      

      const userInfo = UserInfo.create({
        firstName: "",
        lastName: "",
        avatarUrl: "https://example.com/default-avatar.png",
        user: user
      });
      await userInfo.save();


      const payload = createUserToken(user);
      const token = createJwt(payload);
      setCookie(ctx, token);

      return {
        token,
        user,
        message: "User created successfully"
      };
    } catch (error) {
      return {
        token: "",
        message: error instanceof Error ? error.message : "An unknown error occurred"
      };
    }
  }

  @Mutation(() => UserResponse)
  async login(@Arg("data") data: UserInput, @Ctx() ctx: Context) {
    try {

      const user = await User.findOneOrFail({ 
        where: { email: data.email },
        relations: ["userInfo"]
      });


      const isValid = await argon2.verify(user.hashedPassword, data.password);
      if (!isValid) throw new Error("Invalid password");

      const payload = createUserToken(user);
      const token = createJwt(payload);
      setCookie(ctx, token);

      return {
        token,
        user,
        message: "Login successful"
      };
    } catch (error) {
      return {
        token: "",
        message: error instanceof Error ? error.message : "Invalid credentials"
      };
    }
  }

  @Mutation(() => UserResponse)
  async logout(@Ctx() ctx: Context) {
    setCookie(ctx, "");
    return {
      token: "",
      message: "Logged out successfully"
    };
  }
}