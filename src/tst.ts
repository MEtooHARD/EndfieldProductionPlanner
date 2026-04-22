import { Base } from './struct/Recipe'

const Furnace: Base.Infra = { name: 'Furnace' };

const BlueIron: Base.Item = { name: 'Blue Iron' };

const BlueIronIngot: Base.Item = { name: 'Blue Iron Ingot' };

const RefineBlueIron: Base.Recipe = {
    name: 'Refine Blue Iron',
    equipment: Furnace,
    inputs: [{ item: BlueIron, amount: 1 }],
    outputs: [{ item: BlueIronIngot, amount: 1 }],
    duration: 2
};

const line = new Base.ProductionLine(RefineBlueIron);