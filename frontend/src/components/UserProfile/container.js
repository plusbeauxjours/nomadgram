import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserProfile from './presenter';

class Container extends Component {

    state = {
        seeingUsers: false,
        loading: true
    };

    static propTypes = {
        getUserProfile: PropTypes.func.isRequired
    };

    render() {
        return (
            <UserProfile 
                {...this.state} 
                {...this.props} 
                openUserFollowers={this._openUserFollowers}
                openUserFollowing={this._openUserFollowing}
                closeUsers={this._closeUsers}
            />
        );
    }

    _openUserFollowers = () => {
        const { getUserFollowers } = this.props;
        console.log("containerProps", this.props);            
        this.setState({
            seeingUsers: true
        });
        getUserFollowers();
    };

    _openUserFollowing = () => {
        const { getUserFollowing } = this.props;
        console.log("containerProps", this.props);            
        this.setState({
            seeingUsers: true
        });
        getUserFollowing();
    };


    _closeUsers = () => {
        this.setState({
            seeingUsers: false
        });
    }
    
    componentDidMount() {
        const { getUserProfile } = this.props;
        if (!this.props.userProfile) {
            getUserProfile();
        } else {
            this.setState({
                loading: false
            });
        }
    }

    componentWillReceiveProps(nextProps) {
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