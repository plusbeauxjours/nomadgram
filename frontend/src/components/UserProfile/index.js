import { connect } from "react-redux";
import Container from "./container";
import { actionCreators as userActions } from "redux/modules/user";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserProfile: () => {
      dispatch(userActions.getUserProfile(ownProps.username));
    }
  };
};

export default connect(null, mapDispatchToProps)(Container);
