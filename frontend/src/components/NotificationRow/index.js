import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as notificationActions } from "redux/modules/notifications";

const mapDispatchToProps = (dispatch, ownProps) => {
    const { creator } = ownProps;
    return {
        handleClick: () => {
            if (creator.following) {
              dispatch(notificationActions.notiUnfollowUser(creator.id));
            } else {
              dispatch(notificationActions.notiFollowUser(creator.id));
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);
