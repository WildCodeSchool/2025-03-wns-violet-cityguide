import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Poi from "./Poi";

@Entity()
@ObjectType()
class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    categoryId: number; 

    @Column({ unique: true})
    @Field() 
    name: string; 

    @ManyToMany(type => Poi, poi => poi.poiId)
    poi: Poi; 
}

export default Category; 