import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import City from "./City";
import Note from "./Note";
import Comment from "./Comment";
import Category from "./Category";

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
    description: string;

    @Column()
    @Field()
    imageUrl: string;

    @Column()
    @Field()
    createdBy: string; //id de l'utilisateur qui a crée le point d'interêt

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