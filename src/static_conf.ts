import type { Base } from "./struct/Recipe";

export function empty_recipe(): Base.ConfigRecipe {
    return {
        name: '',
        inputs: [{ item: '', quantity: 1 }],
        outputs: [{ item: '', quantity: 1 }],
        duration: 1,
        infra: ''
    }
}


export function validate_recipe(recipe: Base.ConfigRecipe): boolean {
    if (recipe.name.trim().length === 0) {
        alert('Recipe name cannot be empty');
        return false;
    }
    if (recipe.inputs.length === 0) {
        alert('At least one input item is required');
        return false;
    }
    if (recipe.outputs.length === 0) {
        alert('At least one output item is required');
        return false;
    }
    if (recipe.inputs.some((input) => input.item.trim().length === 0)) {
        alert('Input item names cannot be empty');
        return false;
    }
    if (recipe.outputs.some((output) => output.item.trim().length === 0)) {
        alert('Output item names cannot be empty');
        return false;
    }
    if (recipe.infra.trim().length === 0) {
        alert('Infra cannot be empty');
        return false;
    }
    return true;
}

export const default_config: Base.Config = {
    items: [
        { name: "skibidi" },
        { name: "ohio" },
        { name: "six seven" },
        { name: "rizzmas" }
    ],
    infras: [
        {
            name: "furnace"
        },
        {
            name: "skibidi machine"
        }
    ],
    recipes: [
        {
            name: "among us",
            inputs: [
                {
                    item: "skibidi",
                    quantity: 1
                }
            ],
            outputs: [
                {
                    item: "ohio",
                    quantity: 1
                }
            ],
            duration: 2,
            infra: "furnace"
        },
        {
            name: "ohio skibidi",
            inputs: [],
            outputs: [
                {
                    item: "six seven",
                    quantity: 90
                }
            ],
            duration: 60,
            infra: "skibidi machine"
        }
    ],
    prod_lines: [
        {
            id: "123456",
            name: "whatever",
            recipe: "among us",
            type: 'primary'
        }
    ]
}