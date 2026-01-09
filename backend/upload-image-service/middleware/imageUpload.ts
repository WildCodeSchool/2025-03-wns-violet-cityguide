import multer from "multer";
import path from "path";
import * as fs from 'fs';
import { Request, Response, NextFunction } from "express";

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
	console.log('upload image has been called')
	try {
		if (!req.file || !req.file.buffer) {
			throw new Error("Aucun fichier à uploader !")
		}

		const nameWithoutSpace = path.parse(req.file.originalname).name.replace(/ /g, '_');
		const extension = path.extname(req.file.originalname);
		const filename = `${nameWithoutSpace}_${Date.now()}${extension}`;
		const filepath = path.join('./upload-image-service/images', filename)

		await fs.promises.writeFile(filepath, req.file.buffer);
		req.file.filename = filename;

		res.json({
			success: true,
			url: `/images/${filename}`,
			filename: filename
		});
	} catch (error: any) {
		console.error("L'upload de l'image a échouée", error);
		res.status(500).json({ error: error.message })
	}
}

export default uploadImage; 