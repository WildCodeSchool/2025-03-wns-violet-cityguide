import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from "typeorm";
import Poi from "./Poi";
import User from "./User";

@Entity()
@ObjectType()
@Unique(["userId", "poiId"]) 
class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    noteId: number;

    @Column()
    @Field()
    note: number;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Poi)
    @Field(() => Poi)
    poi: Poi;
}
export default Note;