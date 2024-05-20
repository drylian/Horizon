import { Collection } from "@/Utils";
/**
 * Internal Cache of Application
 */
interface InternalCaches {
    "cache:languages":object
}
export const Internal = new Collection<InternalCaches>();
