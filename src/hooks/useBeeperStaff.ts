import { useQuery, useQueryClient } from "react-query";
import { BeeperEmployee, getBeeperEmployees } from "@/util";

const defaultArray: BeeperEmployee[] = [];

export default function useBeeperStaff(): BeeperEmployee[] {
    const client = useQueryClient();

    const { data } = useQuery("staff", getBeeperEmployees, {
        placeholderData: defaultArray
    });

    return data || defaultArray;
}