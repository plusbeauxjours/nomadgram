import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
    const { notifications: { notification } } = state;
    const { user: { userList } } = state;
    return {
        notification,
        userList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const { user } = ownProps;
    return {
        handleClick: () => {
            if(user.following) {
                dispatch(userActions.unfollowUser(user.id));
            } else {
                dispatch(userActions.followUser(user.id));
            }
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Container);
