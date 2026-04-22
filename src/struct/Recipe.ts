export namespace Base {
    /**
     * Resources involved in recipies
     */
    export interface Item { readonly name: string; readonly desc?: string; };

    /**
     * Input or output of a recipe
     */
    export interface ItemIO { readonly item: Item; readonly amount: number; };

    /**
     * The machine used to process the recipe
     */
    export interface Infra { readonly name: string; readonly desc?: string; }

    export interface Recipe {
        readonly name: string,
        readonly desc?: string,
        readonly inputs: ItemIO[],
        readonly outputs: ItemIO[],
        readonly duration: number,
        readonly equipment: Infra
    }
}

export class ProductionLine {
    public readonly recipe: Base.Recipe;
    public readonly input: ProductionLine[] = [];

    constructor(recipe: Base.Recipe) { this.recipe = recipe; }
}

export class ResourcePool {
    private resources: Map<string, Base.ItemIO> = new Map();
}
