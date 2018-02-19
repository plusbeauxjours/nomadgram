import React, { Component } from 'react';
import Navigation from './presenter';

class Container extends Component {
    state = {
        seeingNotifications: false
    }
    render() {
        return (
            <Navigation 
                {...this.props}
                {...this.state}
                openNotifications={this._openNotifications}
                closeNotifications={this._closeNotifications}
            />
        );
    }
    _openNotifications = () => {
        const { getNotification } = this.props;
        this.setState({
            seeingNotifications: true
        });
        getNotification();
    };
    _closeNotifications = () => {
        this.setState({
            seeingNotifications: false
        });
    }
}

export default Container;