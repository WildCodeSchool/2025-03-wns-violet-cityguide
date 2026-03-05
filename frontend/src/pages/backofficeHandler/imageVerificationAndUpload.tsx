import { useState } from "react";

const microServiceFetchAddress = 'http://localhost:7000/image-verification'
const maxSize = 5 * 1024 * 1024 // 5 MB in bytes
const validType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * This is a custom hook to :
 * -verify the image (frontend side)
 * -verify the image (backend side)
 * -upload the image once all are checked and good
 */

export default function useImageVerificationAndUpload() {

	/*USE STATES*/

	// L'image est-elle valide ? Trois valeures sont utilisées : 'true' || 'false' || 'unverified'
	const [isImageValid, setImageValid] = useState('unverified');

	//L'image, si elle est correcte, est affichée pour que l'utilisateur puisse la visualiser
	const [displayImage, setDisplayImage] = useState(false);

	// l'url de l'image (depuis le fichier uploadé ou le lien donné par l'utilisateur) utilisée pour l'image de preview ou le lien
	const [imgSrc, setImgSrc] = useState('');

	// le message d'erreur affichée si l'image (lien ou uploadé) n'est pas valide
	const [imageError, setImageError] = useState('');


	// Utiliser pour réinitialiser les states
	const resetUseState = () => {
		setImageValid('');
		setDisplayImage(false);
		setImgSrc('');
		setImageError('')
	}

	// utiliser en export pour les state dans les composants
	const imageUploadUseState = () => {
		return {
			isImageValid,
			displayImage,
			imgSrc,
			imageError
		}
	}


	// étape finale
	// envoie de l'image vers le micro-service du backend pour les vérifications 
	const sendImageToBackendForUpload = (file: File) => {
		const formData = new FormData();
		formData.append('imageUrl', file);

		fetch(microServiceFetchAddress, {
			method: "POST",
			body: formData
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error ! status : ${response.status}`)
				}
				return response.json()
			})
			.then(data => {
				alert("Image uploadée avec succès !")
				setDisplayImage(true)
				setImgSrc(data.url)
				console.log(data)
			})
			.catch(error => {
				console.error('Upload failed:', error);
				setImageError('Erreur lors de l\'upload de l\'image');
				setDisplayImage(false)
				setImageValid('false');
			});
	}


	// On vérifie ici que l'image peut se charger correctement dans le navigateur
	const verifyImageLoad = (file: File): Promise<boolean> => {
		console.log('Verify image load a été appelé ! ', file)
		return new Promise((resolve) => {
			const img = new Image();
			const url = URL.createObjectURL(file);

			img.onload = () => {
				URL.revokeObjectURL(url);
				resolve(true)
			}

			img.onerror = () => {
				URL.revokeObjectURL(url);
				resolve(false)
			}

			img.src = url
		})
	}

	// On vérifie ici les Magic bytes pour être sûre que le fichier est effectivement une image
	const checkFileSignature = (file: File): Promise<boolean> => {
		return new Promise((resolve) => {
			const reader = new FileReader();

			reader.onloadend = (e) => {
				if (!e.target?.result) {
					resolve(false)
					return
				}

				const arr = new Uint8Array(e.target?.result as ArrayBuffer).subarray(0, 4);
				console.log("const arr = ", arr)
				let header = '';
				for (let i = 0; i < arr.length; i++) {
					header += arr[i].toString(16).padStart(2, '0');
				}

				const signatures: { [key: string]: string[] } = {
					'image/jpeg': ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2', 'ffd8ffe3', 'ffd8ffe8'],
					'image/png': ['89504e47'],
					'image/webp': ['52494646'], // RIFF (WebP starts with RIFF)
				}

				const isValid = Object.values(signatures)
					.flat()
					.some(sig => header.startsWith(sig));
				console.log('is valid fdrom check file sig : ', {
					isValid: isValid,
					header: header,
					arr: arr
				})
				resolve(isValid)
			};

			reader.onerror = () => resolve(false);
			reader.readAsArrayBuffer(file.slice(0, 4))
		})
	}



	// On vérifie dans un premier temps si l'image est d'un type valide
	const verifyImageType = (file: File | null) => {

		if (!file) throw new Error("Erreur lors de la vérification de l'image");

		if (!validType.includes(file.type) || file === null) {
			console.log('file type is not valid')
			setImageError('Format invalide. Utilisez JPG, JPEG, PNG ou WEBP.')
			setImageValid('false')
			return file = null;
		}
		return true
	}

	// on vérifie ensuite la taille de l'image
	const verifyImageSize = (file: File | null) => {
		if (!file) throw new Error("Erreur lors de la vérification de l'image")

		if (file.size > maxSize) {
			console.error("Le fichier est trop volumineux")
			setImageError('Image trop volumineuse. Taille Maximum : 5MB.');
			setImageValid('false')
			return file = null;
		}
		return true
	}

	// vérification de l'image côté front-end
	// vérifie que l'image est d'un type valide 
	// vérifie que l'image à la bonne taille 
	// les magic byte de l'image correspondent à ceux effectivement d'une image
	// on vérifique l'image peut effectivement s'afficher sur un navigateur
	const validateImageFrontEndSide = async (file: File | null) => {

		// on réinitialise les states
		resetUseState()

		if (!file) {
			console.error('Pas de fichier valide fournie.')
			setImageError('Erreur lors du chargement du fichier. Veuillez réessayer.');
			setImageValid('false');

		} else {

			const imageTypeIsValid = verifyImageType(file) // on vérifie le type du fichier
			const imageSizeIsValid = verifyImageSize(file) // on vérifie la taille du fichier

			if (imageSizeIsValid === true && imageTypeIsValid === true) {

				// Si l'image passe toutes les étapes, on passe à l'étape suivante

				const fileMagicSignatureIsValid = await checkFileSignature(file); // on vérifie la signature des images
				const fileVerifiedOnBrowserIsValid = await verifyImageLoad(file); // on vérifie qu'elle s'affiche correctement sur le navigateur

				if (fileMagicSignatureIsValid === true && fileVerifiedOnBrowserIsValid === true) {
					
					// l'image a passée tous les tests front-end et est envoyée aux backend pour les tests backend
					sendImageToBackendForUpload(file) 
					return setImageValid('true')

				} else {

					setImageError('Image invalide. Veuillez fournir une autre image (formats autorisés : png, jpeg, webp, jpg)');
					setImageValid('false')
					return file = null;
				}
			}
		}
	}




	// l'utilisateur a choisit d'envoyer un lien au lieu d'uploader une image
	const validateUrl = (url: string) => {

		// on réinitialise les states
		resetUseState()

		// on efface le fichier, si un fichier a été fournie avant le lien
		const fileInput = document.getElementById('imageUrl-file') as HTMLInputElement;
		if (fileInput) {
			fileInput.value = '';
		}

		// on vérifie que le lien est effectivement un lien grâce à une regex
		const regexUrl = new RegExp(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i);
		const match = url.match(regexUrl)
		console.log('regexUrl, match, and url', {
			url: url,
			regexUrl: regexUrl,
			match: match
		})

		if (!match) {
			setImageError('Veuillez fournir un lien valide ! en https')
		} else {
			setDisplayImage(true);
			setImageValid('true');
			setImgSrc(url)
		}
	}


	return {
		imageUploadUseState,
		resetUseState,
		validateImageFrontEndSide,
		validateUrl
	}
}