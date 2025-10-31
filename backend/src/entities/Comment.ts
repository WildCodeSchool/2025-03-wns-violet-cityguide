import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Poi } from "./Poi";
import { User } from "./User";

@Entity()
@ObjectType()
class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    commentId: number; 

    @Column()
    @Field()
    title: string; 

    @Column()
    @Field()
    content: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date; 

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.createdComments)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Poi, poi => poi.comment)
    @Field(() => Poi)
    poi: Poi; 

}

export { Comment };