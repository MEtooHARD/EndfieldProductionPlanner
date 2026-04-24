import type { Base, ProductionLine } from "./Recipe";


export class Config {
    private config: object;

    private id_pool: Set<string> = new Set();

    private items: Map<string, Base.Item> = new Map();
    private infras: Map<string, Base.Infra> = new Map()
    private recipes: Map<string, Base.Recipe> = new Map();

    private prod_lines: Map<string, ProductionLine> = new Map();

    constructor(config: string) {
        this.config = JSON.parse(config);
        this.apply_config(this.config);
    }

    public apply_config(json: Record<string, any>) {
        if (!('items' in json) || !Array.isArray(json['items']))
            throw new Error('Config must have an array of items');
        if (!('infras' in json) || !Array.isArray(json['infras']))
            throw new Error('Config must have an array of infras');
        if (!('recipes' in json) || !Array.isArray(json['recipes']))
            throw new Error('Config must have an array of recipes');
        if (!('prod_lines' in json) || !Array.isArray(json['prod_lines']))
            throw new Error('Config must have an array of prod_lines');

        json['items'].forEach((item: Record<string, any>, idx) => {
            try {
                const i = this.item(item);
                if (this.items.has(i.name))
                    throw new Error(`Duplicate item name: ${i.name}`);
                this.items.set(i.name, i);
            } catch (error: any) {
                throw new Error(`Error occurred while processing the ${idx + 1}th item: ${error.message}`);
            }
        });

        json['infras'].forEach((infra: Record<string, any>, idx) => {
            try {
                const i = this.infra(infra);
                if (this.infras.has(i.name))
                    throw new Error(`Duplicate infra name: ${i.name}`);
                this.infras.set(i.name, i);
            } catch (error: any) {
                throw new Error(`Error occurred while processing the ${idx + 1}th infra: ${error.message}`);
            }
        });
    };

    private item(json: Record<string, any>): Base.Item {
        if (!('name' in json))
            throw new Error('Item must have a name');
        if (typeof json['name'] !== 'string')
            throw new Error('Item name must be a string');
        if ('desc' in json && typeof json['desc'] !== 'string')
            throw new Error('Item description must be a string');

        return { name: json['name'], desc: json['desc'] || '' };
    }

    private infra(json: Record<string, any>): Base.Infra {
        return { ...this.item(json), recipes: [] };
    }
}