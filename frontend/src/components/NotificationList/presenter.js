import React from 'react';
import PropTypes from "prop-types";
import styles from './styles.scss';
import Loading from 'components/Loading';
import NotificationRow from 'components/NotificationRow';

const NotificationList = (
  {
    closeNotifications,
    notificationList,
    handleClick,
    loading
  }
) => (
  <div className={styles.container} onClick={closeNotifications}>
    <div className={styles.box}>
      <span className={styles.content}>
        {loading ? (
          <LoadingNotification />
        ) : (
          <RenderNotification
            notificationList={notificationList}
            handleClick={handleClick}
          />
        )}
      </span>
    </div>
  </div>
);

const LoadingNotification = () => (
  <div className={styles.loading}>
    <Loading />
  </div>
);

const RenderNotification = ({notificationList, handleClick}) =>
  notificationList.map(notification => (
    <NotificationRow
      handleClick={handleClick}
      key={notification.id}
      creator={notification.creator}
      notification_type={notification.notification_type}
      message={notification.message}
      natural_time={notification.natural_time}
      image={notification.image}
    />
  ));

Notification.propTypes = {
  onClick: PropTypes.func,
  notification: PropTypes.array
};

RenderNotification.propTypes = {
  creator: PropTypes.shape({
    profile: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  notification_type: PropTypes.string,
  comment: PropTypes.string,
  image: PropTypes.shape({
    file: PropTypes.string
  }),
  key: PropTypes.number,
  handleClick: PropTypes.func
};

export default NotificationList;