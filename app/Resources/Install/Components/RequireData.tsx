import { ReactNode } from "react";
import Loading from "./Loading";

export function RequireData<T>({ data, children }: { data: T, children: ReactNode }) {
    return !data ? <Loading /> : children
}