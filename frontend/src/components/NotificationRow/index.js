import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as notificationActions } from "redux/modules/notifications";

const mapDispatchToProps = (dispatch, ownProps) => {
    const { creator } = ownProps;
    return {
        handleClick: () => {
            if (creator.is_following) {
              dispatch(notificationActions.notiUnfollowUser(creator.username));
            } else {
              dispatch(notificationActions.notiFollowUser(creator.username));
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);
