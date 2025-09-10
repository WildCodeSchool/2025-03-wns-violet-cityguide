import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number; 

    @Column()
    @Field()
    titre : string; 

    @Column()
    @Field()
    content : string;

    // @Column({ unique : true})
    // @Field() 
    // Poi : string
    // TODO : joined column to be defined later

}

export default Comment; 