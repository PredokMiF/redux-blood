import {REMOVE_SCOPE} from './constants'

export function removeScope(path) {
    return {
        type: REMOVE_SCOPE,
        path
    }
}