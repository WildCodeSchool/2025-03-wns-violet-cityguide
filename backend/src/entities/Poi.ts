import { ObjectType, Field } from "type-graphql";
import { BaseEntity, JoinTable, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { City } from "./City";
import { Comment } from "./Comment";
import { User } from "./User";
import { Category } from "./Category";
import { Rate } from "./Rate";

@Entity()
@ObjectType()
class Poi extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    @Field()
    poiId: number;

    @Column({ unique: true })
    @Field()
    coordinates: string;

    @Column()
    @Field()
    pin: string;

    @Column({ unique: true })
    @Field()
    address: string;

    @Column()
    @Field()
    poiName: string;

    @Column()
    @Field()
    poiDescription: string;

    @Column()
    @Field()
    imageUrl: string;

    @ManyToOne(() => User, { eager: false })
    @Field(() => User)
    createdBy: User;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field({ nullable: true })
    updatedAt?: Date;

    @ManyToMany(() => Category, category => category.categoryId, { eager: true })
    @JoinTable()
    @Field(() => [Category],{ nullable: true })
    poiCategories: Category[];

    @ManyToOne(() => City, city => city.cityId)
    @JoinColumn()
    cityId: City[]; 

    @OneToMany(() => Rate, rate => rate.ratePoi)
    @Field(() => [Rate])
    rates: Rate[];

    @OneToMany(() => Comment, comment => comment.commentId)
    @Field(() => [Comment])
    comment: Comment[];
}

export { Poi };