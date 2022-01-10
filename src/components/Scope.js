import React, {Component, PropTypes, Children} from 'react'

import {SPLIT_CHAR} from '../AC/constants'
import {addScope} from '../AC/addScope'
import {removeScope} from '../AC/removeScope'

export class Scope extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        reducer: PropTypes.func,
        initState: PropTypes.object,
        middleware: PropTypes.func,
        children: PropTypes.element
    };

    static contextTypes = {
        store: PropTypes.any.isRequired,
        scopePath: PropTypes.string,
        rootScopeDispatch: PropTypes.func.isRequired,
        selfScopeDispatch: PropTypes.func
    };

    static childContextTypes = {
        scopePath: PropTypes.string.isRequired,
        parentScopeDispatch: PropTypes.func.isRequired,
        selfScopeDispatch: PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context)

        const {name} = props
        const {scopePath} = context

        this.scopePath = (scopePath ? scopePath + SPLIT_CHAR : '') + name
    }

    getChildContext() {
        const {selfScopeDispatch} = this.context
        return {
            scopePath: this.scopePath,
            parentScopeDispatch: selfScopeDispatch,
            selfScopeDispatch: this.store.dispatch
        }
    }

    componentWillMount(){
        const {reducer, initState, middleware} = this.props
        const {store, rootScopeDispatch, selfScopeDispatch} = this.context

        this.store = store.dispatch(
            addScope(this.scopePath, {reducer, initState, middleware}, {rootScopeDispatch, parentScopeDispatch: selfScopeDispatch})
        )
    }

    componentWillUnmount() {
        this.context.store.dispatch(
            removeScope(this.scopePath)
        )
    }

    render() {
        const {children} = this.props
        return Children.only(children || <div/>)
    }
}
