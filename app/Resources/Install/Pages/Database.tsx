import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FieldInput } from "../Components/Formulary/FieldInput";
import { FieldButton } from "../Components/Formulary/FieldButton";
import { Submitter } from "../Components/Formulary/Submitter";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";
import LangChanger from "../Components/LangChanger";
import ThemeChanger from "../Components/ThemeChanger";
import Trans from "../Components/Trans";
import { DatabaseFormData, getDatabase, setDatabase as SetDatabase } from "../Axios/Installation/Database";
export const Database: React.FC = () => {
    const { t } = useTranslation("installer");
    const [database, setDatabase] = useState<null | DatabaseFormData>();

    const navigate = useNavigate();
    const set = Submitter()
    const Validation = Yup.object({
        dialect: Yup.string().required(t("ObrigatoryCamp")),
        database: Yup.string(),
        user: Yup.string(),
        pass: Yup.string(),
        port: Yup.number(),
        host: Yup.string(),
    })
    if (!database) {
        getDatabase().then((options) => {
            setDatabase(options)
        })
    }
    if (!database) return <Loading />;
    const Schema = {
        dialect: database.dialect,
        database: database.database !== "undefined" ? database.database : "coreATS",
        host: database.host !== "undefined" ? database.host : "localhost",
        pass: database.pass !== "undefined" ? database.pass : "",
        port: database.port ?? 3306,
        user: database.user !== "undefined" ? database.user : "root",
    }
    function SubmitConf(values: typeof Schema, formik: FormikProps<typeof Schema>) {
        SetDatabase(values).then((response) => {
            if (response.complete) {
                navigate("/finish");
                return;
            }
        }).catch((err) => {
            set.set_msg(err.response?.data?.message || t("GeralError"));
            if (set.ref.current) {
                set.ref.current.focus();
            }
        }).finally(() => {
            formik.setSubmitting(false);
        });
    }
    return <>
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
                    <p className="font-bold mx-4 text-neutral-700 dark:text-neutral-200"><Trans ns='installer' i18nKey={"DatabaseInfos"} /></p>
                </div>
                <div className="flex-1 m-1">
                    <div className={`${set.msg ? "" : "scale-0"} duration-300 origin-top flex bg-neutral-300 dark:bg-slate-900 mx-4 rounded-lg p-1 border-red-500 border shadow-lg items-center justify-center`}>
                        <p ref={set.ref} className={`text-red-600`} aria-live='assertive'>
                            {set.msg}
                        </p>
                    </div>
                    <Formik
                        initialValues={Schema}
                        validationSchema={Validation}
                        onSubmit={SubmitConf}
                    >
                        {(props) => (
                            <Form>
                                <div className="w-full">
                                    <label htmlFor='dialect' className='block text-sm font-medium leading-6 text-neutral-800 dark:text-neutral-100 duration-300'>
                                        <Trans ns='installer' i18nKey={"DialectSelector"} />
                                    </label>
                                    <div className='flex'>
                                        <Field
                                            as='select'
                                            id='dialect'
                                            name='dialect'
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                props.setFieldValue("dialect", e.target.value);
                                            }}
                                            className='mt-1 p-1 w-full text-neutral-700 dark:text-neutral-200 bg-neutral-300 dark:bg-neutral-900 duration-300 border rounded-md border-gray-500'
                                        >
                                            <option value="mysql">
                                                Mysql
                                            </option>
                                            <option value="sqlite">
                                                Sqlite
                                            </option>
                                        </Field>
                                    </div>
                                    <ErrorMessage
                                        name='dialect'
                                        component='div'
                                        className='text-red-500 text-xs mt-1'
                                    />
                                </div>
                                {props.values.dialect === "mysql" &&
                                    <div className="flex md:flex-row justify-center">
                                        <div className="m-5 w-full">
                                            <FieldInput ns='installer' tran={"HostDatabase"} value="host" />
                                            <FieldInput ns='installer' type="number" tran={"PortDatabase"} value="port" />
                                            <FieldInput ns='installer' tran={"DatabaseDatabase"} value="database" />
                                        </div>
                                        <div className="m-5 w-full">
                                            <FieldInput ns='installer' tran={"UserDatabase"} value="user" />
                                            <FieldInput ns='installer' tran={"PassDatabase"} value="pass" />
                                        </div>
                                    </div>
                                }
                                <div className="flex justify-between items-center w-full p-2">
                                    <Link to='/starting' className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                        <Trans ns='installer' i18nKey={"Back"} />
                                    </Link>
                                    <FieldButton formik={props} ns="installer" tran={"Next"} />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    </>
}
