import { useNavigate } from "react-router-dom";
import { setFinish } from "../Axios/Installation/Finish";
import LangChanger from "../Components/LangChanger";
import ThemeChanger from "../Components/ThemeChanger";
import Trans from "../Components/Trans";
import { useState } from "react";
import ApplicationRequest from "../Axios/ApplicationRequest";
export function Finish() {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("RestartForFullMode");
    function Finishs() {
        setFinish().then((data) => {
            if (data.complete) {
                setMsg("RestartingServer");
                const interval = setInterval(() => {
                    ApplicationRequest()
                        .then(response => {
                            if (response.installed) {
                                clearInterval(interval);
                                navigate("/");
                            }
                        })
                        .catch(() => {
                            // ignores
                        });
                }, 3000);
            }
        })
    }
    return (
        <section className="m-6 flex justify-center items-center h-screen">
            <div className="dark:bg-slate-950 bg-slate-400 duration-300 rounded-2xl shadow-xl ">
                <div className="fixed top-0 left-0 flex justify-between md:justify-start p-2">
                    <div className="z-50  dark:bg-slate-800 dark:text-gray-700 bg-gray-300 text-blue-800 p-4 flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white active:text-white duration-300">
                        <ThemeChanger />
                    </div>
                    <div className="pl-2"><LangChanger /></div>
                </div>
                <div className="flex-1 duration-300 flex flex-col items-center">
                    <img className="drop-shadow-2xl rounded-full h-32 w-32 m-4" src="/img/logo.jpg" />
                    <p className="font-bold mx-4 text-neutral-700 dark:text-neutral-200"><Trans ns='installer' i18nKey={msg} /></p>
                </div>
                <div className="flex-1 m-1 flex justify-center">
                    <button onClick={() => { Finishs();}} className="m-4 bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700 duration-200"><Trans ns='installer' i18nKey={"InitFullMode"} /></button>
                </div>
            </div>
        </section>
    )
}