import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Poi } from "./Poi";
import { User } from "./User";
import { City } from "./City";

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

    @DeleteDateColumn({ nullable: true })
    @Field({ nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => User)
    @Field(() => User)
    commentUser: User;

    @ManyToOne(() => Poi)
    @Field(() => Poi)
    commentPoi: Poi;

    @ManyToOne(() => City)
    @Field(() => City)
    commentCity: City;

}

export { Comment };