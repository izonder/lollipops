import {connect as reduxConnect} from 'react-redux';
import {withRouter} from 'react-router-dom';

export const
    /**
     * Check if the env is production
     * @returns {boolean}
     */
    isProduction = () => {
        return process.env.NODE_ENV === 'production';
    },

    /**
     * Check if we need dev tool
     * @returns {boolean}
     */
    enableDevTool = () => {
        return process.env.DEV_TOOL === 'enable';
    },

    /**
     * Sugar connect function
     * @param {*} container
     * @returns {*}
     */
    connect = (container) => {
        return withRouter(reduxConnect(container.mapStateToProps, container.mapDispatchToProps)(container));
    };
