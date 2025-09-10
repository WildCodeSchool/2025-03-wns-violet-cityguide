import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import Poi from "./Poi";


@Entity()
@ObjectType()
class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    cityName: string;

    @Column()
    @Field()
    country: string; 

    @Column()
    @Field()
    description: string; 

    @Column()
    @Field()
    createdAt: Date; 

    @Column()
    @Field()
    updatedAt: Date; 
    
    @Column()
    @Field()
    deletedAt: Date; 

    @Column()
    @Field()
    imageUrl: string; 

    @Column()
    @Field() 
    createdBy: number; //id de l'utilisateur qui a créé la ville => utilisable par le backoffice

    @OneToMany(type => Poi, poi => poi.id)
    @Field() // or a more specific type
    poi: Promise<Poi>;
}

export default City
