import { bindActionCreators } from 'redux'

export function acToBloodProps(selfAC={}, parentAC={}, globalAC={}) {
    return function (dispatch, props) {
        const {rootScopeDispatch, parentScopeDispatch, selfScopeDispatch} = props

        globalAC = bindActionCreators(globalAC, rootScopeDispatch)
        parentAC = bindActionCreators(parentAC, parentScopeDispatch)
        selfAC = bindActionCreators(selfAC, selfScopeDispatch)

        return Object.assign({}, globalAC, parentAC, selfAC)
    }
}