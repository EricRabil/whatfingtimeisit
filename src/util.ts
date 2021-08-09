import { useMemo } from "react";
import { BeeperTimezone, BEEPER_TIMEZONE_BINDINGS } from "./hooks/useLocalizedTime";

export function mapObject<Value, NewValue>(object: Record<string, Value>, mapper: (key: string, value: Value) => NewValue): Record<string, NewValue> {
    return Object.fromEntries(Object.entries(object).map(([ key, value ]) => [key, mapper(key, value)]))
}

export function autoincrement(obj: Record<string, number>): number {
    const [ highest ] = Object.values(obj).sort((a,b) => b - a);
    return (highest || 0) + 1;
}

export function sortItems<T extends { id: string }>(items: Record<string | number | symbol, T>, sortOrder: Record<string, number>): T[] {
    return Object.values(items).sort((i1, i2) => sortOrder[i1.id] - sortOrder[i2.id]);
}

export function useMappedObject<Value, NewValue>(object: Record<string, Value>, mapper: (key: string, value: Value) => NewValue): Record<string, NewValue> {
    return useMemo(() => mapObject(object, mapper), [object]);
}

export interface BeeperEmployee {
    id: string;
    timezone: string;
    name: string;
}

export async function getBeeperEmployees(): Promise<BeeperEmployee[]> {
    const response = await fetch("https://us-central1-erics-world.cloudfunctions.net/query-timezones-go");
    const employees: BeeperEmployee[] = await response.json();

    employees.forEach(employee => {
        if (BEEPER_TIMEZONE_BINDINGS[employee.timezone as BeeperTimezone]) employee.timezone = BEEPER_TIMEZONE_BINDINGS[employee.timezone as BeeperTimezone];
    });

    console.log(employees);

    return employees;
}