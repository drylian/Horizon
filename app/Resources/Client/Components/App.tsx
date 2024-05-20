import React, { useState } from "react";
import ErrorBoundary from "../Pages/Errors/ErrorBoundary";
import GlobalRouter from "../Routers/Global";
import { store } from "../States";
import ApplicationRequest from "../Axios/ApplicationRequest";
import { StoreProvider } from "easy-peasy";
import { Init } from "../i18n";
import Loading from "./Loading";
import ThemeChanger from "./ThemeChanger";
import LangChanger from "./LangChanger";
import { RequireData } from "./RequireData";

async function InitialConfs(set: React.Dispatch<React.SetStateAction<boolean>>) {
    if (!store.getState().website.data) {
        store.getActions().website.setWebsite(await ApplicationRequest())
    }
    await Init(store.getState().website.data);
    set(true);
}
export function App() {
    const [loading, setLoading] = useState(false);
    const theme = localStorage.getItem('dark-mode') === 'true' ? "black" : "white"
    if (theme === "black") document.documentElement.classList.add('dark');
    InitialConfs(setLoading);
    return <RequireData data={loading}>
        <StoreProvider store={store}>
            <React.Suspense>
                <div className='mx-auto w-auto'>
                    <ErrorBoundary>
                        <GlobalRouter />
                    </ErrorBoundary>
                </div>
            </React.Suspense>
        </StoreProvider>
    </RequireData>
}