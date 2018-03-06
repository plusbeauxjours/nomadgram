import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from 'redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
    const { user } = ownProps;
    return {
        handleClick: () => {
            if(user.is_following) {
                dispatch(userActions.unfollowUser(user.username));
            } else {
                dispatch(userActions.followUser(user.username));
            }
        }
    };
};


export default connect(null, mapDispatchToProps)(Container);