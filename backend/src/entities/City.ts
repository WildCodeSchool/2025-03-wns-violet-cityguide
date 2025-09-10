import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";


@Entity()
@ObjectType()
class City extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    nom: string;

    @Column({ type: "simple-json" })
    @Field(() => [String]) // or a more specific type
    poi: any[];
}

export default City