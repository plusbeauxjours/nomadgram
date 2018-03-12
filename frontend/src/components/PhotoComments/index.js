import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from './styles.scss';

const PhotoComments = (
  {
    creator, 
    caption,
    comments
  }
) => (
  <div className={styles.comments}>
    <ul className={styles.list}>
      <Comment
        username={creator}
        comment={caption}
      />
      {comments.map(comment => (
        <Comment
          username={comment.creator.username}
          comment={comment.message}
          key={comment.id}
        />
      ))}
    </ul>
  </div>
);

const Comment = (
  {
    username,
    comment
  }
) => (
  <li className={styles.comment}>
    <Link
      to={{ pathname: `/${username}` }}
      target="_self"
      style={{ textDecoration: "none", color: "black" }}
    >
      <span className={styles.username}>{username}</span>{" "}
    </Link>
    <span className={styles.message}>{comment}</span>{" "}
  </li>
);

PhotoComments.propTypes = {
    caption: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            creator: PropTypes.shape({
                profile_image: PropTypes.string,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired
};

export default PhotoComments;