interface CategoryInputProps {
  category: string;
  categories: string[];
  onUpdateCategory: (category: string) => void;
  onAddCategory: (category: string) => void;
  onRemoveCategory: (category: string) => void;
}

export default function CategoryInput({
  category,
  categories,
  onUpdateCategory,
  onAddCategory,
  onRemoveCategory,
}: CategoryInputProps) {
  return (
    <div>
      <label htmlFor="title">카테고리</label>
      <div className="flex gap-2 items-center">
        <input
          className="mt-2 border-[1px] border-slate-300 w-full rounded-2xl px-4 py-2"
          id="title"
          type="text"
          value={category}
          onChange={(e) => onUpdateCategory(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddCategory(category);
          }}
          className="shrink-0 bg-gray-500 mt-2 h-9 text-white px-4 rounded-xl"
        >
          추가
        </button>
      </div>
      <div className="mt-4 flex gap-2 flex-wrap">
        {categories.map((category) => (
          <div
            className="bg-red-400 py-1 px-2 flex items-center gap-2 text-sm rounded-md text-white"
            key={category}
          >
            {category}
            <button
              onClick={() => onRemoveCategory(category)}
              className="text-xs"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
