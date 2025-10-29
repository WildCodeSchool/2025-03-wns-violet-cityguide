import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToMany(() => Poi, poi => poi.poiId, { eager: true })
    @JoinTable()
    @Field(() => [Poi],{ nullable: true })
    categoryPois: Poi[];
}

export { Category };