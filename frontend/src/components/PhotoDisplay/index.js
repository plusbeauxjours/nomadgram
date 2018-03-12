import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import styles from "./styles.scss";

const PhotoDisplay = photo => (
    <div className={styles.container}>
        <img src={photo.file} alt={photo.creator} className={styles.image} />
        <div className={styles.overlay}>
        <span className={styles.data}>
            <Ionicon icon="ios-heart" fontSize="22px" color="white" />{" "}
            {photo.like_count}
        </span>
        <span className={styles.data}>
            <Ionicon icon="ios-text" fontSize="22px" color="white" />{" "}
            {photo.comment_count}
        </span>
        </div>
    </div>
);

PhotoDisplay.propTypes = {
  photo: PropTypes.shape({
    file: PropTypes.string.isRequired,
    comment_count: PropTypes.number.isRequired,
    like_count: PropTypes.number.isRequired
  }).isRequired
};

export default PhotoDisplay;