import { FileScanInfo } from "@/Utils";

export function Metadata(meta: FileScanInfo[], production: boolean) {
    let Head
    let Body
    if (production) {
        Head = meta.map((data, index) => {
            if (data.name.endsWith(".css")) {
                return <link key={index} rel="stylesheet" href={data.name} />
            }
        })
        Body = meta.map((data, index) => {
            if (data.name.startsWith("bundle-") && data.name.endsWith(".js")) {
                return <script key={index} type="module" src={data.name}></script>
            }
        })
    } else {
        Head = meta.map((data, index) => {
            if (data.name.endsWith(".css")) {
                return <link key={index} rel="stylesheet" href={"/proxy/" + data.name} />
            }
        })
        Body = [<script type="module" src={"/proxy" + "/development-bundle.js"}></script>]
    }
    return { Head, Body }
}