import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Poi } from "./Poi";


@Entity()
@ObjectType()
class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    cityId: number;

    @Column()
    @Field()
    cityName: string;

    @Column()
    @Field()
    country: string; 

    @Column()
    @Field()
    description: string; 

    @CreateDateColumn()
    @Field()
    createdAt: Date; 

    @UpdateDateColumn()
    @Field()
    updatedAt: Date; 
    
    @DeleteDateColumn({ nullable: true })
    @Field({ nullable: true })
    deletedAt?: Date; 

    @Column()
    @Field()
    imageUrl: string; 

    @Column()
    @Field() 
    createdBy: number; 

    @OneToMany(type => Poi, poi => poi.poiId)
    @Field() 
    poi: Poi;
}

export { City };
