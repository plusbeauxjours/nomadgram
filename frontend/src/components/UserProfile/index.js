import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapStateToProps = (state, ownProps) => {
    const { user: { userProfile } } = state
    return {
        userProfile
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { match: { params: { username } } } = ownProps;
    return {
        getUserProfile: () => {
            console.log("index ownProps:", ownProps);
            dispatch(userActions.getUserProfile(username));
        },
        getUserFollowers: () => {
            console.log("index ownProps:", ownProps);
            dispatch(userActions.getUserFollowers(username));
        },
        getUserFollowing: () => {
            console.log("index ownProps:", ownProps);
            dispatch(userActions.getUserFollowing(username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
