import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from './styles.scss';
import TimeStamp from 'components/TimeStamp';

const NotificationRow = (
  {
    creator,
    notification_type,
    comment, 
    natural_time,
    image,
    handleClick
  }, 
  context
) => (
  <div className={styles.list}>
    <Link
      to={{ pathname: `/${creator.username}` }}
      target="_self"
      style={{ textDecoration: "none", color: "black" }}
    >
      <img
        src={creator.profile_image || require("images/noPhoto.jpg")}
        alt={creator.username}
        className={styles.avatar}
      />
    </Link>
    {(() => {
      switch (notification_type) {
        case "comment":
          return (
            <div className={styles.row}>
              <Link
                to={{ pathname: `/${creator.username}` }}
                target="_self"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className={styles.username}>
                  {creator.username}
                </span>
              </Link>
              <span className={styles.message}>
                {context.t("님이 댓글을 남겼습니다.: ")}
              </span>
              <span className={styles.comment}>{comment}</span>
              <TimeStamp time={natural_time} className={styles.time} />
            </div>
          );
        case "like":
          return (
            <div className={styles.row}>
              <Link
                to={{ pathname: `/${creator.username}` }}
                target="_self"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className={styles.username}>
                  {creator.username}
                </span>
              </Link>
              <span className={styles.message}>
                {context.t("님이 회원님의 사진을 좋아합니다.")}
              </span>
              <TimeStamp time={natural_time} className={styles.time} />
            </div>
          );
        case "follow":
          return (
            <div className={styles.row}>
              <Link
                to={{ pathname: `/${creator.username}` }}
                target="_self"
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className={styles.username}>
                  {creator.username}
                </span>
              </Link>
              <span className={styles.message}>
                {context.t("님이 회원님을 팔로우하기 시작했습니다.")}
              </span>
              <TimeStamp time={natural_time} className={styles.time} />
            </div>
          );
        default:
          return "err";
      }
    })()}
    {(() => {
      switch (notification_type) {
        case "like":
        case "comment":
          return (
            <div>
              <img
                src={image.file}
                alt={image.caption}
                className={styles.image}
              />
            </div>
          );
        case "follow":
          return (
            <button className={styles.button} onClick={handleClick}>
              {creator.is_following
                ? context.t("Unfollow")
                : context.t("Follow")}
            </button>
          );
        default:
          return "error";
      }
    })()}
  </div>
);

NotificationRow.propTypes = {
};

NotificationRow.contextTypes = {
  t: PropTypes.func.isRequired
};

export default NotificationRow;