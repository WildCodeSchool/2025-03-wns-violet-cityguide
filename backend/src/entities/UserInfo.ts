import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, PrimaryGeneratedColumn, Unique, OneToOne } from "typeorm";
import User from "./User";

@Entity()
@ObjectType()
@Unique(["userId", "poiId"]) 
class UserInfo extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field()
    noteId: number;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    avatarUrl: string;

    @OneToOne(() => User)
    @JoinColumn({ name: "userId" })
    @Field(() => User)
    user: User;

}

export default UserInfo;
