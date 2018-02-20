import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';

const Notification = props => (
  <div className={styles.container} onClick={props.closeNotifications}>
    <div className={styles.box}>
      <span className={styles.content}>
        {props.loading ?
          <LoadingNotification />
        :
          <RenderNotification potato={props.notification} />
        }
      </span>
    </div>
  </div>
);

const LoadingNotification = props => (
  <div className={styles.notification}>
    <Loading />
    spiner
  </div>
);

const RenderNotification = (props, context) => (
  props.potato.map(notification => (
    <ListNotification 
      id={notification.id} 
      creatorname={notification.creator.username} 
      notification_type={notification.notification_type}
      comment={notification.comment}
      image={notification.image}
      key={notification.id}
    />
  ))
)

const ListNotification = (props, context) => (
  <div className={styles.notification}>
    <h1>{props.creatorname}{props.notification_type}{props.comment}</h1>
  </div>
);

Notification.propTypes = {
  creatorname: PropTypes.string.isRequired,
  notification_type: PropTypes.string.isRequired,
  comment: PropTypes.string,
  image: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

RenderNotification.propTypes = {
  list: PropTypes.array
}

export default Notification;