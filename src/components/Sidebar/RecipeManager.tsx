import { useState } from "react";
import { empty_recipe } from "../../static_conf";
import type { Base } from "../../struct/Recipe";
import RecipeIO from "../Recipe";
import RecipeEditor from "../RecipeEditor";


interface Props {
    config: Base.Config;
    add_recipe: (recipe: Base.ConfigRecipe) => boolean;
    del_recipe: (name: string) => void;
    update_recipe: (origin: string, new_recipe: Base.ConfigRecipe) => boolean;
}

export default function RecipeManager({ config, add_recipe, del_recipe, update_recipe }: Props) {
    const [editing_recipe, set_editing_recipe] = useState<Base.ConfigRecipe | null>(null);

    const [editing_idx, set_editing_idx] = useState<number>(-1);

    const save_recipe = (recipe: Base.ConfigRecipe) => {
        if (editing_idx === -1) { // new recipe
            const success = add_recipe(recipe);
            if (success) {
                set_editing_recipe(null);
                set_editing_idx(-1);
            };
        } else { // update existing recipe
            const success = update_recipe(config.recipes[editing_idx].name, recipe);
            // if (success) {
            //     set_editing_recipe(null);
            //     set_editing_idx(-1);
            // }
        }
    }

    return <div className="flex flex-col size-full items-center p-2">
        <div className="m-2 text-2xl text-gray-300 font-semibold">
            Recipes
        </div>
        {(editing_recipe) && <RecipeEditor
            recipe={editing_recipe}
            infras={config.infras}
            items={config.items}
            recipes={config.recipes}
            set_recipe={save_recipe}></RecipeEditor>}
        <span className="w-full h-0.5 bg-gray-300 m-2"></span>
        <div className="flex flex-col w-full h-full max-h-full border rounded-md p-1 space-y-1 overflow-y-auto hide-scrollbar">
            <div className="flex justify-center items-center
            w-full rounded-full border-2 font-semibold text-green-400
            cursor-pointer select-none
            hover:bg-green-400 hover:text-gray-700"
                onClick={() => {
                    if (editing_idx !== -1) {
                        const confirmed = window.confirm("Are you sure to exit current edit");
                        if (!confirmed) return;
                    }
                    set_editing_recipe(empty_recipe());
                    set_editing_idx(-1);
                }}>
                + New
            </div>
            {config.recipes.map((recipe, idx) => (
                <div key={idx}
                    className={`flex border justify-between rounded-sm p-1.5
                        ${editing_idx === idx ? 'border-blue-500' : 'border-gray-300'}
                        cursor-pointer
                        hover:bg-gray-600`}>
                    <div className="flex flex-col">
                        <div>{recipe.name}</div >
                        <RecipeIO recipe={recipe}></RecipeIO>
                    </div>
                    <div className="flex flex-col space-y-2 justify-around">
                        <div className="flex justify-center items-center
                        border-2 rounded-md px-2 font-semibold text-blue-400
                        cursor-pointer select-none
                        hover:bg-blue-400 hover:text-gray-700"
                            onClick={() => {
                                if (editing_idx !== idx) {
                                    const confirmed = window.confirm("Are you sure to exit current edit");
                                    if (!confirmed) return;
                                }
                                set_editing_recipe(recipe);
                                set_editing_idx(idx);
                            }}>
                            Edit
                        </div>
                        <div className="flex justify-center items-center
                        border-2 rounded-md px-2 font-semibold text-red-400
                        cursor-pointer select-none
                        hover:bg-red-400 hover:text-gray-700"
                            onClick={() => { del_recipe(recipe.name) }}>
                            Del
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}