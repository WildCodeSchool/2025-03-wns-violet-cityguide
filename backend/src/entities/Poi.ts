import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import City from "./City";

@Entity()
@ObjectType()
class Poi extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()    
    poiName: string;

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
    @Field(() => City)  
    @ManyToOne("City", "pois")
    @JoinColumn({ name: "cityId" })
    cityId: number;
    city: City;
    
}

export default Poi;