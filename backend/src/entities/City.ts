import { BaseEntity, Column, ManyToOne, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Poi } from "./Poi";
import { User } from "./User";


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

    @Column()
    @Field()
    imageUrl: string;

    @Field()
    @Column("float")
    cityLatitude!: number;

    @Field()
    @Column("float")
    cityLongitude!: number;

    // Pour le chemin "retour" Poi -> City, on trouve la ville associée au poi sur la propriété poi.cityId
    @OneToMany(() => Poi, poi => poi.cityId)
    @Field(() => [Poi], { nullable: true }) 
    cityPois: Poi[];

    // @ManyToOne(() => User, user => user.createdCities, {eager: true})
    // @Field(() => User) 
    // createdBy: User;

    @CreateDateColumn()
    @Field({ nullable: true })
    createdAt: Date;

    @UpdateDateColumn()
    @Field({ nullable: true })
    updatedAt: Date;
}

export { City };
