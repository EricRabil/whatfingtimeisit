import React, { createContext } from "react";
import useBeeperStaff from "@/hooks/useBeeperStaff";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

export interface Person {
    id: string;
    name: string;
    timezone: string;
}

export interface PeopleContextShape {
    people: Record<string, Person>;
    addPerson(person: Omit<Person, "sortOrder" | "id">): void;
    removePerson(index: number): void;
}

export const PeopleContext = createContext<PeopleContextShape>({
    people: {},
    addPerson: () => undefined,
    removePerson: () => undefined
});

const stored = localStorage.getItem("people");
const basePersistentContext: () => Record<string, Person> = () => stored ? JSON.parse(stored) : ({});

function nextID(): string {
    return (Math.random() + 1).toString(36).substring(7);
}

export function PersistentPeopleContextProvider({ children }: { children: React.ReactNode }) {
    const [ people, setPeople ] = useState(basePersistentContext);
    const staff = useBeeperStaff();

    const addPerson = useCallback((person: Omit<Person, "sortOrder">) => {
        const newPeople = Object.assign({}, people);
        const fullPerson = Object.assign({}, person, {
            id: nextID()
        });

        newPeople[fullPerson.id] = fullPerson;
        
        setPeople(newPeople);
    }, [people]);

    const removePerson = useCallback((index: number) => {
        const newPeople = Object.assign({}, people);
        delete newPeople[index];

        setPeople(newPeople);
    }, [people]);

    useEffect(() => {
        localStorage.setItem("people", JSON.stringify(people));
    }, [people]);

    useEffect(() => {
        const newPeople = Object.assign({}, people);
        var changed = false;

        for (const employee of staff) {
            if (!newPeople[employee.id]) {
                newPeople[employee.id] = employee;
                changed = true;
            } else if (newPeople[employee.id].timezone !== employee.timezone) {
                newPeople[employee.id].timezone = employee.timezone;
                changed = true;
            }
        }

        if (changed) setPeople(newPeople);
    }, [staff, people]);

    return (
        <PeopleContext.Provider value={{ people, addPerson, removePerson }}>
            {children}
        </PeopleContext.Provider>
    )
}