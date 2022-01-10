import {createStore, applyMiddleware, compose} from 'redux'
import {bloodMiddleware} from './bloodMiddleware'

import {SPLIT_CHAR, SCOPE_FIELD, MODIFY_STORE_FIELD, ADD_SCOPE, REMOVE_SCOPE} from '../AC/constants'
import {initScope} from '../AC/initScope'

export default function storeMiddleware(bloodStore) {
    return next => action => {

        switch (action.type) {
            case ADD_SCOPE: {
                const {
                    path,
                    reducer = s => s,
                    initState = {},
                    middleware = applyMiddleware(bloodMiddleware)
                } = action

                const {rootScopeDispatch, parentScopeDispatch} = action.options
                const fullPath = (path ? path + SPLIT_CHAR : '') + SCOPE_FIELD
                const store = createStore(reducer, initState, middleware)

                next(action)

                store.dispatch(initScope(
                    rootScopeDispatch,
                    parentScopeDispatch,
                    next,
                    fullPath
                ))

                return store
            }

            case REMOVE_SCOPE:
                let {path} = action
                path = (path ? path + SPLIT_CHAR : '') + SCOPE_FIELD

                action = Object.assign({}, action, {[MODIFY_STORE_FIELD]: {path, data: null}})
                return next(action)
        }

        return next(action)
    }
}
