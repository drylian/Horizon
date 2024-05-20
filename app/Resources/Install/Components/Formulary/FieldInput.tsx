import { ErrorMessage, Field } from "formik"
import Trans from "../Trans"
import { useTranslation } from "react-i18next";
interface FiledsSet {
    ns: string, tran: string, value: string, require?: boolean, type?: string
}
export const FieldInput: React.FC<FiledsSet> = ({ ns, tran, value, type = "string", require = false }) => {
    const { t } = useTranslation(ns);

    return (
        <div>
            <label htmlFor={value} className='block text-sm font-medium leading-6 text-neutral-800 dark:text-neutral-100 duration-300'>
                <Trans ns={ns} i18nKey={tran} />
            </label>
            <div>
                <Field
                    type={type}
                    id={value}
                    name={value}
                    autoComplete={value}
                    placeholder={t(tran)}
                    required={require}
                    className='mt-1 p-1 w-full text-neutral-700 dark:text-neutral-200 bg-neutral-300 dark:bg-neutral-900 duration-300 border rounded-md border-gray-500'
                />
                <ErrorMessage name={value} component='div' className='text-red-500 text-xs mt-1' />
            </div>
        </div>
    )
}
