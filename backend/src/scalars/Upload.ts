import { GraphQLScalarType } from "graphql";
// import la classe de base pour créer un type scalair custom pour GraphQl
// Un type scalaire est un type primitif en GraphQL (comme string, boolean, Int)

export const Upload = new GraphQLScalarType({
	// crée un nouveau type scalaire customisé pour les file uploads
	// ceci dit à GraphQL "Upload" est un type scalaire valide et utilisable
	name : 'Upload', // nom de notre type scalaire dans le schéma GraphQL
	description: 'The `Upload` scalar type represents a file upload.', // Documentation qui apparait dans le schema d'introspection GraphQL
})