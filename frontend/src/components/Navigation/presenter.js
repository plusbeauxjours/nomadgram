import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import NotificationList from 'components/NotificationList';

const Navigation = (
  {
    onSubmit,
    value,
    onInputChange,
    seeingNotifications,
    username,
    openNotifications,
    closeNotifications,
    notificationList
  },
  context
) => (
  <div className={styles.navigation}>
    <div className={styles.inner}>
      <div className={styles.column}>
        <Link to="/">
          <img
            src={require("images/logo.png")}
            className={styles.logo}
            alt={context.t("Logo")}
          />
        </Link>
      </div>
      <div className={styles.column}>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={context.t("Search")}
            className={styles.searchInput}
            value={value}
            onChange={onInputChange}
          />
        </form>
      </div>
      <div className={styles.column}>
        <div className={styles.navIcon}>
          <Link to="/explore" target="_self">
            <Ionicon icon="ios-compass-outline" fontSize="28px" color="black" />
          </Link>
        </div>
        <div className={styles.navIcon}>
          <Ionicon
            icon="ios-heart-outline"
            fontSize="28px"
            color="black"
            onClick={openNotifications}
          />
        </div>
        {seeingNotifications && (
          <NotificationList
            closeNotifications={closeNotifications}
            notificationList={notificationList}
          />
        )}
        <div className={styles.navIcon}>
          <Link to={{ pathname: `/${username}` }} target="_self">
            <Ionicon icon="ios-person-outline" fontSize="32px" color="black" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

Navigation.contextTypes = {
  t: PropTypes.func.isRequired
}

Navigation.PropsTypes = {
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onInputChange: PropTypes.func,
  seeingNotifications: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  openNotifications: PropTypes.func.isRequired,
  closeNotifications: PropTypes.func.isRequired,
  notificationList: PropTypes.array
};

export default Navigation;
