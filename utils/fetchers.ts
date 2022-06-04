import useSWR from "swr";
import { getFileURL } from "../services/firebase";
import { useAppContext } from "./hooks";
import { Language } from "./types";

export function useCV() {
    const fetcher = (fileref: string) => getFileURL(fileref)
    const { language } = useAppContext()
    const { data, error } = useSWR(language === Language.ENGLISH ? '/cv/english/Oliver_OLoughlin.pdf' : '/cv/norsk/Oliver_OLoughlin.pdf', fetcher)

    return {
        cvSrc: data,
        loading: !data && !error,
        error,
    }
}