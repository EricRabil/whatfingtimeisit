import { closestCenter, DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, SortingStrategy, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { ReactElement, RefAttributes } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";

export type OrderedListRenderer<T extends { id: string }> = (props: React.PropsWithRef<React.HTMLProps<HTMLDivElement> & { item: T }>) => ReactElement | null;

export type ExoticOrderedListRenderer<T extends { id: string }, Props extends { item: T } = { item: T }, El = HTMLElement> = React.ForwardRefExoticComponent<Props & RefAttributes<El>>

export interface OrderedListProps<T extends { id: string }> {
    items: T[];
    onOrderChanged?: (items: T[]) => void;
    children: OrderedListRenderer<T>;
    strategy?: SortingStrategy;
}

function swapItems<T extends { id: string }>(items: T[], id1: string, id2: string): T[] {
    const index1 = items.findIndex(item => item.id === id1);
    const index2 = items.findIndex(item => item.id === id2);

    return arrayMove(items, index1, index2);
}

function SortableItem<T extends { id: string }>({ item, children: Item }: { item: T, children: OrderedListRenderer<T> }) {
    const {
        attributes,
        listeners,
        transform,
        transition,
        isSorting,
        setNodeRef,
    } = useSortable({
        id: item.id
    })

    return (
        <Item
            item={item}
            ref={setNodeRef}
            style={{
                transition: transition || undefined,
                transform: isSorting ? undefined : CSS.Translate.toString(transform)
            }}
            {...attributes}
            {...listeners}
        />
    )
}

export default function OrderedList<T extends { id: string }>({ items, onOrderChanged, children: Item, strategy = verticalListSortingStrategy }: OrderedListProps<T>) {
    const [ activeItemID, setActiveItemID ] = useState<string | null>(null);
    const activeItem: T | undefined | null = useMemo(() => activeItemID ? items.find(item => item.id === activeItemID) : null, [activeItemID, items]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = useCallback(({ over, active }: DragEndEvent) => {
        if (over && active.id !== over.id && onOrderChanged) {
            onOrderChanged(swapItems(items, active.id, over.id));
        }

        setActiveItemID(null);
    }, [items, onOrderChanged]);

    const handleDragStart = useCallback(({ active }: DragStartEvent) => {
        setActiveItemID(active.id);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={strategy}>
                {items.map(item => (
                    <SortableItem key={item.id} item={item}>
                        {Item}
                    </SortableItem>
                ))}
            </SortableContext>
            <DragOverlay>
                {activeItem ? <Item item={activeItem} /> : null}
            </DragOverlay>
        </DndContext>
    )
}