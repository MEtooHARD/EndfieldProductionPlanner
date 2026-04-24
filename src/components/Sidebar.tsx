import { useState } from "react";
import type { Base } from "../struct/Recipe";
import ItemManager from "./Sidebar/ItemManager";
import ProdLineManager from "./Sidebar/ProdLineManager";
import RecipeManager from "./Sidebar/RecipeManager";
import InfraManager from "./Sidebar/InfraManager";


interface Props {
    config: Base.Config;
    set_config: React.Dispatch<React.SetStateAction<Base.Config>>;
}

export default function Sidebar({ config, set_config }: Props) {
    const [page_num, set_page_num] = useState<number>(0);

    const add_item = (name: string) => {
        if (!config.items.some(item => item.name === name))
            set_config({ ...config, items: [...config.items, { name }] });
    }

    const del_item = (name: string) => {
        const involved_recipies = config.recipes.filter(recipe => recipe.inputs.some(input => input.item === name
            || recipe.outputs.some(output => output.item === name)));

        if (involved_recipies.length > 0)
            return alert(`Cannot delete item "${name}" because it is involved in the following recipies:\n${involved_recipies.map(r => r.name).join('\n')}`);

        set_config({ ...config, items: config.items.filter(item => item.name !== name) });
        alert(`Item "${name}" deleted successfully`);
    }

    const add_recipe = (recipe: Base.ConfigRecipe): boolean => {
        if (config.recipes.some(r => r.name === recipe.name)) {
            alert(`Recipe "${recipe.name}" already exists thus operation is cancelled.`);
            return false;
        }

        set_config({ ...config, recipes: [...config.recipes, recipe] });
        return true;
    }

    const del_recipe = (name: string) => {

        const involved_prod_lines = config.prod_lines.filter(line => line.recipe === name);

        if (involved_prod_lines.length > 0)
            return alert(`Cannot delete recipe "${name}" because it is involved in the following production lines:\n${involved_prod_lines.map(l => l.name).join('\n')}`);

        if (window.confirm(`Are you sure to delete recipe "${name}"?`)) {
            set_config({ ...config, recipes: config.recipes.filter(r => r.name !== name) });
            alert(`Recipe "${name}" deleted successfully`);
        }
    }

    const update_recipe = (origin: string, new_recipe: Base.ConfigRecipe): boolean => {
        if (origin !== new_recipe.name && config.recipes.some(r => r.name === new_recipe.name)) {
            alert(`Recipe "${new_recipe.name}" already exists, the operation is cancelled.`);
            return false;
        }

        const idx = config.recipes.findIndex(r => r.name === origin);
        if (idx !== -1) {
            const updated_recipes = [...config.recipes];
            updated_recipes[idx] = new_recipe;
            set_config({ ...config, recipes: updated_recipes });
        }
        return true;
    }

    const add_infra = (infra: Base.ConfigInfra) => { }

    const del_infra = (name: string) => { }

    return <>
        <div className='flex flex-col w-fit border-r bg-gray-700'>
            <div className="flex justify-around items-center
            w-full h-fit border-b text-2xl whitespace-nowrap
            border-gray-400 text-gray-300 font-semibold divide-gray-200">
                {(['Prod Line', 'Recipe', 'Infra', 'Item'] as string[]).flatMap((_, i, arr) => {
                    const element = (
                        <div key={i}
                            className={`min-w-fit flex-1 p-2
                                bg-gray-500 ${page_num === i ? 'text-gray-900 bg-yellow-300' : ''}
                                cursor-pointer select-none
                                hover:bg-gray-400 hover:text-gray-700`}
                            onClick={() => set_page_num(i)}>
                            {_}
                        </div>
                    );

                    return i < arr.length - 1
                        ? [element, <span key={`divider-${i}`} className="w-px h-3/5 bg-gray-200"></span>]
                        : [element];
                })}
            </div>
            {page_num === 0 && <ProdLineManager />}

            {page_num === 1 && <RecipeManager config={config}
                add_recipe={add_recipe}
                del_recipe={del_recipe}
                update_recipe={update_recipe} />}

            {page_num === 2 && <InfraManager infras={config.infras} add_infra={add_infra} del_infra={del_infra} />}

            {page_num === 3 && <ItemManager items={config.items} add_item={add_item} del_item={del_item} />}
        </div>
    </>
}