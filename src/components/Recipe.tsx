import type { Base } from "../struct/Recipe"


interface Props {
    recipe: Base.ConfigRecipe;
}

export default function RecipeIO({ recipe }: Props) {
    return <div className="flex flex-col p-2">
        <div className="flex">
            <div className="flex flex-col">{recipe.inputs.map((item, idx) => <div key={idx}>{item.quantity}*{item.item}</div>)}</div>
            <div className="w-2"></div>
            <div>{recipe.duration}s</div>
            <div className="w-2"></div>
            <div className="flex flex-col">{recipe.outputs.map((item, idx) => <div key={idx}>{item.quantity}*{item.item}</div>)}</div>
        </div>
    </div>
}