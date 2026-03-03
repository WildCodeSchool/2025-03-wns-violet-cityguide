import { useState, type FormEvent } from "react";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "../generated/graphql-types";
import useStyleColors from "../pages/backofficeHandler/styleColors";


type Category = {
	categoryName: string,
	categoryId: number,
	style: string
}

export default function BackofficeCategory() {
	// Get toutes les catégories existantes 
	const { data: allCategoriesData, loading: allCategoriesLoading, error: allCategoriesError } = useGetAllCategoriesQuery();

	// Import des couleurs 
	const [importedColors, setImportedColors] = useState(true);
	const { colors } = useStyleColors()
	const importedColorsHandler = () => {
		if (!colors) {
			return setImportedColors(false)
		} else {
			return setImportedColors(true)
		}
	}

	// Gestion de la tab : ajout de catégorie ou administration des catégories déjà existantes 
	const [adminTabCategories, setAdminTabsCategories] = useState('add-categories');
	const handleAdminTabCategories = (tab: string) => {
		setAdminTabsCategories(tab);
		importedColorsHandler()
	}

	/** CREATE  A  NEW  CATEGORY */
	//Mutation de creation de nouvelle catégorie 
	const [createCategory] = useCreateCategoryMutation({
		refetchQueries: ['GetAllCategories'] //refetch pour permettre le le refresh des catégories avec la nouvelle catégorie
	})

	// Ajout d'une nouvelle catégorie à partir des informations du formulaire
	const handleAddCategory = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target;
		const formAddCategoryData = new FormData(form as HTMLFormElement);
		const fromJsonAddCategory = Object.fromEntries(formAddCategoryData.entries())

		try {
			const result = await createCategory({
				variables: {
					data: {
						categoryName: fromJsonAddCategory['categoryName'] as string,
						style: fromJsonAddCategory['style'] as string
					}
				}
			});

			if (result.data) {
				alert('Category created ! ')
			}
			if (result.errors) {
				throw new Error(result.errors[0].message);
			}
		} catch (error) {
			alert('Une nouvelle catégorie a été crée !')
			console.error('Error creating new category : ', error)
		}
	}

	/**
	 * Edit les catégories 
	 */
	// Mutation d'update des catégories 
	const [update] = useUpdateCategoryMutation({
		refetchQueries: ['GetAllCategories']
	})

	// gère l'apparition de la zone d'édition de la catégorie sélectionnée
	const [editCategory, setEditCategory] = useState(false);
	// Store les informations initales de la catégorie sélectionnée 
	const [editCategoryInfo, setEditCategoryInfo] = useState({
		editName: '', 
		editStyle : '', 
		editId: 0
	})
	// Fonction qui se charge de récupérer les informations de la catégorie sélectionnée
	const handleEditCategory = (name: string, style: string, id: number) => {
		if (editCategory === true) setEditCategory(false)
		if (editCategory === false) setEditCategory(true)

		if (editCategoryInfo.editName === name) {
			setEditCategory(false) // Si une catégorie est éditée et que l'on reclique sur elle, on referme le formulaire d'édition 
			setEditCategoryInfo({
				editName: '', 
				editStyle : '', 
				editId: 0
			})
		} else {
			if (!name || !style || !id) {
				console.error('Une erreur est survenue lors du chargement de la catégorie sélectionnée.'); 
				return 
			}
			setEditCategory(true)
			setEditCategoryInfo({
				editName: name, 
				editStyle: style, 
				editId: id
			});
		}
	}

	// fonction remplace les informations de la catégorie éditiées par les nouvelles informations
	const sendEditCategory = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.target;
		console.log("form is : ", form)
		const formEditCategoryData = new FormData(form as HTMLFormElement);
		console.log("formEditCategoryData is : ", formEditCategoryData)
		const fromJsonEditCategory = Object.fromEntries(formEditCategoryData.entries())

		try {
			const editResult = await update({
				variables: {
					data: {
						categoryName: fromJsonEditCategory.categoryName as string || editCategoryInfo.editName as string,
						style: fromJsonEditCategory.style as string || editCategoryInfo.editStyle as string
					},
					categoryId: editCategoryInfo.editId as number
				}
			});

			if (editResult.data) {
				alert('Category updated ! ')
				console.log('category : ', editResult.data)
				setEditCategory(false)
			}
			if (editResult.errors) {
				throw new Error(editResult.errors[0].message);
			}
		} catch (error) {
			console.error('Error updating : ', error)
		}
	}


	/**
	 * Supprime une catégorie
	 */
	const [ deleteOneCategory ] = useDeleteCategoryMutation({
		refetchQueries: ['GetAllCategories']
	})
	const [userWantsToDeleteCategory, setUserWantsToDeleteCategory] = useState(false);
	const handleDeleteCategory = () => {
		setUserWantsToDeleteCategory(true)
		alert('Attention, si vous surpprimez cette catégorie. Veuillez modifier les poi qui y sont associés. Assurez-vous que cette catégorie n\'est associé à aucun POI')
	}

	const handleDeleteCategoryQuery = async () => {
		try {
			const result = await deleteOneCategory({
				variables: {
					categoryId : editCategoryInfo.editId
				}
			})

			if (result.data) alert('Categorie supprimée')
			if (result.errors) throw new Error(result.errors[0].message);
			setUserWantsToDeleteCategory(false)
			setEditCategory(false)
			setEditCategoryInfo({
				editName: '', 
				editStyle: '', 
				editId: 0
			});
			
		} catch (error) {
			console.error(`La catégorie ${editCategoryInfo.editName} n'a pas pu être supprimé.`, error)
		}
	}

	return (
		<>
			<h2>Catégories</h2>
			<div className="tab__container">
				<div className={"tab__btn " + (adminTabCategories === 'add-categories' ? 'active' : '')} onClick={() => handleAdminTabCategories('add-categories')}>
					<h3>Ajouter une catégorie</h3>
				</div>
				<div className={"tab__btn " + (adminTabCategories === 'admin-categories' ? 'active' : '')} onClick={() => handleAdminTabCategories('admin-categories')}>
					<h3>Administrer les catégories</h3>
				</div>
			</div>

			<div className="backoffice-container">
				{adminTabCategories === "add-categories" &&
					<form onSubmit={handleAddCategory}>
						<label htmlFor="categoryName">Nom de la catégorie à ajouter
							<input type="text" name="categoryName" placeholder="Musée, restaurant..." required />
						</label>
						{importedColors &&
							<label htmlFor="style">Sélectionnez une couleur de pin
								<select name="style">
									{Object.entries(colors).map(([key, value]) => (
										<option key={key} value={key} style={{ color: value }}>{key}</option>
									))}
								</select>
							</label>
						}
						<input type="submit" value="Créer la nouvelle catégorie" />
					</form>}
				{adminTabCategories === 'admin-categories' &&
					<div>
						<label>Sélectionnez une catégorie</label>
						<div className="container-row">
							{allCategoriesData &&
								allCategoriesData?.getAllCategories.map((category: Category) => (
									<div className="category-tag" key={category.categoryId} onClick={() => handleEditCategory(category.categoryName, category.style, category.categoryId)}>
										<div className="category-tag__pin" style={{ backgroundColor: category.style }} ></div>
										<div className="category-tag__name">{category.categoryName}</div>
									</div>
								))}
						</div>

						{editCategory === true &&
							<div className="backoffice-container relative">
								<h4>Editer la catégorie</h4>
								<div className="close" onClick={() => setEditCategory(false)}>
									<svg height={15} width={15}>
										<line x1="2" y1="2" x2="10" y2="10" style={{ stroke: "red", strokeWidth: 1 }} />
										<line x1="
									2" y1="10" x2="10" y2="2" style={{ stroke: "red", strokeWidth: 1 }} />
									</svg>
								</div>

								<form onSubmit={sendEditCategory}>

									<label htmlFor="current-category-name">Nom actuel de la catégorie 
										<p> {editCategoryInfo.editName}</p>
									</label>

									<label htmlFor="categoryName">Nouveau nom
										<input type="text" name="categoryName" placeholder={editCategoryInfo.editName} />
									</label>

									<label htmlFor="current-style">Couleur actuelle de la catégorie :
										<div style={{ width: '25px', height: '25px', borderRadius: '90px', backgroundColor: editCategoryInfo.editStyle, marginRight: '0.8rem', marginLeft: '0.8rem' }}></div>
										<span>{editCategoryInfo.editStyle}</span>
									</label>

									<label htmlFor="style">Sélectionnez une nouvelle couleure de pin
										<select name="style">
											{Object.entries(colors).map(([key, value]) => (
												<option key={key} value={key} style={{ color: value }}>{key}</option>
											))}
										</select>
									</label>
									<div className="edit-zone">
										<input type="submit" value="modifier la catégorie" />
									</div>
								</form>


								<hr></hr>
								<div className="danger-zone">
									<span style={{ textTransform: 'uppercase' }}>Zone de danger !</span>
									{userWantsToDeleteCategory === false && <button onClick={() => handleDeleteCategory()}>Supprimer la catégorie</button>}
									{userWantsToDeleteCategory === true &&
										<>
											<button onClick={() => setUserWantsToDeleteCategory(false)}>Annuler la suppresion</button>
											<button onClick={handleDeleteCategoryQuery}>Confirmer la suppression de la catégorie{editCategoryInfo.editName}</button>
										</>
									}
								</div>
							</div>
						}
					</div>}
			</div>
		</>
	)
}