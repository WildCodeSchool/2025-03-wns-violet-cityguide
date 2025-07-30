import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {Field, ObjectType, registerEnumType} from "type-graphql";

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
}

export default User;