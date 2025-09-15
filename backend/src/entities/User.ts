import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from "typeorm";
import {Field, ObjectType, registerEnumType} from "type-graphql";
import { UserInfo } from "./UserInfo";

// exemple de Role: USER, ADMIN
// exemple de permission: CREATE, READ, UPDATE, DELETE

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

registerEnumType(Role, {
    name: "Role",
    description: "Roles for users in this app",
});

@Entity()
@ObjectType()
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    @Field()
    hashedPassword: string;

    @Column({type: "enum", enum: Role, array: true, default: [Role.USER] })
    @Field(() => [Role])
    roles: Role[];

    @OneToMany("Poi", "createdBy")
    createdPois: any[];

    @OneToOne(() => UserInfo, (userInfos: UserInfo) => userInfos.user)
    @Field(() => UserInfo, { nullable: true })
    userInfos?: UserInfo;
}

export { User };