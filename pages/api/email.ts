import { NextApiRequest, NextApiResponse } from "next";
import ok, { badRequest, methodNotAllowed } from "../../utils/api";
import { sendEmail } from "../../utils/email";

export default async function Email(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': {
            const { firstName, lastName, email, message } = req.body
            if (!firstName || !lastName || !email || !message) {
                badRequest(res)
                return
            }

            const text = `
                Name: ${firstName}, ${lastName}\r\n
                Email Address: ${email}\r\n\r\n
                Message:\r\n
                ${message}
            `

            await sendEmail('hello', 'Website Contact Form Message', text)

            ok(res, 'Email Sent Successfully')
        }
        break;

        default: {
            methodNotAllowed(res)
        }
    }
}