import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as notificationActions } from "redux/modules/notifications";

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
      console.log('haha', ownProps)
      dispatch(notificationActions.getNotification());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Container);