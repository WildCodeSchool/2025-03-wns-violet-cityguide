import express from "express";
import cors from 'cors';
import multer from "multer";
import path from "path";
import { imageValidator } from './middleware/imageValidator';
import uploadImage from './middleware/imageUpload';

const app = express()
const port = 4322
const router = express.Router();

// Ceci est le serveur du micro-service de vérification et d'upload d'image
// Ce que fait ce micro-service : 
// - vérifier que l'image est effectivement une image et que sa taille est correcte
// - uploader cette image une fois que les vérifications sont faite
// Retourner le lien de l'upload de l'image

// Configure multer en memory storage (temporaire)
// l'image arrive ici, et pour qu'elle soit utilisable, elle doit-être uploadé une premire fois 
// si l'image ne passe pas les validation, comme elle est en stockage temporaire, multer se charge de la supprimer
const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024 // 5 MB
	}
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your frontend URLs
  credentials: true
}));
app.use(express.json());

// Permet d'accéder à des fichiers statique depuis le repertoire 'image'
// sans cela, les images ne peuvent pas s'afficher 
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(router)

// Multer error handling middleware
//si l'image envoyé est plus volumineuse qu'autorisée que la configuration multer, une erreur est envoyé
const multerErrorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_FILE_SIZE') {
			return res.status(400).json({ error: 'Fichier trop volumineux (max 5MB)' });
		}
		return res.status(400).json({ error: `Erreur Multer: ${err.message}` });
	}
	next(err);
};

// Ceci est la route utilisée pour 'pré-uploader', vérifier, puis uploader l'image
router.post('/image-verification', 
	upload.single('imageUrl'), 
	multerErrorHandler,
	imageValidator, 
	uploadImage
)

// 404 handler for undefined routes
app.use((req, res) => {
	res.status(404).json({ error: 'Route non trouvée' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	console.error('Erreur non gérée:', err);
	res.status(err.status || 500).json({
		error: err.message || 'Erreur interne du serveur'
	});
});

// le serveur affiche ce message lorsqu'il a correctement démarré
app.listen(port, () => {
	console.log(`🖼️ Upload image micro-services is listening on port ${port} 🚀`)
})
