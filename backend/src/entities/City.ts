import { BaseEntity, Column, ManyToOne, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Poi } from "./Poi";
import { User } from "./User";
import { Rate } from "./Rate";


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
    description: string; 

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;

    @Column()
    @Field()
    imageUrl: string;

    @ManyToOne(() => User, user => user.createdCities)
    @Field(() => User) 
    createdBy: User;

    @OneToMany(() => Poi, poi => poi.poiId)
    @Field(() => [Poi]) 
    cityPois: Poi[];  

    @OneToMany(() => Rate, rate => rate.rateId)
    @Field(() => [Rate])
    cityRate: Rate[];
}

export { City };
