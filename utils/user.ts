import Filter from 'bad-words'
import { updateDocument } from '../services/firebase'

// Constants
const USERNAME_MAX_LENGTH = 10
const USERNAME_MIN_LENGTH = 10

export function updateUsername(username: string, uid: string): boolean {
    const filter = new Filter()
    const isProfane = filter.isProfane(username)
    const valid = username.length <= 10 && username.length >= 1
    if (isProfane || !valid) return false

    updateDocument('users', uid, { username })
    return true
}