import _at from 'lodash/at'
import {SCOPE_FIELD} from '../AC/constants'

export function stateToBloodProps(mapFn) {
    return function (state, props) {
        if (props.scopePath) {
            const scopePath = props.scopePath.split('/')
            const parentScopePath = scopePath.slice(0, -1)
            const lastPathKey = scopePath[scopePath.length-1]
            let parentState = _at(state, parentScopePath.join('.'))[0]
            const selfScope = lastPathKey ? (parentState[lastPathKey] || {}) : parentState
            return mapFn(selfScope[SCOPE_FIELD], parentState[SCOPE_FIELD], state[SCOPE_FIELD], props, state)
        } else {
            // Для глобальнгого стора
            return mapFn(state[SCOPE_FIELD], state[SCOPE_FIELD], state[SCOPE_FIELD], props, state)
        }

    }
}