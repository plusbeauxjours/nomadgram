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

    render() {
        const { userProfile } = this.props;
        return <UserProfile {...this.state} userProfile={userProfile} />;
    }

    componentDidMount() {
        const { getUserProfile } = this.props;
        if (!this.props.userProfile) {
            console.log(this.props);
            getUserProfile();
        } else {
            this.setState({
                loading: false
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("thisProps", this.props.match.url);
        console.log("nextProps", nextProps.match.url);
        if (nextProps.userProfile) {
            this.setState({
                loading: false
            });
        }
    }

//   shouldComponentUpdate(nextProps) {
//       return nextProps === this.props
//   }

//   componentDidUpdate(prevProps) {
//     const { getUserProfile } = this.props;
//     console.log("prevprops", prevProps.match.url);
//     if (this.props.username !== prevProps.username) {
//       getUserProfile();
//     } else {
//       this.setState({
//         loading: false
//       });
//     }
//   }
}

export default Container;