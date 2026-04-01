import sharp from 'sharp';
import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import { Request, Response, NextFunction } from 'express';

// Qu'est-ce qu'un buffer et pourquoi l'utiliser ici ?
// Un buffer est une séquence de données binaires stockée en mémoire (RAM). Cela nous permet de pouvoir gérer le fichier avant de l'analyser et de décider quoi en faire. 

export const imageValidator = async (req: Request, res :Response, next: NextFunction) => {
	console.log('Image Validator has been called ! ')
	try {
		if (!req.file) {
			return res.status(400).json({ error:"Aucun fichier fourni"}); 
		}

		const buffer = req.file.buffer; //Le buffer est donné par multer

		// On valide le type du fichier
		const type = await fileTypeFromBuffer(buffer); 
		if (!type) throw new Error("Impossible de déterminer le type du fichier.");

		// On valide que le type de fichier est effectivement une image
		const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]; 
		if (!validTypes.includes(type.mime)) {
			throw new Error(`Type invalide: ${type.mime}`); 
		}

		const maxSize = 5 * 1024 * 1024; // 5 MB ; 
		if (buffer.length > maxSize) {
			throw new Error('Fichier trop volumineux (max 5MB)'); 
		}

		// Nous validons que l'image existe : que ses métadata sont valides
		const metadata = await sharp(buffer).metadata(); 
		if (!metadata.width || !metadata.height) {
			throw new Error("Dimension invalides");
		}

		// Si l'image est validé, nous passons au prochain middleware pour l'upload
		next()

	} catch (error : any){
		console.error("Validation de l'image a échouée", error); 
		return res.status(400).json({ error : error.message || 'Erreur de validation' })
	}
}