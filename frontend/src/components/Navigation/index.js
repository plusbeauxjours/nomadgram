import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as notificationActions } from "redux/modules/notifications";
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    const { user : { username } } = state;
    const { notifications: { notificationList } } = state;
    return { 
      username,
      notificationList
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getNotification: () => {
      dispatch(notificationActions.getNotification());
    },
    goToSearch: searchTerm => {
      console.log('sign from goToSearch on navigations')
      dispatch(push(`/search/${searchTerm}`));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Container);