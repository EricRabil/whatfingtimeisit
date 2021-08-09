import { ColorCodingContext } from "@/contexts/color-coding-context";
import { LocalizedPerson, LocalizedTimeContext } from "@/contexts/localized-time-context";
import { useSortedItems } from "@/hooks/useSortedItems";
import React, { forwardRef, useContext } from "react";
import OrderedList from "./hoc/OrderedList";

const PersonRow = forwardRef<HTMLDivElement, { item: LocalizedPerson } & React.PropsWithRef<React.HTMLProps<Element>>>(function PersonRow({ item: { id, name, timezoneObject: { abbreviation }, localizedAdjustedTime }, ...props }: { item: LocalizedPerson }, ref) {
    return (
        <ColorCodingContext.Consumer>
            {({ colorCodingStyles }) => (
                <div className="person" data-id={id} {...props} style={
                    {...(colorCodingStyles[id] || {}), ...((props as any).style || {})}
                } ref={ref}>
                    <span className="person-name">{name}</span>
                    <span className="person-spacer" />
                    <span className="person-time">
                        <span className="person-current-time">
                            {localizedAdjustedTime}
                        </span>
                        <span className="pesron-timezone">
                            {abbreviation}
                        </span>
                    </span>
                </div>
            )}
        </ColorCodingContext.Consumer>
    )
})

export default function Sidebar() {
    const localizedPeople = useContext(LocalizedTimeContext);
    const [ sortedPeople, setSortedPeople ] = useSortedItems(localizedPeople, "sidebar-sort-order");

    return (
        <div className="sidebar">
            <OrderedList items={sortedPeople} onOrderChanged={setSortedPeople}>
                {PersonRow}
            </OrderedList>
        </div>
    )
}