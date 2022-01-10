import {ADD_SCOPE} from './constants'

export function addScope(path, {reducer, initState, middleware}, options={}) {
    return {
        type: ADD_SCOPE,
        path,
        reducer,
        initState,
        middleware,
        options
    }
}