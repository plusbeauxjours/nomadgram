import React from "react";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import styles from "./styles.scss";


const UserProfile = props => {
  if(props.loading){
    return <LoadingUserProfile />;
  } else {
    return <RenderUserProfile {...props} />
  }
}
    
const LoadingUserProfile = props => (
  <div className={styles.profile}>
    <Loading />
  </div>
);

const RenderUserProfile = props => (
  <div className={styles.profile}>
    <ListUserProfile />
  </div>
);

const ListUserProfile = props => {
  <div>profile</div>
}

UserProfile.contextTypes = {
  t: PropTypes.func.isRequired
};

UserProfile.propTypes = {
}

export default UserProfile;
