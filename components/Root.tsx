import { useAppContext } from "../utils/hooks"

export default function Root({ children }: { children: JSX.Element[] | JSX.Element }) {
    const { theme } = useAppContext();
    return <div id='root' className={theme}>{children}</div>
}