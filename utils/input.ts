import { Input } from "./types"

export function parseInput(event: KeyboardEvent) {
    event.preventDefault()
    switch (event.key) {
        case 'ArrowUp':
        case 'w'      :
            return Input.UP

        case 'ArrowDown':
        case 's'        :
            return Input.DOWN

        case 'ArrowLeft':
        case 'a'        :
            return Input.LEFT

        case 'ArrowRight':
        case 'd'         :
            return Input.RIGHT

        case 'Escape':
            return Input.QUIT

        default: return Input.UNDEFINED
    }
}