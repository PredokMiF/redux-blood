import {Component, PropTypes} from 'react'

export const bloodConnect = function (WrappedComponent) {
    const connectDisplayName = `BloodConnect(${getDisplayName(WrappedComponent)})`

    class BloodConnect extends Component {
        static contextTypes = {
            scopePath: PropTypes.string,
            selfScopeDispatch: PropTypes.func.isRequired,
            parentScopeDispatch: PropTypes.func.isRequired,
            rootScopeDispatch: PropTypes.func.isRequired
        };

        render() {
            return <WrappedComponent
                {...this.props}
                scopePath={this.context.scopePath}
                selfScopeDispatch={this.context.selfScopeDispatch}
                parentScopeDispatch={this.context.parentScopeDispatch}
                rootScopeDispatch={this.context.rootScopeDispatch}
            />;
        }
    }

    BloodConnect.displayName = connectDisplayName
    BloodConnect.WrappedComponent = WrappedComponent

    return BloodConnect
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}