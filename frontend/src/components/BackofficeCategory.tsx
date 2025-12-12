import { useState } from "react";
import { useCreateCategoryMutation, useGetAllCategoriesQuery } from "../generated/graphql-types";
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
	const [editCategory, setEditCategory] = useState(false);
	const [editCategoryName, setEditCategoryName] = useState('')
	const [editCategoryStyle, setEditCategoryStyle] = useState('')
	const handleEditCategory = (name: string, style: string) => {
		if (editCategory === true) setEditCategory(false)
		if (editCategory === false) setEditCategory(true)

		if (editCategoryName === name) {
			setEditCategory(false)
		} else {
			setEditCategory(true)
			setEditCategoryName(name);
			setEditCategoryStyle(style);
		}
		//TODO : add resolver here once it's done
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
			<h3><div style={{ display: "inline-flex", flexDirection: "row", justifyContent: "flex-start", gap: "2rem", width: "100%" }}><div className={"tabBtn " + (adminTabCategories === 'add-categories' ? 'active' : '')} onClick={() => handleAdminTabCategories('add-categories')}>Ajouter une catégorie</div><div className={"tabBtn " + (adminTabCategories === 'admin-categories' ? 'active' : '')} onClick={() => handleAdminTabCategories('admin-categories')}>Administrer les catégories</div></div></h3>
			{adminTabCategories === "add-categories" &&
				<div className="add-categories section-part">
					<form onSubmit={handleAddCategory} className="flex-column">
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
					</form>
				</div>}
			{adminTabCategories === 'admin-categories' &&
				<div className="admin-categories section-part">
					<label>Sélectionnez une catégorie</label>
					<div className="flex-center">
						{allCategoriesData &&
							allCategoriesData?.getAllCategories.map((category: Category) => (
								<div className="category-tag" key={category.categoryId} onClick={() => handleEditCategory(category.categoryName, category.style)}>
									<div className="category-tag__pin" style={{ backgroundColor: category.style }} ></div>
									<div className="category-tag__name">{category.categoryName}</div>
								</div>
							))}

					</div>
					{editCategory === true &&
						<div className="flex-center input-field">Editer la catégorie
							<label htmlFor="current-category-name">Nom actuel de la catégorie
								<input type="text" name="current-category-name" value={editCategoryName} readOnly />
							</label>
							<label htmlFor="categoryName">Nouveau nom
								<input type="text" name="categorName" placeholder={editCategoryName} />
							</label>
							<label htmlFor="current-style">Couleur actuelle de la catégorie
								<div style={{ width: '50px', height: '50px', borderRadius: '90px', backgroundColor: editCategoryStyle }}></div>
							</label>
							<label htmlFor="style">Sélectionnez une nouvelle couleure de pin
								<select name="style">
									{Object.entries(colors).map(([key, value]) => (
										<option key={key} value={key} style={{ color: value }}>{key}</option>
									))}
								</select>
							</label>
							<input type="submit" value="modifier la catégorie" />
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
		</>
	)
}