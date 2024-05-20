import { useRef, useState } from "react";

export function Submitter() {
    const [errMsg, setErrMsg] = useState("");
    const errRef = useRef<HTMLInputElement>(null);
    return {
        ref: errRef,
        msg: errMsg,
        set_msg: setErrMsg,
    }
}
export type SubMitterType = ReturnType<typeof Submitter>
