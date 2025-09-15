import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";
import { Poi } from "./Poi";

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


    @Column()
    userId: number;

    @Column()
    poiId: number;

    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    @ManyToOne(() => Poi)
    @Field(() => Poi)
    poi: Poi;
}

export { Note };