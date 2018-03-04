import React, { Component } from 'react';
import Navigation from './presenter';
import PropTypes from 'prop-types';

class Container extends Component {
    state = {
        seeingNotifications: false,
        term: ''
    }
    static propTypes ={
        goToSearch: PropTypes.func.isRequired
    }
    render() {
        return (
            <Navigation 
                {...this.props}
                {...this.state}
                openNotifications={this._openNotifications}
                closeNotifications={this._closeNotifications}
                onInputChange={this._onInputChange}
                onSubmit={this._onSubmit}
                value={this.state.term}
            />
        );
    }
    _onInputChange = event => {
        const { target: { value } } = event;
        this.setState({
            term: value
        });
    }
    _onSubmit = event => {
        const { goToSearch } = this.props;
        const { term } = this.state;
        event.preventDefault()
        goToSearch(term);
        this.setState({
            term: ''
        })
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