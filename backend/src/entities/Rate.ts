/**
 * import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Poi } from "./Poi";
import { City } from "./City";

@Entity()
@ObjectType()
class Rate extends BaseEntity {
		
		@PrimaryGeneratedColumn()
		@Field()
		rateId: number;

		@Column()
		@Field()
		rate: number;

		@ManyToOne(() => User, user => user.createdRates)
		@Field(() => User)
		rateUser: User;

		@ManyToOne(() => Poi, poi => poi.rates)
		@Field(() => Poi, { nullable: true })
		ratePoi?: Poi;

		@ManyToOne(() => City, city => city.cityRate)
		@Field(() => City, { nullable: true })
		rateCity?: City;
}

export { Rate };
 */