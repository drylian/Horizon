import { ErrorMessage, Field } from "formik"
import Trans from "../Trans"
import { useTranslation } from "react-i18next";
interface FiledsSet {
    ns: string, tran: string, formik:{isSubmitting:boolean}
}
export const FieldButton: React.FC<FiledsSet> = ({ ns, tran, formik }) => {
    return <div>
    <button
        type='submit'
        disabled={formik.isSubmitting}
        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
    >
        {formik.isSubmitting ? (
            <span className='w-5 h-5 block rounded-full border-4 border-t-blue-300 animate-spin' />
        ) : (
            <Trans ns={ns} i18nKey={tran} />
        )}
    </button>
</div>
}
