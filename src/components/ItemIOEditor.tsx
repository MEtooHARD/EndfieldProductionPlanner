import type { Base } from "../struct/Recipe";

interface Props {
    title: string;
    itemIOs: Base.ItemIO[];
    items: Base.ConfigItem[];
    update_item: (idx: number, new_item: string) => void;
    update_quantity: (idx: number, new_quantity: number) => void;
    delete_io: (idx: number) => void;
    add_io: () => void;
    min_required?: number;
    excluded_items?: string[];
}

export default function ItemIOEditor({
    title,
    itemIOs,
    items,
    update_item,
    update_quantity,
    delete_io,
    add_io,
    min_required = 1,
    excluded_items = []
}: Props) {
    return (
        <div className="flex flex-col w-full space-y-2">
            <div className="font-semibold text-gray-300">{title}</div>
            {itemIOs.map((io, idx) => (
                <div className="flex space-x-2 h-8" key={idx}>
                    <select
                        value={io.item}
                        className="border p-1 rounded-sm w-full text-gray-300"
                        onChange={(e) => update_item(idx, e.target.value)}>
                        <option value="" className="text-gray-700">-- Select Item --</option>
                        {items
                            .filter(item => !excluded_items.includes(item.name))
                            .filter((item) => item.name === io.item || !itemIOs.some(io => io.item === item.name))
                            .map((item) => (
                                <option key={item.name} value={item.name} className="text-gray-700">
                                    {item.name}
                                </option>
                            ))}
                    </select>

                    <input
                        value={io.quantity}
                        type="number"
                        min={1}
                        step={1}
                        className="flex border p-1 w-10 rounded-sm select-none text-gray-300"
                        onChange={(e) => update_quantity(idx, parseInt(e.target.value) || 1)}
                    />

                    <div
                        className="flex items-center justify-center px-1 w-8 h-8 border rounded-md
                            bg-red-400 text-gray-700 font-semibold
                            cursor-pointer select-none
                            hover:bg-red-300"
                        onClick={() => {
                            if (itemIOs.length === min_required)
                                return alert(`Must have at least ${min_required} ${title.toLowerCase()}`);
                            delete_io(idx);
                        }}
                    >
                        del
                    </div>
                </div>
            ))}

            <div
                className="flex w-full h-8 border rounded-2xl items-center justify-center
                    font-semibold text-gray-300
                    hover:bg-gray-400 hover:text-gray-700
                    select-none cursor-pointer"
                onClick={add_io}
            >
                + Add {title}
            </div>
        </div>
    );
}