import { useAppContext } from "../utils/hooks"

export default function ThemeRoot({ children }: { children: JSX.Element[] | JSX.Element }) {
    const { theme } = useAppContext();
    return <div id='themeRoot' className={theme}>{children}</div>
}