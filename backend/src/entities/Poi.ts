import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import City from "./City";
import Note from "./Note";
import Comment from "./Comment";
import Category from "./Category";
import User from "./User";

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


    @Column()
    createdById: number;


    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: "createdById" })
    @Field(() => User)
    createdBy: User;

    @CreateDateColumn()
    @Field()
    createdAt: Date;    

    @UpdateDateColumn()
    @Field()
    updatedAt: Date;

    @ManyToMany(type => Category, category => category.categoryId)
    category: Category;

    @OneToOne(type => City, city => city.cityId)
    @JoinColumn()
    cityId: number; 

    @OneToMany(type => Note, note => note.noteId)
    note: Note; 

    @OneToMany(type => Comment, comment => comment.commentId)
    comment: Comment;
}


export default Poi; 