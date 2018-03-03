import React, { Component } from 'react';
import NotificationList from './presenter';

class Container extends Component {
    state = {
        loading: true
    };
    componentDidMount() {
        const { notificationList } = this.props;
        if (notificationList) {
            this.setState({ 
                loading: false 
            });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.notificationList) {
            this.setState({
                loading: false
            });
        }
    }
    render() {
        return <NotificationList {...this.props} {...this.state} />;
    }
}

export default Container;