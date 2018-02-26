import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserProfile from './presenter';

class Container extends Component {
    state = {
        loading: true
    };
    static propTypes = {
        getUserProfile: PropTypes.func.isRequired
    };
    ComponentDidMount(){
        const { getUserProfile } = this.props;
        getUserProfile();
    }
    render() {
        return <UserProfile {...this.state} />;
    }
}

export default Container;