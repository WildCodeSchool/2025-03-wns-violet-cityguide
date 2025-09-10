import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Poi from "./Poi";

@Entity()
@ObjectType()
class Note extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    note : number;

    @Column()
    @Field()
    createdBy: string; //id de l'utilisateur qui a crée la note 

    @OneToOne(type => Poi, poi => poi.id)
    poi: Promise<Poi>; 

}
export default Note;