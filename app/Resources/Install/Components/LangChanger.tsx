import { useState } from "react";
import i18n from "../i18n";
import { store } from "../States";
function LangChanger() {
    const [selectedLang, setSelectedLang] = useState(i18n.language)
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const website = store.getState().website.data;
    const current = website.langs.find((lang) => lang.lang === selectedLang);
    const handleLangChange = async (lang: string) => {
        setSelectedLang(lang);
        await i18n.changeLanguage(lang);
        await i18n.reloadResources();
    };

    return (
        <div className='relative flex flex-col items-center rounded-lg'>
            <button onClick={() => toggleDropdown()} className="z-50  dark:bg-slate-800 dark:text-slate-700 bg-gray-300 text-blue-800 p-4 flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white active:text-white duration-300">
                <img src={current.logo} alt={`${current.language.slice(0, 10)} Image`} className="w-8 h-5" />
            </button>
            <div className={`z-10 dark:bg-slate-600 bg-gray-500 duration-300 absolute flex flex-col items-start rounded-lg p-2 ${!showDropdown ? "top-0 scale-0" : `top-[70px]`}`}>
                {website &&
                    website.langs.map((lang) => (
                        <button
                            key={lang.lang}
                            onClick={() => {
                                handleLangChange(lang.lang);
                                toggleDropdown();
                            }}
                            className="flex justify-between hover:bg-blue-400 cursor-pointer rounded-lg border-l-transparent hover:border-blue-900 p-2">
                            <img src={lang.logo} alt={`${lang.language} Image`} className="w-8 h-5" />
                            {/* <h4>{lang.language}</h4> */}
                        </button>
                    ))}
            </div>
        </div>
    )
}
export default LangChanger