import { useState } from "react";
import type { Base } from "../../struct/Recipe";
import Editor from "../Editor";


interface Props {
    infras: Base.Config['infras'];
    add_infra: (infra: Base.ConfigInfra) => void;
    del_infra: (name: string) => void;
}

export default function InfraManager({ infras, add_infra, del_infra }: Props) {
    const [folded, set_folded] = useState(true);

    const [input_name, set_input_name] = useState('');

    const [msg, set_msg] = useState('');

    return <div className="flex flex-col size-full items-center p-2">
        <div className="m-2 text-2xl text-gray-300 font-semibold">
            Infra
        </div>
        <Editor
            folded={folded}
            set_folded={set_folded}
            msg={msg}
            can_add={msg.length === 0 && input_name.trim().length > 0}
            on_add={() => { add_infra({ name: input_name.trim() }); set_input_name(''); }}>
            <div className="flex flex-col size-full items-center p-0.5">
                <input
                    type="text"
                    placeholder="name"
                    value={input_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        set_input_name(e.target.value);
                        const new_name = e.target.value.trim();
                        if (new_name.length === 0)
                            set_msg('Name cannot be empty');
                        else if (infras.some(infra => infra.name === new_name))
                            set_msg('Infra with the same name already exists');
                        else set_msg('');
                    }}
                    className="w-full border border-gray-300 rounded-sm p-1 text-white font-semibold
                            focus:outline-none focus:ring-2 focus:ring-blue-500 select-none">
                </input>
            </div>
        </Editor>
        <span className="w-full h-0.5 bg-gray-300 m-2"></span>
        <div className="flex flex-col w-full h-full max-h-full border rounded-md p-1 space-y-1 overflow-y-auto hide-scrollbar">
            {infras.map((infra, idx) => (
                <div key={idx} className="flex border justify-between rounded-sm p-1.5
                        border-gray-300 hover:bg-gray-600">
                    <div className="">{infra.name}</div >
                    <div className={`flex justify-center items-center w-fit h-full px-1 rounded-sm ${!folded ? 'block' : 'hidden'}
                            bg-red-400 text-gray-700 hover:bg-red-300
                            font-semibold cursor-pointer`}
                        onClick={() => del_infra(infra.name)}>
                        del
                    </div>
                </div>
            ))}
        </div>
    </div>
}