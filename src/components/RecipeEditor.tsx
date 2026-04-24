import { useEffect, useState } from "react";
import type { Base } from "../struct/Recipe";
import ItemIOEditor from "./ItemIOEditor";
import { validate_recipe } from "../static_conf";


interface Props {
    recipe: Base.ConfigRecipe;
    set_recipe: (recipe: Base.ConfigRecipe) => void;
    recipes: Base.ConfigRecipe[];
    items: Base.ConfigItem[];
    infras: Base.ConfigInfra[];
}

export default function RecipeEditor({ recipe, set_recipe, recipes, items, infras }: Props) {
    const [copy_recipe, set_copy_recipe] = useState<Base.ConfigRecipe>(recipe);

    useEffect(() => { set_copy_recipe(recipe); }, [recipe]);

    const update_input_item = (idx: number, new_item: string) => {
        const new_inputs = copy_recipe.inputs.map((input, i) =>
            i === idx ? { ...input, item: new_item } : input
        );
        set_copy_recipe({ ...copy_recipe, inputs: new_inputs });
    };

    const update_input_quantity = (idx: number, new_quantity: number) => {
        const new_inputs = copy_recipe.inputs.map((input, i) =>
            i === idx ? { ...input, quantity: new_quantity } : input
        );
        set_copy_recipe({ ...copy_recipe, inputs: new_inputs });
    };

    const delete_input = (idx: number) => {
        const new_inputs = copy_recipe.inputs.filter((_, i) => i !== idx);
        set_copy_recipe({ ...copy_recipe, inputs: new_inputs });
    };

    const add_input = () => {
        const new_input = { item: '', quantity: 1 };
        set_copy_recipe({ ...copy_recipe, inputs: [...copy_recipe.inputs, new_input] });
    };

    const update_output_item = (idx: number, new_item: string) => {
        const new_outputs = copy_recipe.outputs.map((output, i) =>
            i === idx ? { ...output, item: new_item } : output
        );
        set_copy_recipe({ ...copy_recipe, outputs: new_outputs });
    };

    const update_output_quantity = (idx: number, new_quantity: number) => {
        const new_outputs = copy_recipe.outputs.map((output, i) =>
            i === idx ? { ...output, quantity: new_quantity } : output
        );
        set_copy_recipe({ ...copy_recipe, outputs: new_outputs });
    };

    const delete_output = (idx: number) => {
        const new_outputs = copy_recipe.outputs.filter((_, i) => i !== idx);
        set_copy_recipe({ ...copy_recipe, outputs: new_outputs });
    };

    const add_output = () => {
        const new_output = { item: '', quantity: 1 };
        set_copy_recipe({ ...copy_recipe, outputs: [...copy_recipe.outputs, new_output] });
    };


    return <div className="flex flex-col border rounded-md p-2 space-y-1">
        <div className="flex space-x-2 justify-between">
            <div className="flex space-x-2">
                <div className="text-gray-300 font-semibold">Name</div>
                <input
                    className="font-semibold border text-gray-300 rounded-sm"
                    value={copy_recipe.name}
                    onChange={(e) => set_copy_recipe({ ...copy_recipe, name: e.target.value })} />
            </div>
            <div className="flex space-x-2">
                <div className="text-gray-300 font-semibold">Infra</div>
                <select value={copy_recipe.infra}
                    className="font-semibold border text-gray-300 rounded-sm"
                    onChange={(e) => set_copy_recipe({ ...copy_recipe, infra: e.target.value })}>
                    <option value="" className="text-gray-700">-- Select Infra --</option>
                    {infras.map((infra, idx) => (
                        <option key={idx} value={infra.name} className="text-gray-700">
                            {infra.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
        <div className="flex space-x-4">
            <ItemIOEditor
                title="Inputs"
                itemIOs={copy_recipe.inputs}
                items={items}
                update_item={update_input_item}
                update_quantity={update_input_quantity}
                delete_io={delete_input}
                add_io={add_input}
                min_required={1}
                excluded_items={copy_recipe.outputs.map(o => o.item)}
            ></ItemIOEditor>

            <div className="flex flex-col justify-center items-center w-fit">
                <div className="text-gray-300 font-semibold">Time</div>
                <div className="flex">
                    <input value={copy_recipe.duration}
                        type="number" min="1" step="1"
                        className="border p-1 rounded-sm w-10 text-gray-300"
                        onChange={e => { set_copy_recipe({ ...copy_recipe, duration: parseInt(e.target.value) || 1 }) }} />
                    <div className="flex justify-end items-center text-gray-300 text-xl">s</div>
                </div>
            </div>

            <ItemIOEditor
                title="Outputs"
                itemIOs={copy_recipe.outputs}
                items={items}
                update_item={update_output_item}
                update_quantity={update_output_quantity}
                delete_io={delete_output}
                add_io={add_output}
                min_required={1}
                excluded_items={copy_recipe.inputs.map(i => i.item)}
            ></ItemIOEditor>
        </div>
        <div className="flex justify-center">
            <button className="border-2 px-4 py-0.5 rounded-lg
            text-blue-400 font-semibold
            cursor-pointer select-none
            hover:bg-blue-400 hover:text-gray-700"
                onClick={() => { if (validate_recipe(copy_recipe)) set_recipe(copy_recipe); }}>
                Save
            </button>
        </div>
    </div>
}