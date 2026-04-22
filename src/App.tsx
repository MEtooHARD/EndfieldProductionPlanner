import './App.css';
import ProdLine from './components/Recipe';
import { ProductionLine, type Base } from './struct/Recipe';


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

// const line = new ProductionLine(RefineBlueIron);

function App() {

  return <>
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <div className='flex '>a</div>
      <span className='h-[1px] bg-gray-500 w-4 m-1'></span>
      <ProdLine recipe={RefineBlueIron} /></div>
  </>
}

export default App
