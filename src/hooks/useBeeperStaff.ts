import { BeeperEmployee, getBeeperEmployees } from "@/util";
import { useQuery } from "react-query";

const defaultArray: BeeperEmployee[] = [];

export default function useBeeperStaff(): BeeperEmployee[] {
    const { data } = useQuery("staff", getBeeperEmployees, {
        placeholderData: defaultArray
    });

    return data || defaultArray;
}