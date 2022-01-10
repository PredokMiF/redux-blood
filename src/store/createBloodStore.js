import {createStore, compose, applyMiddleware} from 'redux'

import {addScope} from '../AC/addScope'
import storeReducer from './storeReducer'
import storeMiddleware from './storeMiddleware'

export function createBloodStore(reducer, initState, middleware) {
    const composedGlobalMiddleware = compose(
        applyMiddleware(storeMiddleware),
        window && window.devToolsExtension ? window.devToolsExtension() : f => f
    )

    const store = createStore(storeReducer, {}, composedGlobalMiddleware)

    store.global = store.dispatch(addScope('', {reducer, initState, middleware}))

    return store
}