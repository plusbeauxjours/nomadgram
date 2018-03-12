import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import PhotoActions from 'components/PhotoActions';
import PhotoComments from "components/PhotoComments";
import TimeStamp from 'components/TimeStamp';
import CommentBox from 'components/CommentBox';
import { Link } from "react-router-dom";
import UserList from 'components/UserList';

const FeedPhoto = (
    {
        creator,
        location, 
        file, 
        caption, 
        like_count, 
        is_liked, 
        id, 
        openUsers, 
        comments, 
        tags, 
        natural_time,
        seeingLikes, 
        closeUsers, 
        likes
    }, 
    context
) => {
    return <div className={styles.feedPhoto}>
        <Link 
            to={{ pathname: `/${creator.username}` }}
            target='_self'
            style={{ textDecoration: 'none', color:'black' }}
        >
          <header className={styles.header}>
            <img src={creator.profile_image || require("images/noPhoto.jpg")} alt={creator.username} className={styles.avator} /> <div className={styles.headerColumn}>
              <span className={styles.creator}>
                {creator.username}
              </span> <span className={styles.location}>
                {location}
              </span>
            </div>
          </header>
        </Link>
        <img src={file} alt={caption} className={styles.image} />
        <div>
          <PhotoActions number={like_count} isLiked={is_liked} photoId={id} openUsers={openUsers} />
          <PhotoComments caption={caption} creator={creator.username} comments={comments} tags={tags} />
          <TimeStamp time={natural_time} />
          <CommentBox photoId={id} />
        </div>
        {seeingLikes && <UserList title={context.t("Likes")} closeUsers={closeUsers} userList={likes} />}
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