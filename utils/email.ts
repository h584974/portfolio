import Mail from '@sendgrid/mail'

export async function sendEmail(from: string, subject: string, text: string) {
    Mail.setApiKey(process.env.SENDGRID_API_KEY as string)
    const _from = process.env.NODE_ENV === 'production' ? `${from}@oliveroloughlin.com` : 'oliveroloughlin@hotmail.com'

    const data = {
        to: 'oliveroloughlin1@gmail.com',
        from: _from,
        subject,
        text,
        html: text.replace(/\r\n/g, '<br>')
    }

    await Mail.send(data)
}