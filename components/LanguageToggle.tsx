import { useAppContext } from '../utils/hooks'
import { Language } from '../utils/types'
import Styles from '../styles/Icons.module.css'

export default function LanguageToggle() {
    const { language, toggleLanguage } = useAppContext()
    return (
        <button 
            onClick={toggleLanguage} 
            className={`${Styles.icon} ${language === Language.ENGLISH ? Styles.gb : Styles.no}`}
            style={{backgroundColor: 'transparent'}}
        />
    )
}