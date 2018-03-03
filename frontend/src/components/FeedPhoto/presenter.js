import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import PhotoActions from 'components/PhotoActions';
import PhotoComments from "components/PhotoComments";
import TimeStamp from 'components/TimeStamp';
import CommentBox from 'components/CommentBox';
import { Link } from "react-router-dom";
import UserList from 'components/UserList';

const FeedPhoto = (props, context) => {
    return <div className={styles.feedPhoto}>
        <Link 
            to={{ pathname: `/${props.creator.username}` }}
            target='_self'
            style={{ textDecoration: 'none', color:'black' }}
        >
          <header className={styles.header}>
            <img src={props.creator.profile_image || require("images/noPhoto.jpg")} alt={props.creator.username} className={styles.avator} /> <div className={styles.headerColumn}>
              <span className={styles.creator}>
                {props.creator.username}
              </span> <span className={styles.location}>
                {props.location}
              </span>
            </div>
          </header>
        </Link>
        <img src={props.file} alt={props.caption} className={styles.image} />
        <div>
          <PhotoActions number={props.like_count} isLiked={props.is_liked} photoId={props.id} openUsers={props.openUsers} />
          <PhotoComments caption={props.caption} creator={props.creator.username} comments={props.comments} />
          <TimeStamp time={props.natural_time} />
          <CommentBox photoId={props.id} />
        </div>
        {props.seeingLikes && <UserList title={context.t("Likes")} closeUsers={props.closeUsers} userList={props.likes} />}
      </div>;
};

FeedPhoto.contextTypes = {
    t: PropTypes.func.isRequired
};

FeedPhoto.propTypes = {
    id: PropTypes.number.isRequired,
    creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number.isRequiored,
        message: PropTypes.string.isRequired,
        creator: PropTypes.shape({
            profile_image: PropTypes.string,
            username: PropTypes.string.isRequired
        }).isRequired
        })
    ).isRequired,
    natural_time: PropTypes.string.isRequired,
    is_liked: PropTypes.bool.isRequired,
    seeingLikes: PropTypes.bool.isRequired,
    openUsers: PropTypes.func.isRequired,
    closeUsers: PropTypes.func.isRequired
};

export default FeedPhoto; 