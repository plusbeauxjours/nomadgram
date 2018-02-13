import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";

const UserProfile = (props, context) => {
  return (
    <div>
        {props.username}
    </div>
  );
};

UserProfile.contextTypes = {
  t: PropTypes.func.isRequired
};

UserProfile.propTypes = {
}

export default UserProfile;
