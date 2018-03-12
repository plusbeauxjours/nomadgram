import React from 'react';
import PropTypes from 'prop-types';
import Ionicon from 'react-ionicons';
import styles from './styles.scss';

const PhotoActions = (
  {
    handleHeartClick,
    isLiked,
    openUsers,
    number
  }, 
  context
) => (
  <div className={styles.actions}>
    <div className={styles.icons}>
      <span className={styles.icon} onClick={handleHeartClick}>
        {isLiked ? (
          <Ionicon icon="ios-heart" fontSize="28px" color="#EB4B59" />
        ) : (
          <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
        )}
      </span>
      <span className={styles.icon}>
        <Ionicon icon="ios-text-outline" fontSize="28px" color="black" />
      </span>
    </div>
    <span className={styles.likes} onClick={openUsers}>
      {number}{" "}
      {number === 1 ? context.t("like") : context.t("likes")}
    </span>
  </div>
);

PhotoActions.propTypes = {
  handleHeartClick: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  openUsers: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
};
    
PhotoActions.contextTypes = {
    t: PropTypes.func.isRequired
};

export default PhotoActions;     