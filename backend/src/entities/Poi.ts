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
    id: number;

    @Column({ unique: true })
    @Field()
    coordinates: string;

    @Column()
    @Field()
    marqueur: any;

    @Column({ unique: true })
    @Field()
    address: string;

    @Column()
    @Field()
    nom: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    photo: string;

    @Column()
    @Field()
    createdBy: string; //id de l'utilisateur qui a crée le point d'interêt

    @ManyToMany(type => Category, category => category.id)
    category: Promise<Category>;

    @OneToOne(type => City, city => city.id)
    @JoinColumn()
    cityName : string; 

    @OneToMany(type => Note, note => note.id)
    note : Promise<Note>; 

    @OneToMany(type => Comment, comment => comment.id)
    comment: Promise<Comment>;
}

export default Poi; 