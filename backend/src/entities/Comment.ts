import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import User from "./User";
import Poi from "./Poi";

@Entity()
@ObjectType()
class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()
    text: string;

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
    @Field(() => User)
    @ManyToOne("User", "comments")
    @JoinColumn({ name: "userId" })
    idUser: number;
    user: User;

    @Column()
    @Field()
    @ManyToOne("Poi", "comments")
    @JoinColumn({ name: "poiId" })
    idPoi: number;
    poi: Poi; 
    
}

export default Comment; 