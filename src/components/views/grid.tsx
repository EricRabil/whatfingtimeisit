import { ColorCodingContext, groupPeopleByTimezone, SWATCH_COLORS } from "@/contexts/color-coding-context";
import { LocalizedPerson, LocalizedTimeContext } from "@/contexts/localized-time-context";
import { useSortedItems } from "@/hooks/useSortedItems";
import { rectSortingStrategy } from "@dnd-kit/sortable";
import classnames from "classnames";
import React, { forwardRef, useContext, useState } from "react";
import { useCallback } from "react";
import OrderedList, { ExoticOrderedListRenderer } from "@/components/hoc/OrderedList";
import ColorSwatch from "@/components/shared/swatch";
import { usePersistent } from "react-use-persistent";
import classNames from "classnames";

const GridPerson: ExoticOrderedListRenderer<LocalizedPerson, { item: LocalizedPerson }, HTMLDivElement> = forwardRef(function({ item: person, ...props }, ref) {
    const { colorCodingStyles } = useContext(ColorCodingContext);

    return (
        <div className="grid-person" {...props} style={{
            ...colorCodingStyles[person.id], ...((props as any).style || {})
        } as any} ref={ref}>
            <span className="grid-person-name">{person.name}</span>
            <span className="grid-person-time">{person.localizedAdjustedTime}</span>
        </div>
    )
})

interface GridSettings {
    columns: number;
    fontScale: number;
}

function useGridSettings() {
    return usePersistent<GridSettings>("grid-settings", {
        columns: 4,
        fontScale: 3
    });
}

function hasAncestor(node: EventTarget, cb: (node: Node) => boolean): boolean {
    if (!(node instanceof Node)) return false;

    if (cb(node)) return true;

    let next: Node | null = node.parentNode;

    while (next !== null) {
        if (cb(next)) return true;
        next = next.parentNode;
    }
    
    return false;
}

function ColumnsToolbarItem() {
    const [ settings, setSettings ] = useGridSettings();

    const columns = settings.columns;

    const setColumns = useCallback((columns: number) => {
        if (columns > 8 || columns < 1) return;

        const newSettings = Object.assign({}, settings);

        newSettings.columns = columns;

        setSettings(newSettings);
    }, [settings, setSettings]);

    const increment = useCallback(() => setColumns(columns + 1), [columns, setColumns]);
    const decrement = useCallback(() => setColumns(columns - 1), [columns, setColumns]);

    return (
        <div className="switcher-group">
            <div className="switcher-item" onClick={() => decrement()}>-</div>
            <div className="switcher-label">{settings.columns} Columns</div>
            <div className="switcher-item" onClick={() => increment()}>+</div>
        </div>
    )
}

function FontSizeToolbarItem() {
    const [ settings, setSettings ] = useGridSettings();

    const { fontScale } = settings;
    const scales = [1,2,3,4];

    const setScale = useCallback((fontScale: number) => {
        setSettings(Object.assign({}, settings, {
            fontScale
        }));
    }, [settings, setSettings]);

    return (
        <div className="switcher-group">
            <div className="switcher-label">Font Scale: </div>
            {scales.map(scale => (
                <div
                    className={classNames("switcher-item", { active: fontScale === scale })}
                    onClick={() => setScale(scale)}
                    key={scale}
                >
                    {scale}x
                </div>
            ))}
        </div>
    )
}

function useSortedPeople() {
    const people = useContext(LocalizedTimeContext);
    
    return useSortedItems(people, "grid-sort-order");
}

function GroupByTimezoneItem() {
    const [ sortedPeople, setSortedPeople ] = useSortedPeople();

    const groupPeople = useCallback(() => {
        setSortedPeople(
            Object.values(groupPeopleByTimezone(sortedPeople))
                  .map(people => people.sort((p1, p2) => p1.name.localeCompare(p2.name)))
                  .sort((a1, a2) => a2.length - a1.length)
                  .flat()
        );
    }, [ sortedPeople ]);
    
    return (
        <div className="switcher-item" onClick={() => groupPeople()}>
            Group by Timezone
        </div>
    )
}

export function GridViewToolbar() {
    return (
        <>
            <FontSizeToolbarItem />
            <ColumnsToolbarItem />
            <GroupByTimezoneItem />
        </>
    )
}

export default function GridView() {
    const [ sortedPeople, setSortedPeople ] = useSortedPeople();
    const [ { columns, fontScale } ] = useGridSettings();

    return (
        <div className="grid-view" style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }} attr-font-scale={fontScale}>
            <OrderedList items={sortedPeople} onOrderChanged={setSortedPeople} strategy={rectSortingStrategy}>
                {GridPerson}
            </OrderedList>
        </div>
    )
}