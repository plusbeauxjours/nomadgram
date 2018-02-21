import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';

const Notification = (props, context) => (
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
  <div className={styles.loading}>
    <Loading />
  </div>
);

const RenderNotification = (props, context) => (
  props.potato.map(notification => (
    <ListNotification 
      id={notification.id} 
      username={notification.creator.username} 
      profile={notification.creator.profile_image}
      notification_type={notification.notification_type}
      comment={notification.comment}
      image={notification.image}
      key={notification.id}
    />
  ))
)

const ListNotification = (props, context) => (
  <ul className={styles.list}>
    <img
      src={props.profile || require("images/noPhoto.jpg")}
      alt={props.username}
      className={styles.avatar}
    />
    {(() => {
      switch (props.notification_type) {
        case "comment":
          return (
            <li className={styles.row}>
              <span className={styles.username}>{props.username}</span>
              <span className={styles.message}>님이 댓글을 남겼습니다.:</span>
              <span className={styles.comment}>{props.comment}</span>
            </li>
          );
        case "like":
          return (
            <li className={styles.row}>
              <span className={styles.username}>{props.username}</span>
              <span className={styles.message}>님이 회원님의 사진을 좋아합니다.</span>
            </li>
          );
        case "follow":
          return (
            <li className={styles.row}>
              <span className={styles.username}>{props.username}</span>
              <span className={styles.message}>님이 회원님을 팔로우하기 시작했습니다.</span>
            </li>
          );
        default:
          return "err";
      }
    })()}
  </ul>
);

Notification.propTypes = {
  onClick: PropTypes.func,
  potato: PropTypes.array
};

RenderNotification.propTypes = {
  creator: PropTypes.shape({
    profile: PropTypes.string,
    username: PropTypes.string.isRequired
  }),
  notification_type: PropTypes.string,
  comment: PropTypes.string,
  image: PropTypes.string,
  key: PropTypes.number
}

ListNotification.propTypes = {
}

export default Notification;