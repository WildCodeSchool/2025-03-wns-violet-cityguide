/**
 * 
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { Poi } from "./Poi";
import { User } from "./User";

@Entity()
@ObjectType()
class Comment extends BaseEntity {
		@PrimaryGeneratedColumn()
		@Field()
		commentId: number; 

		@Column()
		@Field()
		title: string; 

		@Column()
		@Field()
		content: string;

		@ManyToOne(() => User, user => user.createdComments)
		@Field(() => User)
		commentUser: User;

		@ManyToOne(() => Poi, poi => poi.comment)
		@Field(() => Poi)
		commentPoi: Poi;

		@CreateDateColumn({ nullable: true })
		@Field({ nullable: true })
		createdAt: Date; 

		@UpdateDateColumn({ nullable: true })
		@Field({ nullable: true })
		updatedAt: Date;

		@DeleteDateColumn({ nullable: true })
		@Field({ nullable: true })
		deletedAt?: Date;

}

export { Comment };
 */