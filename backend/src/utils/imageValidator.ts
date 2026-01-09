import * as fileType from 'file-type'; 
import sharp from 'sharp';

export async function validateImage(buffer: Buffer): Promise<boolean> {
	try {
		const type = await fileType.fromBuffer(buffer); 

		if (!type || !['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(type.mime)) {
			throw new Error('Type de l\'image invalide');
		}

		const metadata = await sharp(buffer).metadata(); 
		if (buffer.length > 5 * 1024 * 1024) {
			throw new Error('Fichier trop large')
		}

		return true; 

	} catch(error) {
		console.error('La validation de l\'image a échoué', error);
		return false
	}
}