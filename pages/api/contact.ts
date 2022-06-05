import { NextApiRequest, NextApiResponse } from 'next'
import { ok, badRequest, internalServerError, methodNotAllowed } from '../../utils/api'
import { sendEmail } from '../../utils/email'

export default async function Email(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            const { name, email, message } = req.body
            if (!name || !email || !message) {
                badRequest(res)
                return
            }

            const text = `
                Name: ${name}\r\n
                Email Address: ${email}\r\n
                Message:\r\n
                ${message}
            `

            const html = `
                <strong>Name: </strong>${name}<br/>
                <strong>Email Address: </strong>${email}<br/>
                <strong>Message:</strong><br/>
                <p>${message}</p>
            `

            try {
                await sendEmail('contact', 'Portfolio Contact Form Message', text, html)
                ok(res, 'Email Sent Successfully')
            }
            catch (err) {
                console.error(err)
                internalServerError(res)
            }
        }
        break;

        default: {
            methodNotAllowed(res)
        }
    }
}