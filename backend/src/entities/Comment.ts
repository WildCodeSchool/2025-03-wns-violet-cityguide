import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Poi from "./Poi";

@Entity()
@ObjectType()
class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number; 

    @Column()
    @Field()
    titre : string; 

    @Column()
    @Field()
    content : string;

    @Column()
    @Field()
    createdBy: String; // id de l'utilisateur qui a créé le commentaire
  
    @OneToOne(type => Poi, poi => poi.id)
    poi: Promise<Poi>; 

}

export default Comment; 