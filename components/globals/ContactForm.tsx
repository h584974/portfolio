import ViewStyles from '../../styles/View.module.css'
import ContactStyles from '../../styles/Contact.module.css'
import { useText } from '../../utils/hooks'
import { useRef } from 'react'
import { NeonButton } from '../views/Buttons'

const MESSAGE_TIMEOUT = 10_000 // ms

export default function ContactForm() {
    const { contact } = useText()
    const msgRef = useRef<HTMLParagraphElement>(null)

    async function handleSubmit(e: any) {
        e.preventDefault()
        const formElem = e.target
        const formData = new FormData(formElem)
        const form = Object.fromEntries(formData.entries())
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (res.status === 200) {
            if (msgRef.current) {
                const msg = msgRef.current
                msg.innerText = contact.success
                msg.className = `${ContactStyles.message} ${ContactStyles.green}`
                msg.hidden = false
                setTimeout( () => msg.hidden = true, MESSAGE_TIMEOUT)
            }
            formElem.reset()
        }
        else {
            if (msgRef.current) {
                const msg = msgRef.current
                msg.innerText = contact.error
                msg.className = `${ContactStyles.message} ${ContactStyles.red}`
                msg.hidden = false
                setTimeout( () => msg.hidden = true, MESSAGE_TIMEOUT)
            }
        }
    }

    return (
        <div id='contact' className={`${ViewStyles.section} ${ContactStyles.container} inverted`}>
            <p ref={msgRef} className={ContactStyles.message} hidden>Message was sent</p>
            <div className={ViewStyles.centered_text}>
                <div className={ViewStyles.inline_left}>
                    <form className={ContactStyles.form} onSubmit={handleSubmit}>
                        <h2>{contact.title}</h2>
                        <input
                            type='text'
                            name='name'
                            placeholder={contact.namePlaceholder}
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
                        <NeonButton type='submit'>{contact.sendMessage}</NeonButton>
                    </form>
                </div>
            </div>
        </div>
    )
}