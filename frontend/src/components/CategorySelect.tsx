type CategoryOption = { categoryId: number; categoryName: string };

export default function CategorySelect({
  categories,
  value,
  onChange,
  }: {
    categories: CategoryOption[];
    value: number | null;
    onChange: (id: number | null) => void;
}) {
    return (
        <div className="category">
            <select
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
                className="category__select red"
            >
                <option value="" className="category__select__results">Toutes les catégories</option>
                {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryId} className="category__select__results">
                        {category.categoryName}
                    </option>
                ))}
            </select>
        </div>
    );
}
