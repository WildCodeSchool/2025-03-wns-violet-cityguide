export default function useImageVerificationFrontend() {
	
	// Verify the image can be loaded as an image
	const verifyImageLoad = (file: File): Promise<boolean> => {
		console.log('Verify image load has been called ! ')
		return new Promise((resolve) => {
			const img = new Image();
			const url = URL.createObjectURL(file);
			console.log('image url =  ', url)
			
			img.onload = () => {
				URL.revokeObjectURL(url);
				resolve(true)
			}

			img.onerror = () => {
				URL.revokeObjectURL(url); 
				resolve(false)
			}
			
			img.src = url
			console.log('End of verifyImageLoad ')
		})
	}

	// Magic bytes check to be sure the image is indeed an image
	const checkFileSignature = (file: File): Promise<boolean> => {
		console.log("check file signature has been called ! ")
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
	return  {
		checkFileSignature, 
		verifyImageLoad
	}
}