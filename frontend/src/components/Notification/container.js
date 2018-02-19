import React, { Component } from 'react';
import Notification from './presenter';

class Container extends Component {
    state = {
        loading: true
    };
    componenetDidMount() {
        const { notification } = this.props;
        if (notification) {
          this.setState({ loading: false });
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.notification) {
            this.setState({
                loading: false
            });
        }
    }
    render() {
        return <Notification {...this.props} {...this.state} />;
    }
}

export default Container;