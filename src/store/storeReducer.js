import {MODIFY_STORE_FIELD, SPLIT_CHAR} from '../AC/constants'

export default function storeReducer (state, action) {
    if (action[MODIFY_STORE_FIELD]) {
        let {path, data}= action[MODIFY_STORE_FIELD]
        path = path.split(SPLIT_CHAR)

        const newState = Object.assign({}, state)
        let doReplace = false

        path.reduce((state, key, i, arr) => {
            if (i < arr.length - 1) {
                // Копируем текущий стейт
                state[key] = state.hasOwnProperty(key) ? Object.assign({}, state[key]) : {}
            } else {
                if (state[key] !== data) {
                    doReplace = true
                }
                state[key] = data
            }
            return state[key];
        }, newState)

        return doReplace ? newState : state
    }

    return state
}