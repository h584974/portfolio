import ViewStyles from '../styles/View.module.css'
import ContactStyles from '../styles/Contact.module.css'
import { useText } from '../utils/hooks'

export default function ContactForm() {
    const { contact } = useText()

    async function handleSubmit(e: any) {
        e.preventDefault()
        const formElem = e.target
        const formData = new FormData(formElem)
        formElem.reset()
        const form = Object.fromEntries(formData.entries())
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (res.status === 200) {
            alert(contact.success)
        }
        else {
            alert(contact.error)
        }
    }

    return (
        <div id='contactContainer' className={`${ViewStyles.container_bg} inverted`}>
            <div className={`${ViewStyles.half} ${ViewStyles.centered_text}`}>
                <div className={ViewStyles.inline_left}>
                    <form className={ContactStyles.form} onSubmit={handleSubmit}>
                        <h1>{contact.title}</h1>
                        <input
                            type='text'
                            name='firstName'
                            placeholder={contact.firstNamePlaceholder}
                            required
                        />
                        <br />
                        <input
                            type='text'
                            name='lastName'
                            placeholder={contact.lastNamePlaceholder}
                            required
                        />
                        <br />
                        <input
                            type='email'
                            name='email'
                            placeholder={contact.emailPlaceholder}
                            required
                        />
                        <br />
                        <textarea
                            name='message'
                            rows={15}
                            cols={40}
                            placeholder={contact.messagePlaceholder}
                            required
                        />
                        <br />
                        <button type='submit'>{contact.sendMessage}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}