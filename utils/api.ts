import { NextApiResponse } from "next";

// Successful responses
export function ok(res: NextApiResponse, message: string) {
    res.status(200).json({ message })
}

export function okData(res: NextApiResponse, data: {}) {
    res.status(200).json(data)
}

// Error responses
export function badRequest(res: NextApiResponse) {
    res.status(400).json({ error: 'Bad Request' })
}

export function methodNotAllowed(res: NextApiResponse) {
    res.status(405).json({ error: 'Method Not Allowed' })
}

export function internalServerError(res: NextApiResponse) {
    res.status(500).json({ error: 'Internal Server Error' })
}