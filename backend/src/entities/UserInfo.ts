import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
class UserInfo extends BaseEntity {

		@PrimaryGeneratedColumn()
		@Field()
		userInfoId: number;

		@Column()
		@Field()
		lastName: string;

		@Column()
		@Field()
		firstName: string;

		@Column()
		@Field()
		avatarUrl: string;

		@OneToOne(() => User, user => user.userInfo, {
			onDelete: "CASCADE",
		})
		@JoinColumn({ name: "userId" })
		@Field(() => User)
		user: User;

}

export { UserInfo };