import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number; 

    @Column({ unique : true})
    @Field() 
    name : string

}

export default Category; 