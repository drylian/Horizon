import LangChanger from "../Components/LangChanger";
import ThemeChanger from "../Components/ThemeChanger";
import Trans from "../Components/Trans";
import { Link } from "react-router-dom";
export function Introduction() {
    return (
        <section className="m-6">
            <div className="dark:bg-slate-950 bg-slate-400 duration-300 rounded-2xl shadow-xl">
            <div className="flex justify-between md:justify-start p-2">
                        <div className="z-50  dark:bg-slate-800 dark:text-gray-700 bg-gray-300 text-blue-800 p-4 flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white active:text-white duration-300">
                            <ThemeChanger />
                        </div>
                        <div className="pl-2"><LangChanger /></div>
                    </div>
                <div className="flex flex-col-reverse md:flex-row items-center">
                    <div className="flex-1 m-4">
                        <div className="text-center justify-center">
                            <h2 className="dark:text-white text-black text-2xl font-bold mb-4">Horizon</h2>
                            <p className="dark:text-gray-300 text-gray-900 mb-4"><Trans ns='installer' i18nKey={"InitialMessage"} /></p>
                            <h4 className="dark:text-blue-400 text-blue-900"><Trans ns='installer' i18nKey={"termsofuse"} /></h4>
                            <div className="mt-4 flex justify-between">
                                <Link to="/starting" className="bg-blue-900 text-white w-full p-2 rounded-md hover:bg-blue-700 duration-200"><Trans ns='installer' i18nKey={"StartInstall"} /></Link>
                                {/* <a href="/install/setup/one" className="bg-blue-900 text-white rounded-md hover:bg-blue-700 duration-200"><i className='text-lg px-4 py-2 bx bxs-right-arrow-alt'></i></a> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 dark:bg-gray-950 duration-300 flex flex-col items-center">
                        <img className="hidden md:block drop-shadow-2xl rounded-full m-4" src="/img/logo.jpg" />
                    </div>
                </div>
            </div>
        </section>
    )
}