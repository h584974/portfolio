import Mail from '@sendgrid/mail'

export async function sendEmail(from: string, subject: string, text: string, html?: string) {
    Mail.setApiKey(process.env.SENDGRID_API_KEY as string)

    const data = {
        to: 'oliveroloughlin1@gmail.com',
        from: `${from}@oloughlin.no`,
        subject,
        text,
        html: html ?? text.replace(/\r\n/g, '<br>')
    }

    await Mail.send(data)
}