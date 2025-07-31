import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import Poi from "./City";

@Entity()
@ObjectType()
class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({ unique: true })
    @Field()
    categoryName: string;

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
    @Field(() => Poi)
    @ManyToMany("Poi", "categories")
    @JoinColumn({ name: "poiId" })
    poiId: number;
    poi: Poi;

}

export default Category;