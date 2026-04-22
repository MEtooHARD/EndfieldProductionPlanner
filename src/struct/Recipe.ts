
/**
 * Resources involved in recipies
 */
export interface Item { readonly name: string; readonly desc?: string; };

/**
 * Input or output of a recipe
 */
export interface ItemIO { readonly item: Item; readonly amount: number; };

/**
 * Input can be direct resource or another recipe (for multi-step production)
 */
export type RecipeInput = ItemIO | Recipe | ProductionLine;

/**
 * Output resource
 */
export type RecipeOutput = ItemIO;

/**
 * The machine used to process the recipe
 */
export interface Infra { readonly name: string; readonly desc?: string; }

export interface Recipe {
    readonly name: string,
    readonly desc?: string,
    readonly inputs: RecipeInput[],
    readonly outputs: RecipeOutput[],
    readonly duration: number,
    readonly equipment: Infra
}

export class ProductionLine {
    public readonly recipe: Recipe;

    constructor(recipe: Recipe) { this.recipe = recipe; }
}