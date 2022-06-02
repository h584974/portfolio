import ViewStyles from '../styles/View.module.css'
import ContactStyles from '../styles/Contact.module.css'

export default function ContactForm() {
    function handleSubmit(e: any) {
        e.preventDefault()
    }

    return (
        <div id='contactContainer' className={`${ViewStyles.container_bg} inverted`}>
            <div className={`${ViewStyles.half} ${ViewStyles.centered_text}`}>
                <div className={ViewStyles.inline_left}>
                    <form className={ContactStyles.form} onSubmit={handleSubmit}>
                        <h1>Contact Me</h1>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='First Name'
                            required
                        />
                        <br />
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Last Name'
                            required
                        />
                        <br />
                        <input
                            type='email'
                            name='email'
                            placeholder='Email Address'
                            required
                        />
                        <br />
                        <textarea
                            name='message'
                            rows={15}
                            cols={40}
                            placeholder='Message / Questions'
                            required
                        />
                        <br />
                        <button type='submit'>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}