import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as notificationActions } from "redux/modules/notifications";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getNotification: () => {
      dispatch(notificationActions.getNotification());
    }
  };
};

export default connect(null, mapDispatchToProps) (Container);