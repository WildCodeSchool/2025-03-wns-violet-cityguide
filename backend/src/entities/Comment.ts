import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Poi from "./Poi";

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

    @Column()
    @Field()
    createdBy: String; // id de l'utilisateur qui a créé le commentaire
  
    @OneToOne(type => Poi, poi => poi.poiId)
    poi: Poi; 

}

export default Comment; 