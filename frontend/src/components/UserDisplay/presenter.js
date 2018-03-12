import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const UserDisplay = (
  {
    horizontal, 
    user, 
    big=false, 
    handleClick
  }, context) => (
  <div className={horizontal ? styles.horizontal : styles.vertical}>
    <Link
      to={{ pathname: `/${user.username}` }}
      target='_self'
      style={{ textDecoration: 'none', color:'black' }}
    >
      <div className={styles.column}>
        <img
          src={user.profile_image || require("images/noPhoto.jpg")}
          alt={user.username}
          className={big ? styles.bigAvatar : styles.avatar}
        />
        <div className={styles.user}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.name}>{user.name}</span>
        </div>
      </div>
    </Link>
    <span className={styles.column}>
      <button className={styles.button} onClick={handleClick}>
        {user.is_following ? context.t("Unfollow") : context.t("Follow")}
      </button>
    </span>
  </div>
);

UserDisplay.contextTypes = {
  t: PropTypes.func.isRequired
};

UserDisplay.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    profile_image: PropTypes.string,
    username: PropTypes.string.isRequired,
    name: PropTypes.string,
    is_following: PropTypes.bool.isRequired
  }).isRequired,
  big: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool
};

UserDisplay.defaultProps = {
    big: false
};

export default UserDisplay;