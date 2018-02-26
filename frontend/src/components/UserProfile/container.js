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
    componentDidMount(userId){
        const { getUserProfile } = this.props;
        getUserProfile(userId);
    }
    render() {
        return <UserProfile {...this.state} />;
    }
}

export default Container;