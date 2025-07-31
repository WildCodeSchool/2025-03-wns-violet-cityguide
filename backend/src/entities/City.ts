import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
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

    @OneToMany("Poi", "city")
    pois: any[];

/*
    @Column({ type: "float" })
    @Field()
    latitude: number;

    @Column({ type: "float" })
    @Field()
    longitude: number;
    
    */
}

export default City;