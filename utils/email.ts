import Mail from '@sendgrid/mail'

export async function sendEmail(from: string, subject: string, text: string) {
    Mail.setApiKey(process.env.SENDGRID_API_KEY as string)

    const data = {
        to: 'oliveroloughlin1@gmail.com',
        from: 'oliveroloughlin@hotmail.com', //`${from}@oliveroloughlin.com`,
        subject,
        text,
        html: text.replace(/\r\n/g, '<br>')
    }

    await Mail.send(data)
}