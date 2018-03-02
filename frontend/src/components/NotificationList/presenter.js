import React from 'react';
import PropTypes from "prop-types";
import styles from './styles.scss';
import Loading from 'components/Loading';
import NotificationRow from 'components/NotificationRow';

const NotificationList = props => (
  <div className={styles.container} onClick={props.closeNotifications}>
    <div className={styles.box}>
      <span className={styles.content}>
        {props.loading ? (
          <LoadingNotification />
        ) : (
          <RenderNotification
            notificationList={props.notificationList}
            handleClick={props.handleClick}
          />
        )}
      </span>
    </div>
  </div>
);

const LoadingNotification = props => (
  <div className={styles.loading}>
    <Loading />
  </div>
);

const RenderNotification = props =>
  props.notificationList.map(notification => (
    <NotificationRow
      handleClick={props.handleClick}
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