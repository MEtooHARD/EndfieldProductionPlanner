import { useState } from 'react';
import './App.css';
import RecipeIO from './components/Recipe';
import Sidebar from './components/Sidebar';
import { default_config } from './static_conf';
import { type Base } from './struct/Recipe';
import RecipeEditor from './components/RecipeEditor';


function App() {
  const [config, set_config] = useState<Base.Config>(default_config);

  const [ex_recipe, set_ex_recipe] = useState<Base.ConfigRecipe>(config.recipes[0]);

  return <>
    <div className='flex h-full w-full'>
      <Sidebar config={config} set_config={set_config}></Sidebar>
      <div className='flex flex-col w-full h-full justify-center items-center'>
        <div className='flex'>a</div>
        <span className='h-px bg-gray-500 w-4 m-4'></span>
        {/* <ProdLine recipe={RefineBlueIron} /> */}
        <div className='flex border p-2'>
          <RecipeEditor
            recipe={ex_recipe}
            set_recipe={set_ex_recipe}
            recipes={config.recipes}
            items={config.items}
            infras={config.infras}
          ></RecipeEditor>
        </div>
      </div>
    </div>
  </>
}

export default App
