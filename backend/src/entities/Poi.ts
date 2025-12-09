import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { City } from "./City";
import { Category } from "./Category";

@Entity()
@ObjectType()
class Poi extends BaseEntity {
		
		@PrimaryGeneratedColumn()
		@Field()
		poiId: number;

		@Column()
		@Field()
		poiName: string;

		@Column()
		@Field()
		poiDescription: string;

		@Column()
		@Field()
		externalLink: string;

		@Column()
		@Field()
		imageUrl: string;

		@Column()
		@Field()
		address: string;

		@Field()
		@Column("float")
		poiLatitude!: number;

		@Field()
		@Column("float")
		poiLongitude!: number;
		
		@ManyToOne(() => City, city => city.cityPois)
		@Field(() => City)
		poiCity: City; 

		@ManyToOne(() => Category, category => category.categoryPois)
		@Field(() => Category, {nullable: true})
		poiCategory: Category;

		// @OneToMany(() => Rate, rate => rate.ratePoi)
		// @Field(() => [Rate],{ nullable: true })
		// rates: Rate[];

		// @OneToMany(() => Comment, comment => comment.commentPoi)
		// @Field(() => [Comment],{ nullable: true })
		// comment: Comment[];

		@CreateDateColumn()
		@Field()
		createdAt: Date;

		@UpdateDateColumn()
		@Field({ nullable: true })
		updatedAt?: Date;
}

export { Poi };