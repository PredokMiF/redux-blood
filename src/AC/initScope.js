import {INIT_SCOPE} from './constants'

export function initScope(rootScopeDispatch, parentScopeDispatch, storeNext, scopePath) {
    return {
        type: INIT_SCOPE,
        rootScopeDispatch,
        parentScopeDispatch,
        storeNext,
        scopePath
    }
}