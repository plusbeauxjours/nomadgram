import React, { Component } from 'react';
import FeedPhoto from './presenter';

class Container extends Component {
    state = {
        seeingLikes: false
    }
    render() {
        return (
            <FeedPhoto
                {...this.props}
                {...this.state}
                openUsers={this._openUsers}
                closeUsers={this._closeUsers}
            />
        );
    }
    _openUsers = () => {
        const { getPhotoLikes } = this.props;
        this.setState({
            seeingLikes: true
        });
        getPhotoLikes();
    };
    _closeUsers = () => {
        this.setState({
            seeingLikes: false
        });
    }
}

export default Container;