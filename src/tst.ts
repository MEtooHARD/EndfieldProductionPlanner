
import { type Infra, type Item, ProductionLine, type Recipe } from './struct/Recipe';

const Furnace: Infra = { name: 'Furnace' };

const BlueIron: Item = { name: 'Blue Iron' };

const BlueIronIngot: Item = { name: 'Blue Iron Ingot' };

const RefineBlueIron: Recipe = {
    name: 'Refine Blue Iron',
    equipment: Furnace,
    inputs: [{ item: BlueIron, amount: 1 }],
    outputs: [{ item: BlueIronIngot, amount: 1 }],
    duration: 2
};

const line = new ProductionLine(RefineBlueIron);