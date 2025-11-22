import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Poi } from "./Poi";

@Entity()
@ObjectType()
class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    categoryId: number;

    @Column({ unique: true})
    @Field()
    categoryName: string; 

    @Column({ unique: true})
    @Field()
    style: string; 

    /* Pour indiquer les liens entre les entités, il faut ajouter le chemin "retour" entre l'entité actuelle (Category) et l'entité liée (Poi)
    Ici : On trouve les categories sur l'entité Poi à la propriété poiCategory*/
    @OneToMany(() => Poi, poi => poi.poiCategory)
    @Field(() => [Poi],{ nullable: true })
    categoryPois: Poi[];
}

export { Category };