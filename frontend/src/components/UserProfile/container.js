import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserProfile from './presenter';

class Container extends Component {
    state = {
        loading: true
    };

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired,
    };

    render() {
        const { userProfile } = this.props;
        return (
            <UserProfile 
                {...this.props}
                {...this.state} 
                userProfile={userProfile} 
                mouseOver={this._mouseOver}
                mouseOut={this._mouseOut}
            />
        );
    }

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
        console.log(nextProps.userProfile)
        console.log(this.props.userProfile);
        const { getUserProfile } = this.props;
        if(!this.props.userProfile == nextProps.userProfile) {
            getUserProfile();
        } else {
            this.setState({
                loading: false
            });
        }
    }
}

export default Container;