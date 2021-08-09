import React, { createContext } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { usePersistent } from "react-use-persistent";
import { PeopleContext, Person } from "./people-context";
import distinctColors from "distinct-colors";
import { useMemo } from "react";
import { mapObject } from "@/util";

export const SWATCH_COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"]

export interface ColorCodingContextShape {
    colorCodings: Record<string, [string, string]>;
    colorCodingStyles: Record<string, any>;
    autocolor(): void;
}

export const ColorCodingContext = createContext<ColorCodingContextShape>({
    colorCodings: {},
    colorCodingStyles: {},
    autocolor: () => undefined,
});

export function groupPeopleByTimezone<T extends Person>(people: T[]): Record<string, T[]> {
    return people.reduce((acc, person) => {
        (acc[person.timezone] || (acc[person.timezone] = [])).push(person);
        return acc;
    }, {} as Record<string, T[]>);
}

export function PersistentColorCodingContextProvider({ children }: { children: JSX.Element }) {
    const { people } = useContext(PeopleContext);
    const [ colorCodings, setColorCodings ] = usePersistent<Record<string, [string, string]>>("color-codings", {});

    const colorCodingStyles = useMemo(() => mapObject(colorCodings, (id, [background, text]) => ({
        "--color-coding-bg": background,
        "--color-coding-text": text
    })), [colorCodings]);

    const autocolor = useCallback(() => {
        const groups = groupPeopleByTimezone(Object.values(people));
        
        const groupCount = Object.keys(groups).length;

        const colors = distinctColors({
            count: groupCount,
            lightMin: 19,
            lightMax: 21,
            samples: 3200
        }).map(color => ({ color, sort: Math.random() }))
          .sort(({ sort: sort1 }, { sort: sort2 }) => sort1 - sort2)
          .map(({ color }) => color);

        const colorCodings: Record<string, [string, string]> = {};

        Object.values(groups).forEach(people => {
            const color = colors.pop()!;

            for (const person of people) {
                colorCodings[person.id] = [color.hex("rgb"), color.brighten(4).hex("rgb")];
            }
        });

        setColorCodings(colorCodings);
    }, [people, setColorCodings]);

    return (
        <ColorCodingContext.Provider value={{ colorCodings, colorCodingStyles, autocolor }}>
            {children}
        </ColorCodingContext.Provider>
    )
}