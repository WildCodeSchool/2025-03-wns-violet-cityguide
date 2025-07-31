/*
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, JoinColumn, OneToOne } from "typeorm";
import { Field, ObjectType } from 'type-graphql';
import User from "./User";

@Entity()
@ObjectType()
class UserInfos extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    phoneNumber?: string;

    @OneToOne("User", "userInfos")
    @JoinColumn({ name: "userId" })
    @Field(() => User)
    userId: number;
    user: User;
}

export default UserInfos;
*/