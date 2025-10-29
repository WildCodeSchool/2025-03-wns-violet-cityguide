import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import {Field, ObjectType, registerEnumType} from "type-graphql";
import { UserInfo } from "./UserInfo";
import { Poi } from "./Poi";
import { Rate } from "./Rate";
import { Comment } from "./Comment";
import { City } from "./City";
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
    userId: number;

    @Column({ unique: true })
    @Field()
    email: string;

    @Column()
    @Field()
    hashedPassword: string;

    @Column({
    type: "enum",
    enum: Role,
    array: true,
    default: [Role.USER],
    enumName: "role" 
    })
    @Field(() => [Role])
    roles: Role[];

    @OneToMany(()=> Rate, rate => rate.rateId)
    @Field(() => [Rate])
    createdRates: Rate[];

    @OneToMany(() => Poi, poi => poi.poiId)
    @Field(() => [Poi])
    createdPois: Poi[];

    @OneToMany(() => Comment, comment => comment.commentId)
    @Field(() => [Comment])
    createdComments: Comment[];

    @OneToOne(() => UserInfo, userInfo => userInfo.user)
    @JoinColumn()
    @Field(() => UserInfo, { nullable: true })
    userInfo?: UserInfo;

    @OneToMany(() => City, city => city.createdBy)
    @Field(() => [City])
    createdCities: City[];
}

export { User };