import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from './styles.scss';
import Loading from 'components/Loading';
import TimeStamp from 'components/TimeStamp';

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
  <div className={styles.loading}>
    <Loading />
  </div>
);

const RenderNotification = props => (
  props.potato.map(notification => (
    <ListNotification 
      {...notification}
      key={notification.id}
    />
  ))
)

const ListNotification = (props, context) => (
  <div className={styles.list}>
    <Link
      to={{ pathname: `/${props.creator.username}` }}
      target="_self"
      style={{ textDecoration: "none", color: "black" }}
    >
      <img
        src={props.creator.profile_image || require("images/noPhoto.jpg")}
        alt={props.creator.username}
        className={styles.avatar}
      />
    </Link>
    {(() => {
      switch (props.notification_type) {
        case "comment":
          return (
            <div className={styles.row}>
              <Link
                to={{ pathname: `/${props.creator.username}` }}
                target='_self'
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className={styles.username}>
                  {props.creator.username}
                </span>
              </Link>
              <span className={styles.message}>
                {context.t("님이 댓글을 남겼습니다.: ")}
              </span>
              <span className={styles.comment}>{props.comment}</span>
              <TimeStamp time={props.natural_time} className={styles.time} />
            </div>
          );
        case "like":
          return (
            <div className={styles.row}>
              <Link
                to={{ pathname: `/${props.creator.username}` }}
                target='_self'
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className={styles.username}>
                  {props.creator.username}
                </span>
              </Link>
              <span className={styles.message}>
                {context.t("님이 회원님의 사진을 좋아합니다.")}
              </span>
              <TimeStamp time={props.natural_time} className={styles.time} />
            </div>
          );
        case "follow":
          return (
            <div className={styles.row}>
              <Link
                to={{ pathname: `/${props.creator.username}` }}
                target='_self'                
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className={styles.username}>
                  {props.creator.username}
                </span>
              </Link>
              <span className={styles.message}>
                {context.t("님이 회원님을 팔로우하기 시작했습니다.")}
              </span>
              <TimeStamp time={props.natural_time} className={styles.time} />
            </div>
          );
        default:
          return "err";
      }
    })()}
    {(() => {
      switch (props.notification_type) {
        case "like":
        case "comment":
          return (
            <div>
              <img
                src={props.image.file}
                alt={props.image.caption}
                className={styles.image}
              />
            </div>
          );
        case "follow":
          return (
            <button className={styles.button} onClick={props.handleClick}>
              {props.creator.following ? context.t("Unfollow") : context.t("Follow")}
            </button>
          );
        default:
          return "error";
      }
    })()}
  </div>
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
  image: PropTypes.shape({
    file: PropTypes.string
  }),
  key: PropTypes.number,
  handleClick: PropTypes.func
};

ListNotification.propTypes = {
};

ListNotification.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Notification;