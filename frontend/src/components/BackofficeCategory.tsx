import { useState, type FormEvent } from "react";
import { useCreateCategoryMutation, useGetAllCategoriesQuery, useUpdateCategoryMutation } from "../generated/graphql-types";
import useStyleColors from "../pages/backofficeHandler/styleColors";


type Category = {
	categoryName: string,
	categoryId: number,
	style: string
}

export default function BackofficeCategory() {
	const [adminTabCategories, setAdminTabsCategories] = useState('add-categories');
	const { data: allCategoriesData, loading: allCategoriesLoading, error: allCategoriesError } = useGetAllCategoriesQuery();
	const [importedColors, setImportedColors] = useState(true);
	const { colors } = useStyleColors()
	const importedColorsHandler = () => {
		if (!colors) {
			return setImportedColors(false)
		} else {
			return setImportedColors(true)
		}
	}
	const handleAdminTabCategories = (tab: string) => {
		setAdminTabsCategories(tab);
		if (adminTabCategories === 'add-categories') importedColorsHandler()
	}

	const [createCategory] = useCreateCategoryMutation()
	const handleAddCategory = async (e: FormEvent<HTMLFormElement>) => {
		console.log("handleAddCategory has been called ! ")
		e.preventDefault();
		const form = e.target;
		console.log("form is : ", form)
		const formAddCategoryData = new FormData(form as HTMLFormElement);
		console.log("formAddCategoryData is : ", formAddCategoryData)
		const fromJsonAddCategory = Object.fromEntries(formAddCategoryData.entries())
		console.log("formJsonAddCategory : ", fromJsonAddCategory)

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
				console.log('category : ', result.data)
			}
			if (result.errors) {
				throw new Error(result.errors[0].message);
			}
		} catch (error) {
			console.error('Error creating new category : ', error)
		}
	}
	const [update] = useUpdateCategoryMutation()
	const [editCategory, setEditCategory] = useState(false);
	const [editCategoryName, setEditCategoryName] = useState('')
	const [editCategoryStyle, setEditCategoryStyle] = useState('')
	const [editCategoryId, setEditCategoryId] = useState(0)
	const handleEditCategory = (name: string, style: string, id: number) => {
		if (editCategory === true) setEditCategory(false)
		if (editCategory === false) setEditCategory(true)

		if (editCategoryName === name) {
			setEditCategory(false)
		} else {
			setEditCategory(true)
			setEditCategoryName(name);
			setEditCategoryStyle(style);
			setEditCategoryId(id)
			//TODO : add resolver here once it's done
		}
	}
	const sendEditCategory = async (e: FormEvent) => {
		e.preventDefault();
		const form = e.target;
		console.log("form is : ", form)
		const formEditCategoryData = new FormData(form as HTMLFormElement);
		console.log("formEditCategoryData is : ", formEditCategoryData)
		const fromJsonAddCategory = Object.fromEntries(formEditCategoryData.entries())
		console.log("formEditCategoryData : ", formEditCategoryData)

		let newCategoryName: string = ''
		let newCategoryStyle: string = ''

		try {
			if (fromJsonAddCategory['categoryName'] === editCategoryName) newCategoryName = editCategoryName
			if (fromJsonAddCategory['style'] === editCategoryStyle) newCategoryStyle = editCategoryStyle
			const editResult = await update({
				variables: {
					data: {
						categoryName: newCategoryName as string,
						style: newCategoryStyle as string
					},
					categoryId: editCategoryId as number
				}
			});

			if (editResult.data) {
				alert('Category updated ! ')
				console.log('category : ', editResult.data)
			}
			if (editResult.errors) {
				throw new Error(editResult.errors[0].message);
			}
		} catch (error) {
			console.error('Error updating : ', error)
		}
	}

	const [userWantsToDeleteCategory, setUserWantsToDeleteCategory] = useState(false);
	const handleDeleteCategory = () => {
		// TODO : add resolver here once it's done
		console.log('handle delete category has been called !')
		setUserWantsToDeleteCategory(true)
		return alert('Attention, supprimer la catégorie peut supprimer les POI qui y sont associé. Assurez-vous que cette catégorie n\'est associé à aucun POI')
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
									<line x1="2" y1="2" x2="10" y2="10" style={{stroke:"red",strokeWidth:1}}/>
									<line x1="
									2" y1="10" x2="10" y2="2" style={{stroke:"red",strokeWidth:1}}/>
								</svg>
							</div>

							<form onSubmit={sendEditCategory}>

								<label htmlFor="current-category-name">Nom actuel de la catégorie
									<span>{editCategoryName}</span>
								</label>
								
								<label htmlFor="categoryName">Nouveau nom
									<input type="text" name="categoryName" placeholder={editCategoryName} />
								</label>

								<label htmlFor="current-style">Couleur actuelle de la catégorie :
									<div style={{ width: '25px', height: '25px', borderRadius: '90px', backgroundColor: editCategoryStyle, marginRight:'0.8rem', marginLeft:'0.8rem' }}></div>
									<span>{editCategoryStyle}</span>
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
										<input type="submit" value={`Confirmer la suppression de la catégorie '${editCategoryName}'`} />
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