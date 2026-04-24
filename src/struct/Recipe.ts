export namespace Base {
    /**
     * Resources involved in recipies
     */
    export interface Item {
        readonly name: string;
        readonly desc?: string;
    };

    /**
     * Input or output of a recipe
     */
    export interface ItemIO {
        readonly item: string;
        readonly quantity: number;
    };

    /**
     * The machine used to process the recipe
     */
    export interface Infra {
        readonly name: string;
        readonly desc?: string;
        readonly recipes: Recipe[];
    }

    export interface Recipe {
        readonly name: string,
        readonly desc?: string,
        readonly inputs: ItemIO[],
        readonly outputs: ItemIO[],
        readonly duration: number,
        readonly equipment: Infra
    }

    export interface ConfigItem extends Item { };

    export interface ConfigRecipe extends Omit<Recipe, 'equipment'> {
        readonly infra: string;
    };

    export interface ConfigInfra {
        readonly name: string;
        readonly desc?: string;
    }

    export interface ConfigProductionLine {
        readonly id: string;
        readonly name: string;
        readonly recipe: string;
    }

    export interface Config {
        readonly items: ConfigItem[];
        readonly infras: ConfigInfra[];
        readonly recipes: ConfigRecipe[];
        readonly prod_lines: ConfigProductionLine[];
    }
}

export class ProductionLine {
    public readonly id: string
    public readonly name: string;

    public readonly recipe: Base.Recipe;
    public readonly input: ProductionLine[] = [];

    constructor(id: string, name: string, recipe: Base.Recipe, input: ProductionLine[] = []) {
        this.id = id;
        this.name = name;
        this.recipe = recipe;
        this.input = input;
    }
}

export class ResourcePool {
    private resources: Map<string, Base.ItemIO> = new Map();
}
