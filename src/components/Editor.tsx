

interface Props {
    folded: boolean;
    set_folded: React.Dispatch<React.SetStateAction<boolean>>;
    msg: string;
    can_add: boolean;
    on_add: () => void;
    children: React.ReactNode;
}

export default function Editor({ folded, set_folded, msg, can_add, on_add, children }: Props) {

    return <div className={"flex flex-col items-center w-full h-fit rounded-t-sm bg-gray-500 border"
        + (folded ? ' rounded-sm' : '')}>
        <div className="w-full h-6 flex items-center justify-center rounded-t-sm border-b
                text-gray-300 font-semibold
                hover:bg-gray-400 hover:text-gray-700
                cursor-pointer select-none"
            onClick={() => set_folded(!folded)}>
            Edit
        </div>
        {!folded && <div className="flex flex-col size-full items-center p-2 space-y-2">
            {/* <div className="flex flex-col items-center w-full h-fit"> */}
            {children}
            {/* </div> */}
            {(msg.length > 0) && <div className="text-red-300 text-md font-semibold">*{msg}</div>}
            <div className={`border-2 py-1 h-fit w-full min-w-fit rounded-md
            text-green-300 cursor-pointer bg-green-600/20
            hover:bg-green-300 hover:text-gray-900 transition duration-75
            select-none
            ${(can_add ? '' : 'cursor-not-allowed pointer-events-none bg-gray-600')}`}
                onClick={() => on_add()}>
                + Add
            </div>
        </div>}
    </div>
}