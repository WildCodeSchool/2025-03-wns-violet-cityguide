import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Poi from "./Poi";

@Entity()
@ObjectType()
class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    noteId: number;

    @Column()
    @Field()
    note: number;

    @Column()
    @Field()
    createdBy: string; //id de l'utilisateur qui a crée la note 

    @OneToOne(type => Poi, poi => poi.poiId)
    poi: Poi; 

}
export default Note;