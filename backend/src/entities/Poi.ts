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

    // Attention : la contrainte d'unicité risque d'être un souci exemple deux poi =!= l'uin sur l'autre (ex magasin dans un centre commercial) ont les mêmes coordonnées GPS
    @Column({ unique: true })
    @Field()
    coordinates: string;

    @Column()
    @Field()
    pin: string;

    // Attention, idem que pour coordinates
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

    @ManyToOne(() => User, user => user.createdPois)
    @Field(() => User)
    createdBy: User;

    @ManyToMany(() => Category, category => category.categoryPois)
    @JoinTable()
    @Field(() => [Category],{ nullable: true })
    poiCategories: Category[];

    @ManyToOne(() => City, city => city.cityPois)
    @JoinColumn()
    cityId: City[]; 

    @OneToMany(() => Rate, rate => rate.ratePoi)
    @Field(() => [Rate],{ nullable: true })
    rates: Rate[];

    @OneToMany(() => Comment, comment => comment.commentPoi)
    @Field(() => [Comment],{ nullable: true })
    comment: Comment[];

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @UpdateDateColumn()
    @Field({ nullable: true })
    updatedAt?: Date;
}

export { Poi };