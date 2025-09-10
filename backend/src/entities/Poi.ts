import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class Poi extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()
    coordinates: string;

    @Column()
    @Field()
    marqueur: any;

    @Column({ unique: true })
    @Field()
    addess: string;

    @Column()
    @Field()
    nom: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    photo: string;

    @Column()
    @Field()
    category: string[];

    @Column()
    @Field()
    city: string;

    // @Column()
    // @Field()
    // notes: number;

    // @Column()
    // @Field()
    // comment: string;
}

export default Poi; 