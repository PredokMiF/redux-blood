import { INIT_SCOPE, MODIFY_STORE_FIELD } from '../AC/constants'

export const bloodMiddleware = function(store) {
    let storeNext
    let scopePath
    let currState
    
    return next => action => {
        let nextResult

        if (action.type === INIT_SCOPE) {
            store.dispatchRoot = action.rootScopeDispatch
            store.dispatchParent = action.parentScopeDispatch
            storeNext = action.storeNext
            scopePath = action.scopePath
        } else {
            nextResult = next(action)
        }

        const nextState = store.getState()
        if (currState !== nextState) {
            currState = nextState
            action = Object.assign({}, action, {[MODIFY_STORE_FIELD]: {path: scopePath, data: currState}})
        }
        storeNext(action)
        return nextResult
    }
}
