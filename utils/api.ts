import { NextApiResponse } from "next";

// Successful responses
export default function ok(res: NextApiResponse, message: string) {
    res.status(200).json({ message })
}

// Error responses
export function methodNotAllowed(res: NextApiResponse) {
    res.status(405).json({ error: 'Method Not Allowed' })
}

export function badRequest(res: NextApiResponse) {
    res.status(400).json({ error: 'Bad Request' })
}