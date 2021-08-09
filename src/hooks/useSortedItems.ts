import { useEffect, useMemo } from "react";
import { usePersistent } from "react-use-persistent";
import { autoincrement, sortItems } from "../util";

export function useSortedItems<Item extends { id: string }>(items: Record<string | number | symbol, Item>, storageKey: string): [ Item[], (items: Item[]) => void ] {
    const [ sortOrder, setSortOrder ] = usePersistent<Record<string, number>>(storageKey, {});

    useEffect(() => {
        const newSortOrder = Object.assign({}, sortOrder);

        Object.values(items).forEach(({ id }) => {
            if (typeof newSortOrder[id] === "undefined") {
                newSortOrder[id] = autoincrement(sortOrder);
            }
        });

        setSortOrder(newSortOrder);
    }, [items]);

    const sortedItems = useMemo(() => sortItems(items, sortOrder), [items, sortOrder]);

    return [
        sortedItems,
        (items) => setSortOrder(Object.fromEntries(items.map(({ id }, index) => [ id, index ])))
    ]
}