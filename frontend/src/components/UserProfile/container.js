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

    componentDidMount(){
        const { getUserProfile } = this.props;
        if(!this.props.userProfile){
            getUserProfile();
        } else {
            this.setState({ 
                loading: false 
            });
        }
    }

    componentWillReceiveProps = nextProps => {
        console.log(nextProps)
        if(nextProps.userProfile) {
            this.setState({
                loading: false
            });
        }
    }
    
    render() {
        return <UserProfile {...this.state} />;
    }
}

export default Container;