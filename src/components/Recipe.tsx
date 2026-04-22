import type { Base } from "../struct/Recipe";

export interface RecipeProps {
    recipe: Base.Recipe
}

export default function ProdLine({ recipe }: RecipeProps) {
    return <div className="flex flex-col border-2 rounded-xl">
        <div className="">{recipe.name}</div>
        <div className="flex">
            <div className="flex flex-col">
                {recipe.inputs.map((input, i) => <></>)}
            </div>
        </div>
    </div>
}